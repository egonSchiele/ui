import React from "react";
export type FormFieldType = "input" | "select" | "textarea" | "checkbox";
export type FormFieldValue = string | number | boolean;
export type SelectOption = {
    key: string;
    value: string;
    label: string;
};
export type FormFieldBase = {
    name: string;
    label: string;
    type: FormFieldType;
    initialValue?: FormFieldValue;
    onChange?: (value: FormFieldValue) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    validate?: (value: FormFieldValue) => string | null;
    placeholder?: string;
};
export type FormFieldInput = FormFieldBase & {
    type: "input";
    isNumber?: boolean;
};
export type FormFieldSelect = FormFieldBase & {
    type: "select";
    options: SelectOption[];
};
export type FormFieldTextarea = FormFieldBase & {
    type: "textarea";
    rows?: number;
    showCharCount?: boolean;
};
export type FormFieldCheckbox = FormFieldBase & {
    type: "checkbox";
    initialValue?: boolean;
};
export type FormField = FormFieldInput | FormFieldSelect | FormFieldTextarea | FormFieldCheckbox;
export declare function FormInput({ field, value, onChange, error, }: {
    field: FormFieldInput;
    value: FormFieldValue;
    onChange: (value: FormFieldValue) => void;
    error?: string | null;
}): React.JSX.Element;
export declare function FormSelect({ field, value, onChange, error, }: {
    field: FormFieldSelect;
    value: FormFieldValue;
    onChange: (value: FormFieldValue) => void;
    error?: string | null;
}): React.JSX.Element;
export declare function FormTextarea({ field, value, onChange, error, }: {
    field: FormFieldTextarea;
    value: FormFieldValue;
    onChange: (value: FormFieldValue) => void;
    error?: string | null;
}): React.JSX.Element;
export declare function FormCheckbox({ field, value, onChange, error, }: {
    field: FormFieldCheckbox;
    value: FormFieldValue;
    onChange: (value: FormFieldValue) => void;
    error?: string | null;
}): React.JSX.Element;
type FieldsToResult<T extends readonly FormField[]> = T[number]["name"];
export declare function SimpleForm<const T extends readonly FormField[]>({ fields, onSubmit, onChange, onCancel, submitButtonText, className, }: {
    fields: T;
    onSubmit: (values: Record<FieldsToResult<T>, FormFieldValue>) => void;
    onChange?: (values: Record<FieldsToResult<T>, FormFieldValue>) => void;
    onCancel?: () => void;
    submitButtonText?: string;
    className?: string;
}): React.JSX.Element;
export {};
