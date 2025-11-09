import { Label } from "@/components/ui/form/label.jsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/form/select.jsx";
import React, { ReactNode } from "react";
import { HGroupXS } from "@/components/ui/layout/hgroupXS.jsx";
import { VGroupSM } from "@/components/ui/layout/vgroupSM.jsx";
import { VGroupXS } from "@/components/ui/layout/vgroupXS.jsx";
import { Button } from "@/components/ui/form/button.jsx";
import { Input } from "@/components/ui/form/input.jsx";
import { Textarea } from "@/components/ui/form/textarea.jsx";
import { Switch } from "@/components/ui/form/switch.jsx";
import { cn } from "@/utils";
import { VGroupMD } from "../layout/vgroupMD";
import clsx from "clsx";

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
  className?: string; // Additional class names for styling
  validate?: (value: FormFieldValue) => string | null; // Validation function returning error message or null
  placeholder?: string; // Placeholder text for input and textarea fields
};

export type FormFieldInput = FormFieldBase & {
  type: "input";
  isNumber?: boolean; // Indicates if the input should accept numbers
};

export type FormFieldSelect = FormFieldBase & {
  type: "select";
  options: SelectOption[];
};

export type FormFieldTextarea = FormFieldBase & {
  type: "textarea";
  rows?: number; // For textarea fields
  showCharCount?: boolean; // Whether to show character count
};

export type FormFieldCheckbox = FormFieldBase & {
  type: "checkbox";
  initialValue?: boolean; // Override to use boolean for checkbox
};

export type FormField =
  | FormFieldInput
  | FormFieldSelect
  | FormFieldTextarea
  | FormFieldCheckbox;

function ErrorMessage({ children }: { children: ReactNode }) {
  return <p className="text-red-500 text-sm leading-none">{children}</p>;
}

export function FormInput({
  field,
  value,
  onChange,
  error,
}: {
  field: FormFieldInput;
  value: FormFieldValue;
  onChange: (value: FormFieldValue) => void;
  error?: string | null;
}) {
  return (
    <VGroupXS>
      <HGroupXS>
        <Label
          htmlFor={field.name}
          className={cn(field.disabled && "text-primary/70")}
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </HGroupXS>
      <Input
        type={field.isNumber ? "number" : "text"}
        name={field.name}
        value={value as string | number}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        required={field.required}
        disabled={field.disabled}
        className={clsx(field.className)}
      />
    </VGroupXS>
  );
}

export function FormSelect({
  field,
  value,
  onChange,
  error,
}: {
  field: FormFieldSelect;
  value: FormFieldValue;
  onChange: (value: FormFieldValue) => void;
  error?: string | null;
}) {
  return (
    <VGroupXS>
      <Label
        htmlFor={field.name}
        className={cn(field.disabled && "text-primary/70")}
      >
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        value={`${value}`}
        onValueChange={(value: string) => onChange(value)}
        required={field.required}
        disabled={field.disabled}
        name={field.name}
      >
        <SelectTrigger className={cn("w-[180px]", field.className)}>
          <SelectValue placeholder={field.placeholder || ""} />
        </SelectTrigger>
        <SelectContent>
          {field.options?.map((option) => (
            <SelectItem key={option.key} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </VGroupXS>
  );
}

export function FormTextarea({
  field,
  value,
  onChange,
  error,
}: {
  field: FormFieldTextarea;
  value: FormFieldValue;
  onChange: (value: FormFieldValue) => void;
  error?: string | null;
}) {
  return (
    <VGroupXS>
      <Label
        htmlFor={field.name}
        className={cn(field.disabled && "text-primary/70")}
      >
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        name={field.name}
        value={value as string | number}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        rows={field.rows || 3}
        required={field.required}
        disabled={field.disabled}
        className={field.className}
        placeholder={field.placeholder || ""}
      />
      {field.showCharCount && (
        <p className="text-xs text-primary/70">{`${value}`.length} chars</p>
      )}
    </VGroupXS>
  );
}

export function FormCheckbox({
  field,
  value,
  onChange,
  error,
}: {
  field: FormFieldCheckbox;
  value: FormFieldValue;
  onChange: (value: FormFieldValue) => void;
  error?: string | null;
}) {
  return (
    <VGroupXS>
      <HGroupXS>
        <Label
          htmlFor={field.name}
          className={cn(field.disabled && "text-primary/70")}
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </HGroupXS>
      <Switch
        checked={Boolean(value)}
        onCheckedChange={(checked) => onChange(checked)}
        required={field.required}
        disabled={field.disabled}
        className={field.className}
      />
    </VGroupXS>
  );
}

type FieldsToResult<T extends readonly FormField[]> = T[number]["name"];

export function SimpleForm<const T extends readonly FormField[]>({
  fields,
  onSubmit,
  onChange,
  onCancel,
  submitButtonText = "Submit",
  className = "",
  children,
}: {
  fields: T;
  onSubmit: (values: Record<FieldsToResult<T>, FormFieldValue>) => void;
  onChange?: (values: Record<FieldsToResult<T>, FormFieldValue>) => void;
  onCancel?: () => void;
  submitButtonText?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [formValues, setFormValues] = React.useState<
    Record<FieldsToResult<T>, FormFieldValue>
  >(
    fields.reduce((acc, field) => {
      if (field.type === "checkbox") {
        acc[field.name] =
          field.initialValue !== undefined ? field.initialValue : false;
      } else {
        acc[field.name] = field.initialValue || "";
      }
      return acc;
    }, {} as Record<string, FormFieldValue>)
  );

  const [errors, setErrors] = React.useState<Record<string, string | null>>({});

  const handleChange = (name: string, value: FormFieldValue) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (onChange) {
      onChange({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string | null> = {};
    fields.forEach((field) => {
      if (field.validate) {
        newErrors[field.name] = field.validate(
          formValues[field.name as FieldsToResult<T>]
        );
      }
    });
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === null)) {
      onSubmit(formValues);
    }
  };

  const fieldToComponent = (field: FormField) => {
    const value = formValues[field.name as FieldsToResult<T>];
    const error = errors[field.name];

    switch (field.type) {
      case "input":
        return (
          <FormInput
            key={field.name}
            field={field}
            error={error}
            value={value}
            onChange={(val) => handleChange(field.name, val)}
          />
        );
      case "select":
        return (
          <FormSelect
            key={field.name}
            field={field}
            error={error}
            value={value}
            onChange={(val) => handleChange(field.name, val)}
          />
        );
      case "textarea":
        return (
          <FormTextarea
            key={field.name}
            field={field}
            error={error}
            value={value}
            onChange={(val) => handleChange(field.name, val)}
          />
        );
      case "checkbox":
        return (
          <FormCheckbox
            key={field.name}
            field={field}
            error={error}
            value={value}
            onChange={(val) => handleChange(field.name, val)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <VGroupMD className={className}>
      <VGroupSM>{fields.map(fieldToComponent)}</VGroupSM>
      {children && children}
      <HGroupXS>
        {onCancel && (
          <Button onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          variant="default"
          disabled={Object.values(errors).some((error) => error !== null)}
        >
          {submitButtonText}
        </Button>
      </HGroupXS>
    </VGroupMD>
  );
}
