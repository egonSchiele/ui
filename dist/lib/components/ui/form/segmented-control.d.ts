import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
export type SegmentedControlOption<Value extends string = string> = {
    value: Value;
    label: React.ReactNode;
    ariaLabel?: string;
    disabled?: boolean;
};
type SelectionProps<Value extends string> = {
    value: NoInfer<Value>;
    defaultValue?: never;
    onValueChange: (value: NoInfer<Value>) => void;
} | {
    value?: never;
    defaultValue: NoInfer<Value>;
    onValueChange?: (value: NoInfer<Value>) => void;
};
export type SegmentedControlProps<Value extends string = string> = SelectionProps<Value> & Omit<React.ComponentProps<typeof RadioGroupPrimitive.Root>, "value" | "defaultValue" | "onValueChange" | "children" | "required" | "asChild"> & {
    options: SegmentedControlOption<Value>[];
    size?: "sm" | "md" | "lg";
};
export declare function SegmentedControl<Value extends string = string>({ options, size, className, orientation, onValueChange, ...props }: SegmentedControlProps<Value>): React.JSX.Element;
export {};
