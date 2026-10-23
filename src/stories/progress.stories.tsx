import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@/components/ui/progress";
import "../../globals.css";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  args: { label: "Preparing files", className: "w-72", showValue: true },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 45 } };

export const Indeterminate: Story = { args: { value: null } };

export const Zero: Story = { args: { value: 0 } };

export const Complete: Story = { args: { value: 100 } };

export const CustomAppearance: Story = {
  args: {
    value: 40,
    className: "h-1 w-72",
    indicatorClassName: "bg-emerald-600",
    style: { borderRadius: 0 },
  },
};
