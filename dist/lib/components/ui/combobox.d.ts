import * as React from "react";
export type ComboBoxItem = {
    key: string;
    value: string;
    label: string;
};
export type ComboBoxProps = {
    items: ComboBoxItem[];
    placeholder?: string;
    emptyState?: React.ReactNode;
    onSelect?: (item: ComboBoxItem) => void;
};
export declare function ComboBox({ items, placeholder, emptyState, onSelect, }: ComboBoxProps): React.JSX.Element;
