import * as React from "react";
export type ComboBoxItem<T = any> = {
    key: string;
    label: string;
    metadata?: T;
};
export type ComboBoxProps = {
    items: ComboBoxItem[];
    placeholder?: string;
    emptyState?: React.ReactNode;
    onSelect?: (item: ComboBoxItem) => void;
    className?: string;
};
export declare function ComboBox({ items, placeholder, emptyState, onSelect, className, }: ComboBoxProps): React.JSX.Element;
