import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/components/ui/form/checkbox";
import {
  CheckboxDemo,
  CheckboxGroupDemo,
  ControlledCheckboxDemo,
} from "./CheckboxDemo";
import "../../globals.css";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "select",
      options: [undefined, false, true, "indeterminate"],
    },
    defaultChecked: {
      control: "select",
      options: [false, true, "indeterminate"],
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: { name: "updates", value: "email" },
  render: (args) => <CheckboxDemo {...args} />,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Unchecked: Story = { args: { defaultChecked: false } };

export const Indeterminate: Story = {
  args: { defaultChecked: "indeterminate" },
};

export const Disabled: Story = { args: { disabled: true } };

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, required: true },
};

export const Controlled: Story = {
  render: (args) => <ControlledCheckboxDemo {...args} />,
};

export const GroupWithSelectAll: Story = {
  render: () => <CheckboxGroupDemo />,
};
