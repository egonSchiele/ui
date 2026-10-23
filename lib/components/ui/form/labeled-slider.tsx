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
  unit?: React.ReactNode;
  help?: React.ReactNode;
  className?: string;
  onCommit?: (value: SliderValue) => void;
  onReset?: () => void;
};

export function LabeledSlider(props: LabeledSliderProps): React.JSX.Element {
  const generatedId: string = React.useId();
  const id: string = props.id ?? generatedId;
  const [internalValue, setInternalValue]: [
    SliderValue,
    React.Dispatch<React.SetStateAction<SliderValue>>,
  ] = React.useState<SliderValue>(props.defaultValue ?? null);
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
  const descriptionId: string | undefined =
    props.help || missingDefault ? `${id}-help` : undefined;
  function change(nextValue: SliderValue): void {
    if (props.value === undefined) {
      setInternalValue(nextValue);
    }
    props.onChange?.(nextValue);
  }
  return (
    <div
      data-slot="labeled-slider"
      className={cn("flex flex-col gap-3", props.className)}
    >
      <div className="flex items-center justify-between gap-3">
        <Label id={`${id}-label`} htmlFor={id}>
          {props.label}
        </Label>
        {props.onReset && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={props.disabled}
            onClick={props.onReset}
            aria-label={`Reset ${props.label}`}
          >
            Reset
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Slider
          value={thumbValue}
          onChange={change}
          onCommit={props.onCommit}
          min={props.min}
          max={props.max}
          step={props.step}
          disabled={disabled}
          aria-labelledby={`${id}-label`}
          aria-describedby={descriptionId}
          className="min-w-12 flex-1"
        />
        <NumberField
          id={id}
          value={value}
          onChange={change}
          onCommit={props.onCommit}
          min={props.min}
          max={props.max}
          step={props.step}
          emptyValue={placeholderValid ? "allow" : "reject"}
          placeholder={
            placeholderValid ? String(props.placeholderValue) : undefined
          }
          disabled={disabled}
          unit={props.unit}
          aria-label={props.label}
          aria-describedby={descriptionId}
          className="w-40 shrink-0"
        />
      </div>
      {descriptionId && (
        <p
          id={descriptionId}
          className={cn(
            "text-sm",
            missingDefault ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {missingDefault ? "A valid default value is required." : props.help}
        </p>
      )}
    </div>
  );
}
