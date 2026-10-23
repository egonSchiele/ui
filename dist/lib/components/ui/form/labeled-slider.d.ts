import * as React from "react";
type SliderValue = number | null;
type LabeledSliderValueProps = ({
    value: SliderValue;
    defaultValue?: never;
    onChange: (value: SliderValue) => void;
} & ({
    value: number;
    placeholderValue?: number;
} | {
    placeholderValue: number;
})) | ({
    value?: never;
    defaultValue?: SliderValue;
    onChange?: (value: SliderValue) => void;
} & ({
    defaultValue: number;
    placeholderValue?: number;
} | {
    placeholderValue: number;
}));
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
export declare function LabeledSlider(props: LabeledSliderProps): React.JSX.Element;
export {};
