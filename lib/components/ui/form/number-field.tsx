"use client";

import * as React from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import { Label } from "@/components/ui/form/label";
import { cn } from "@/utils";

const SHIFT_STEP_MULTIPLIER: number = 10;
const FLOAT_PRECISION_DIGITS: number = 12;

type NumberValue = number | null;
type NumberFieldValueProps =
  | {
      value: NumberValue;
      defaultValue?: never;
      onChange: (value: NumberValue) => void;
    }
  | {
      value?: never;
      defaultValue?: NumberValue;
      onChange?: (value: NumberValue) => void;
    };

export type NumberFieldProps = NumberFieldValueProps & {
  id?: string;
  name?: string;
  label?: React.ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  min?: number;
  max?: number;
  step?: number;
  emptyValue?: "allow" | "reject";
  disabled?: boolean;
  placeholder?: string;
  unit?: React.ReactNode;
  help?: React.ReactNode;
  className?: string;
  onCommit?: (value: NumberValue) => void;
};

type NumberFieldState = {
  value: NumberValue;
  draft: string;
  canIncrease: boolean;
  canDecrease: boolean;
  error: string | null;
  commit: () => void;
  increment: (amount: number) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
type Bounds = { min?: number; max?: number; step: number };
type ParsedNumber =
  | { valid: true; value: NumberValue }
  | { valid: false; message: string };

function formatValue(value: NumberValue): string {
  return value === null ? "" : String(value);
}

function normalizeValue(value: number, { min, max, step }: Bounds): number {
  const base: number = min ?? 0;
  const bounded: number = Math.min(
    max ?? Infinity,
    Math.max(min ?? -Infinity, value),
  );
  const aligned: number = base + Math.round((bounded - base) / step) * step;
  const rounded: number = Number(
    (Number.isFinite(aligned) ? aligned : bounded).toFixed(
      FLOAT_PRECISION_DIGITS,
    ),
  );
  return Math.min(max ?? Infinity, Math.max(min ?? -Infinity, rounded));
}

function nextSteppedValue({
  current,
  amount,
  bounds,
}: {
  current: NumberValue;
  amount: number;
  bounds: Bounds;
}): NumberValue {
  const next: number =
    current === null ? (bounds.min ?? 0) : current + amount * bounds.step;
  return Number.isFinite(next) ? normalizeValue(next, bounds) : current;
}

function parseDraft(draft: string, allowEmpty: boolean): ParsedNumber {
  const text: string = draft.trim();
  if (text === "") {
    return allowEmpty
      ? { valid: true, value: null }
      : { valid: false, message: "Enter a number." };
  }
  const numeric: number = Number(text);
  if (
    !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(text) ||
    !Number.isFinite(numeric)
  ) {
    return { valid: false, message: "Enter a finite number." };
  }
  return { valid: true, value: numeric };
}

function useNumberField(props: NumberFieldProps): NumberFieldState {
  const [internalValue, setInternalValue]: [
    NumberValue,
    React.Dispatch<React.SetStateAction<NumberValue>>,
  ] = React.useState<NumberValue>(props.defaultValue ?? null);
  const value: NumberValue =
    props.value !== undefined ? props.value : internalValue;
  const [draft, setDraft]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = React.useState<string>(formatValue(value));
  const [error, setError]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ] = React.useState<string | null>(null);
  const [commitVersion, setCommitVersion]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(0);
  const bounds: Bounds = {
    min: props.min,
    max: props.max,
    step: props.step ?? 1,
  };
  const parsedDraft: ParsedNumber = parseDraft(draft, true);
  const steppingValue: NumberValue = parsedDraft.valid
    ? parsedDraft.value
    : value;
  const canIncrease: boolean =
    nextSteppedValue({ current: steppingValue, amount: 1, bounds }) !==
    steppingValue;
  const canDecrease: boolean =
    nextSteppedValue({ current: steppingValue, amount: -1, bounds }) !==
    steppingValue;

  React.useEffect((): void => {
    setDraft(formatValue(value));
    setError(null);
  }, [value, commitVersion]);

  function restore(): void {
    setDraft(formatValue(value));
    setError(null);
  }

  function emit(next: NumberValue): void {
    setDraft(formatValue(next));
    setError(null);
    if (props.value === undefined) {
      setInternalValue(next);
    }
    if (next !== value) {
      props.onChange?.(next);
    }
    props.onCommit?.(next);
    setCommitVersion((version: number): number => version + 1);
  }

  function commit(): void {
    const parsed: ParsedNumber = parseDraft(
      draft,
      props.emptyValue !== "reject",
    );
    if (!parsed.valid) {
      setError(parsed.message);
      return;
    }
    if (draft === formatValue(value) && error === null) {
      return;
    }
    emit(parsed.value === null ? null : normalizeValue(parsed.value, bounds));
  }

  function increment(amount: number): void {
    const next: NumberValue = nextSteppedValue({
      current: steppingValue,
      amount,
      bounds,
    });
    if (next !== steppingValue) {
      emit(next);
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Escape") {
      event.preventDefault();
      restore();
    }
    if (event.key === "Enter") {
      const parsed: ParsedNumber = parseDraft(
        draft,
        props.emptyValue !== "reject",
      );
      if (draft !== formatValue(value) || !parsed.valid) {
        event.preventDefault();
      }
      commit();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      increment(
        (event.key === "ArrowUp" ? 1 : -1) *
          (event.shiftKey ? SHIFT_STEP_MULTIPLIER : 1),
      );
    }
  }

  function onTextChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setDraft(event.target.value);
    setError(null);
  }

  return {
    value,
    draft,
    canIncrease,
    canDecrease,
    error,
    commit,
    increment,
    onKeyDown,
    onTextChange,
  };
}

type StepButtonProps = {
  direction: -1 | 1;
  label: string;
  disabled: boolean;
  onStep: (amount: number) => void;
};

function StepButton({
  direction,
  label,
  disabled,
  onStep,
}: StepButtonProps): React.JSX.Element {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={`${direction === -1 ? "Decrease" : "Increase"} ${label}`}
      disabled={disabled}
      onPointerDown={(event: React.PointerEvent<HTMLButtonElement>): void => {
        event.preventDefault();
      }}
      onClick={(): void => onStep(direction)}
    >
      {direction === -1 ? (
        <MinusIcon aria-hidden="true" />
      ) : (
        <PlusIcon aria-hidden="true" />
      )}
    </Button>
  );
}

export function NumberField(props: NumberFieldProps): React.JSX.Element {
  const generatedId: string = React.useId();
  const id: string = props.id ?? generatedId;
  const field: NumberFieldState = useNumberField(props);
  const describedBy: string = [
    props["aria-describedby"],
    props.help ? `${id}-help` : null,
    field.error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const actionLabel: string =
    typeof props.label === "string"
      ? props.label
      : (props["aria-label"] ?? "value");
  return (
    <div
      className={cn("flex flex-col gap-2", props.className)}
      data-slot="number-field"
    >
      {props.label && <Label htmlFor={id}>{props.label}</Label>}
      <div className="flex items-center gap-2">
        <StepButton
          direction={-1}
          label={actionLabel}
          disabled={Boolean(props.disabled) || !field.canDecrease}
          onStep={field.increment}
        />
        <Input
          id={id}
          name={props.name}
          type="text"
          role="spinbutton"
          inputMode="decimal"
          autoComplete="off"
          value={field.draft}
          placeholder={props.placeholder}
          disabled={props.disabled}
          aria-label={props["aria-label"]}
          aria-labelledby={props["aria-labelledby"]}
          aria-describedby={describedBy || undefined}
          aria-invalid={Boolean(field.error)}
          aria-valuemin={props.min}
          aria-valuemax={props.max}
          aria-valuenow={field.value ?? undefined}
          onChange={field.onTextChange}
          onBlur={field.commit}
          onKeyDown={field.onKeyDown}
        />
        {props.unit && (
          <span className="text-sm text-muted-foreground">{props.unit}</span>
        )}
        <StepButton
          direction={1}
          label={actionLabel}
          disabled={Boolean(props.disabled) || !field.canIncrease}
          onStep={field.increment}
        />
      </div>
      {props.help && (
        <p id={`${id}-help`} className="text-sm text-muted-foreground">
          {props.help}
        </p>
      )}
      {field.error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {field.error}
        </p>
      )}
    </div>
  );
}
