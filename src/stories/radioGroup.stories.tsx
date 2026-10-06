import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/form/radio-group";
import { RadioGroupDemo, ControlledRadioGroupDemo } from "./RadioGroupDemo";
import "../../globals.css";

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  subcomponents: { RadioGroupItem },
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: {
    "aria-label": "Shipping speed",
    name: "shipping",
    defaultValue: "standard",
    orientation: "vertical",
  },
  render: (args) => <RadioGroupDemo {...args} />,
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = { args: { orientation: "horizontal" } };

export const Disabled: Story = { args: { disabled: true } };

export const Required: Story = {
  args: { defaultValue: undefined, required: true },
};

export const Unselected: Story = { args: { defaultValue: undefined } };

export const Controlled: Story = {
  render: (args) => <ControlledRadioGroupDemo {...args} />,
};
