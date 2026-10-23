"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/utils";

export type SegmentedControlOption = {
  value: string;
  label: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
};
type SelectionProps =
  | {
      value: string;
      defaultValue?: never;
      onValueChange: (value: string) => void;
    }
  | {
      value?: never;
      defaultValue: string;
      onValueChange?: (value: string) => void;
    };
export type SegmentedControlProps = SelectionProps &
  Omit<
    React.ComponentProps<typeof RadioGroupPrimitive.Root>,
    | "value"
    | "defaultValue"
    | "onValueChange"
    | "children"
    | "required"
    | "asChild"
  > & {
    options: SegmentedControlOption[];
    size?: "sm" | "md" | "lg";
  };

const segmentSizes: Record<
  NonNullable<SegmentedControlProps["size"]>,
  string
> = {
  sm: "min-h-7 px-2 text-xs",
  md: "min-h-9 px-3 text-sm",
  lg: "min-h-11 px-4 text-base",
};

export function SegmentedControl({
  options,
  size = "md",
  className,
  orientation = "horizontal",
  ...props
}: SegmentedControlProps): React.JSX.Element {
  return (
    <RadioGroupPrimitive.Root
      {...props}
      required
      orientation={orientation}
      data-slot="segmented-control"
      className={cn(
        "inline-flex w-fit gap-1 rounded-lg bg-muted p-1 data-[orientation=vertical]:flex-col",
        className,
      )}
    >
      {options.map(
        (option: SegmentedControlOption): React.JSX.Element => (
          <RadioGroupPrimitive.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            aria-label={option.ariaLabel}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:bg-background data-[state=checked]:text-foreground data-[state=checked]:shadow-sm disabled:pointer-events-none disabled:opacity-50",
              segmentSizes[size],
            )}
          >
            {option.label}
          </RadioGroupPrimitive.Item>
        ),
      )}
    </RadioGroupPrimitive.Root>
  );
}
