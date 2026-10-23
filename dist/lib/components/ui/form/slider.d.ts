import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
type SliderValueProps = {
    value: number;
    defaultValue?: never;
    onChange: (value: number) => void;
} | {
    value?: never;
    defaultValue?: number;
    onChange?: (value: number) => void;
};
export type SliderProps = Omit<React.ComponentProps<typeof SliderPrimitive.Root>, "value" | "defaultValue" | "onValueChange" | "onValueCommit" | "onChange" | "children"> & SliderValueProps & {
    onCommit?: (value: number) => void;
};
export declare function Slider({ value, defaultValue, onChange, onCommit, className, min, max, step, ...props }: SliderProps): React.JSX.Element;
export {};
