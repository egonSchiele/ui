import React from "react";
import { SimpleForm, FormField } from "@/components/ui/form/simpleForm";

const fields: FormField[] = [
  {
    name: "name" as const,
    type: "input",
    label: "Name",
    required: true,
    initialValue: "",
  } as const,
  {
    name: "disabled" as const,
    type: "input",
    label: "Disabled Input",
    required: false,
    initialValue: "",
    disabled: true,
  } as const,
  {
    name: "bio" as const,
    type: "textarea",
    label: "Bio",
    rows: 3,
    required: true,
    initialValue: "text here",
    showCharCount: true,
  } as const,
  {
    name: "birthYear" as const,
    type: "select",
    label: "Birth Year",
    required: false,
    options: [
      { key: "2000", value: "2000", label: "2000" },
      { key: "2001", value: "2001", label: "2001" },
      { key: "2002", value: "2002", label: "2002" },
    ],
    initialValue: "2001",
  } as const,
  {
    name: "favColor" as const,
    type: "select",
    label: "Favorite Color",
    required: true,
    options: [
      { key: "red", value: "red", label: "Red" },
      { key: "green", value: "green", label: "Green" },
      { key: "blue", value: "blue", label: "Blue" },
    ],
    placeholder: "Select a color",
  } as const,
  {
    name: "newsletter" as const,
    type: "checkbox",
    label: "Subscribe to newsletter",
    required: false,
    initialValue: false,
  } as const,
  {
    name: "terms" as const,
    type: "checkbox",
    label: "I agree to the terms and conditions",
    required: true,
    initialValue: true,
  } as const,
] as const;

export default function SimpleFormDemo() {
  return (
    <SimpleForm
      fields={fields}
      onSubmit={(data) => {
        console.log("Form submitted with data:", data);
      }}
      onChange={(data) => {
        console.log("Form changed with data:", data);
      }}
    />
  );
}
