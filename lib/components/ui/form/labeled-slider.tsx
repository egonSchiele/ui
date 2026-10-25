"use client";

import * as React from "react";
import { Button } from "@/components/ui/form/button";
import { Label } from "@/components/ui/form/label";
import { NumberField } from "@/components/ui/form/number-field";
import { Slider } from "@/components/ui/form/slider";
import { cn } from "@/utils";

type SliderValue = number | null;

type LabeledSliderValueProps =
  | ({
      value: SliderValue;
      defaultValue?: never;
      onChange: (value: SliderValue) => void;
    } & (
      | {
          value: number;
          placeholderValue?: number;
        }
      | {
          placeholderValue: number;
        }
    ))
  | ({
      value?: never;
      defaultValue?: SliderValue;
      onChange?: (value: SliderValue) => void;
    } & (
      | {
          defaultValue: number;
          placeholderValue?: number;
        }
      | {
          placeholderValue: number;
        }
    ));

export type LabeledSliderProps = LabeledSliderValueProps & {
  label: string;
  id?: string;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  density?: "default" | "compact";
  invalidBlur?: "keep" | "restore";
  unit?: React.ReactNode;
  help?: React.ReactNode;
  className?: string;
  onCommit?: (value: SliderValue) => void;
  onReset?: () => void;
};

type LabeledSliderValue = {
  value: SliderValue;
  placeholderValid: boolean;
  missingDefault: boolean;
  disabled: boolean;
  thumbValue: number;
  resetCount: number;
  change: (value: SliderValue) => void;
  reset: () => void;
};

function useLabeledSliderValue(props: LabeledSliderProps): LabeledSliderValue {
  const [internalValue, setInternalValue]: [
    SliderValue,
    React.Dispatch<React.SetStateAction<SliderValue>>,
  ] = React.useState<SliderValue>(props.defaultValue ?? null);
  const [resetCount, setResetCount]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(0);
  const value: SliderValue =
    props.value === undefined ? internalValue : props.value;
  const placeholderValid: boolean =
    props.placeholderValue !== undefined &&
    Number.isFinite(props.placeholderValue) &&
    props.placeholderValue >= props.min &&
    props.placeholderValue <= props.max;
  const missingDefault: boolean = value === null && !placeholderValid;
  const disabled: boolean = Boolean(props.disabled || missingDefault);
  const thumbValue: number =
    value ??
    (placeholderValid ? (props.placeholderValue ?? props.min) : props.min);
  function change(nextValue: SliderValue): void {
    if (props.value === undefined) {
      setInternalValue(nextValue);
    }
    props.onChange?.(nextValue);
  }
  function reset(): void {
    if (props.value === undefined) {
      const restored: SliderValue = props.defaultValue ?? null;
      setInternalValue(restored);
      if (restored !== internalValue) {
        props.onChange?.(restored);
      }
    }
    // The count keys the NumberField, so Reset also clears an invalid draft
    // when the value itself does not change.
    setResetCount((count: number): number => count + 1);
    props.onReset?.();
  }
  return {
    value,
    placeholderValid,
    missingDefault,
    disabled,
    thumbValue,
    resetCount,
    change,
    reset,
  };
}

function LabeledSliderHeader({
  id,
  label,
  disabled,
  onReset,
}: {
  id: string;
  label: string;
  disabled?: boolean;
  onReset?: () => void;
}): React.JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label id={`${id}-label`} htmlFor={id}>
        {label}
      </Label>
      {onReset && (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={disabled}
          onClick={onReset}
          aria-label={`Reset ${label}`}
        >
          Reset
        </Button>
      )}
    </div>
  );
}

export function LabeledSlider(props: LabeledSliderProps): React.JSX.Element {
  const generatedId: string = React.useId();
  const id: string = props.id ?? generatedId;
  const slider: LabeledSliderValue = useLabeledSliderValue(props);
  const compact: boolean = props.density === "compact";
  const descriptionId: string | undefined =
    props.help || slider.missingDefault ? `${id}-help` : undefined;
  return (
    <div
      data-slot="labeled-slider"
      className={cn(
        "flex flex-col",
        compact ? "gap-2" : "gap-3",
        props.className,
      )}
    >
      <LabeledSliderHeader
        id={id}
        label={props.label}
        disabled={props.disabled}
        onReset={props.onReset ? slider.reset : undefined}
      />
      <div className={cn("flex items-center", compact ? "gap-2" : "gap-4")}>
        <Slider
          value={slider.thumbValue}
          onChange={slider.change}
          onCommit={props.onCommit}
          min={props.min}
          max={props.max}
          step={props.step}
          disabled={slider.disabled}
          aria-labelledby={`${id}-label`}
          aria-describedby={descriptionId}
          className="min-w-12 flex-1"
        />
        <NumberField
          key={slider.resetCount}
          id={id}
          value={slider.value}
          onChange={slider.change}
          onCommit={props.onCommit}
          min={props.min}
          max={props.max}
          step={props.step}
          emptyValue={slider.placeholderValid ? "allow" : "reject"}
          placeholder={
            slider.placeholderValid ? String(props.placeholderValue) : undefined
          }
          disabled={slider.disabled}
          unit={props.unit}
          density={props.density}
          showSteppers={!compact}
          invalidBlur={props.invalidBlur}
          aria-label={props.label}
          aria-describedby={descriptionId}
          className={cn("shrink-0", compact ? "w-[5.5rem]" : "w-40")}
        />
      </div>
      {descriptionId && (
        <p
          id={descriptionId}
          className={cn(
            "text-sm",
            slider.missingDefault
              ? "text-destructive"
              : "text-muted-foreground",
          )}
        >
          {slider.missingDefault
            ? "A valid default value is required."
            : props.help}
        </p>
      )}
    </div>
  );
}
