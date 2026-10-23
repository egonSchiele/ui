import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NumberField } from "@/components/ui/form/number-field";
import { Button } from "@/components/ui/form/button";
import "../../globals.css";

function ControlledNumber(): React.JSX.Element {
  const [value, setValue]: [
    number | null,
    React.Dispatch<React.SetStateAction<number | null>>,
  ] = React.useState<number | null>(0);
  return (
    <div className="flex w-80 flex-col gap-4">
      <NumberField
        label="Guidance"
        value={value}
        onChange={setValue}
        min={0}
        max={10}
        step={0.1}
        placeholder="Model default"
        help="Commit with Enter or by leaving the field."
      />
      <output>Committed: {value ?? "default"}</output>
      <Button onClick={(): void => setValue(5)}>Set to five</Button>
      <Button onClick={(): void => setValue(null)}>Reset to default</Button>
    </div>
  );
}
const meta = {
  title: "UI/NumberField",
  component: NumberField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof NumberField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Controlled: Story = {
  render: (): React.JSX.Element => <ControlledNumber />,
};
export const Required: Story = {
  args: {
    label: "Steps",
    defaultValue: 4,
    min: 1,
    max: 50,
    step: 1,
    emptyValue: "reject",
  },
};
export const Disabled: Story = {
  args: { label: "Steps", defaultValue: 4, disabled: true },
};
export const DecimalBounds: Story = {
  args: { label: "Strength", defaultValue: 0.15, min: 0.05, max: 1, step: 0.1 },
};
