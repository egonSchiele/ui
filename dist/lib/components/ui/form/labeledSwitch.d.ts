import React from "react";
export type LabeledSwitchProps = {
    id: string;
    checked: boolean;
    onCheckedChange(checked: boolean): void;
    label: string;
    className?: string;
};
export declare function LabeledSwitch({ id, checked, onCheckedChange, label, className, }: LabeledSwitchProps): React.JSX.Element;
