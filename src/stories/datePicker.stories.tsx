import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fr } from "date-fns/locale";
import { DatePicker } from "@/components/ui/form/date-picker";
import { DatePickerDemo, ControlledDatePickerDemo } from "./DatePickerDemo";
import "../../globals.css";

const meta = {
  title: "UI/DatePicker",
  component: DatePicker,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: { name: "appointment", defaultMonth: new Date(2026, 9, 1) },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
    defaultMonth: { control: false },
    disabledDates: { control: false },
    locale: { control: false },
    disabled: { control: "boolean" },
  },
  render: (args) => <DatePickerDemo {...args} />,
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInitialDate: Story = {
  args: { defaultValue: new Date(2026, 9, 5) },
};

export const Controlled: Story = {
  render: (args) => <ControlledDatePickerDemo {...args} />,
};

export const Disabled: Story = { args: { disabled: true } };

export const DisabledDates: Story = {
  args: {
    disabledDates: [{ before: new Date(2026, 9, 5) }, { dayOfWeek: [0, 6] }],
  },
};

export const MonthAndYearDropdowns: Story = {
  args: {
    captionLayout: "dropdown",
    startMonth: new Date(1950, 0),
    endMonth: new Date(2030, 11),
  },
};

export const Localized: Story = {
  args: {
    locale: fr,
    placeholder: "Choisir une date",
    defaultValue: new Date(2026, 9, 5),
  },
};
