import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
export type SegmentedControlOption = {
    value: string;
    label: React.ReactNode;
    ariaLabel?: string;
    disabled?: boolean;
};
type SelectionProps = {
    value: string;
    defaultValue?: never;
    onValueChange: (value: string) => void;
} | {
    value?: never;
    defaultValue: string;
    onValueChange?: (value: string) => void;
};
export type SegmentedControlProps = SelectionProps & Omit<React.ComponentProps<typeof RadioGroupPrimitive.Root>, "value" | "defaultValue" | "onValueChange" | "children" | "required" | "asChild"> & {
    options: SegmentedControlOption[];
    size?: "sm" | "md" | "lg";
};
export declare function SegmentedControl({ options, size, className, orientation, ...props }: SegmentedControlProps): React.JSX.Element;
export {};
