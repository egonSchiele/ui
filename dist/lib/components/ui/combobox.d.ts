import * as React from "react";
export type ComboBoxItem<T = unknown> = {
    key: string;
    label: string;
    metadata?: T;
    group?: string;
    disabled?: boolean;
};
type SelectionProps = {
    selectedKey: string | null;
    defaultSelectedKey?: never;
} | {
    selectedKey?: never;
    defaultSelectedKey?: string | null;
};
export type ComboBoxProps<T = unknown> = SelectionProps & {
    items: ComboBoxItem<T>[];
    placeholder?: string;
    "aria-label"?: string;
    emptyState?: React.ReactNode;
    loading?: boolean;
    loadingState?: React.ReactNode;
    disabled?: boolean;
    onSelect?: (item: ComboBoxItem<T>) => void;
    onSelectedKeyChange?: (key: string | null) => void;
    renderItem?: (item: ComboBoxItem<T>) => React.ReactNode;
    renderSelected?: (item: ComboBoxItem<T>) => React.ReactNode;
    showChevron?: boolean;
    className?: string;
    buttonClassName?: string;
    contentClassName?: string;
    modal?: boolean;
};
export declare function ComboBox<T = unknown>({ items, placeholder, selectedKey, defaultSelectedKey, onSelect, onSelectedKeyChange, disabled, className, buttonClassName, contentClassName, modal, renderSelected, showChevron, "aria-label": ariaLabel, ...listProps }: ComboBoxProps<T>): React.JSX.Element;
export {};
