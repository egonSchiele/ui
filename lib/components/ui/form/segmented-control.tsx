"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/utils";

export type SegmentedControlOption<Value extends string = string> = {
  value: Value;
  label: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
};
// NoInfer makes TypeScript infer Value from options alone, so a value that is
// not one of the options fails to compile.
type SelectionProps<Value extends string> =
  | {
      value: NoInfer<Value>;
      defaultValue?: never;
      onValueChange: (value: NoInfer<Value>) => void;
    }
  | {
      value?: never;
      defaultValue: NoInfer<Value>;
      onValueChange?: (value: NoInfer<Value>) => void;
    };
export type SegmentedControlProps<Value extends string = string> =
  SelectionProps<Value> &
    Omit<
      React.ComponentProps<typeof RadioGroupPrimitive.Root>,
      | "value"
      | "defaultValue"
      | "onValueChange"
      | "children"
      | "required"
      | "asChild"
    > & {
      options: SegmentedControlOption<Value>[];
      size?: "sm" | "md" | "lg";
      fullWidth?: boolean;
    };

const segmentSizes: Record<
  NonNullable<SegmentedControlProps["size"]>,
  string
> = {
  sm: "min-h-7 px-2 text-xs",
  md: "min-h-9 px-3 text-sm",
  lg: "min-h-11 px-4 text-base",
};

export function SegmentedControl<Value extends string = string>({
  options,
  size = "md",
  fullWidth = false,
  className,
  orientation = "horizontal",
  onValueChange,
  ...props
}: SegmentedControlProps<Value>): React.JSX.Element {
  function select(value: string): void {
    const option: SegmentedControlOption<Value> | undefined = options.find(
      (candidate: SegmentedControlOption<Value>): boolean =>
        candidate.value === value,
    );
    if (option && !option.disabled) {
      onValueChange?.(option.value);
    }
  }

  return (
    <RadioGroupPrimitive.Root
      {...props}
      required
      onValueChange={select}
      orientation={orientation}
      data-slot="segmented-control"
      className={cn(
        "inline-flex w-fit gap-1 rounded-lg bg-muted p-1 data-[orientation=vertical]:flex-col",
        fullWidth && "w-full",
        className,
      )}
    >
      {options.map(
        (option: SegmentedControlOption<Value>): React.JSX.Element => (
          <RadioGroupPrimitive.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            aria-label={option.ariaLabel}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:bg-background data-[state=checked]:text-foreground data-[state=checked]:shadow-sm disabled:pointer-events-none disabled:opacity-50",
              segmentSizes[size],
              fullWidth && "min-w-0 flex-1",
            )}
          >
            {option.label}
          </RadioGroupPrimitive.Item>
        ),
      )}
    </RadioGroupPrimitive.Root>
  );
}
