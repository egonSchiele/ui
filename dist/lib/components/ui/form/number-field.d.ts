import * as React from "react";
type NumberValue = number | null;
type NumberFieldValueProps = {
    value: NumberValue;
    defaultValue?: never;
    onChange: (value: NumberValue) => void;
} | {
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
    invalidBlur?: "keep" | "restore";
    density?: "default" | "compact";
    showSteppers?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    placeholder?: string;
    unit?: React.ReactNode;
    help?: React.ReactNode;
    className?: string;
    onCommit?: (value: NumberValue) => void;
};
export declare function NumberField(props: NumberFieldProps): React.JSX.Element;
export {};
