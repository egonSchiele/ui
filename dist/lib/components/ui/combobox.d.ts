import * as React from "react";
export type ComboBoxItem<T = any> = {
    key: string;
    label: string;
    metadata?: T;
};
export type ComboBoxProps<T = any> = {
    items: ComboBoxItem<T>[];
    placeholder?: string;
    emptyState?: React.ReactNode;
    onSelect?: (item: ComboBoxItem<T>) => void;
    className?: string;
    buttonClassName?: string;
};
export declare function ComboBox<T = any>({ items, placeholder, emptyState, onSelect, className, buttonClassName, }: ComboBoxProps<T>): React.JSX.Element;
