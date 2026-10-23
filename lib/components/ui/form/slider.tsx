"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/utils";

type SliderValueProps =
  | {
      value: number;
      defaultValue?: never;
      onChange: (value: number) => void;
    }
  | {
      value?: never;
      defaultValue?: number;
      onChange?: (value: number) => void;
    };

export type SliderProps = Omit<
  React.ComponentProps<typeof SliderPrimitive.Root>,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "onValueCommit"
  | "onChange"
  | "children"
> &
  SliderValueProps & {
    onCommit?: (value: number) => void;
  };

export function Slider({
  value,
  defaultValue,
  onChange,
  onCommit,
  className,
  min = 0,
  max = 100,
  step = 1,
  ...props
}: SliderProps): React.JSX.Element {
  return (
    <SliderPrimitive.Root
      {...props}
      data-slot="slider"
      min={min}
      max={max}
      step={step}
      value={value === undefined ? undefined : [value]}
      defaultValue={value === undefined ? [defaultValue ?? min] : undefined}
      onValueChange={(values: number[]): void => {
        onChange?.(values[0]);
      }}
      onValueCommit={(values: number[]): void => {
        onCommit?.(values[0]);
      }}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-32 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
    >
      <SliderPrimitive.Track className="bg-secondary relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2">
        <SliderPrimitive.Range className="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]}
        aria-valuetext={props["aria-valuetext"]}
        className="border-primary bg-background block size-4 shrink-0 rounded-full border shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
      />
    </SliderPrimitive.Root>
  );
}
