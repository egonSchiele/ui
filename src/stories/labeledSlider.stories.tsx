import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LabeledSlider } from "@/components/ui/form/labeled-slider";
import "../../globals.css";

const meta: Meta = {
  title: "UI/LabeledSlider",
  component: LabeledSlider,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

function LabeledSliderDemo({
  initial = null,
  disabled = false,
}: {
  initial?: number | null;
  disabled?: boolean;
}): React.JSX.Element {
  const [value, setValue]: [
    number | null,
    React.Dispatch<React.SetStateAction<number | null>>,
  ] = React.useState<number | null>(initial);
  const [committed, setCommitted]: [
    number | null,
    React.Dispatch<React.SetStateAction<number | null>>,
  ] = React.useState<number | null>(initial);
  return (
    <div className="flex w-96 max-w-full flex-col gap-3">
      <LabeledSlider
        label="Strength"
        value={value}
        onChange={setValue}
        onCommit={setCommitted}
        placeholderValue={0.75}
        min={0}
        max={1}
        step={0.05}
        disabled={disabled}
        help="Leave empty to use the default."
        onReset={(): void => {
          setValue(null);
        }}
      />
      <output>
        Value: {value ?? "default"}; committed: {committed ?? "default"}
      </output>
      <button
        onClick={(): void => {
          setValue(0.5);
        }}
      >
        External update
      </button>
    </div>
  );
}

export const Default: Story = {
  render: (): React.JSX.Element => <LabeledSliderDemo />,
};

export const Zero: Story = {
  render: (): React.JSX.Element => <LabeledSliderDemo initial={0} />,
};

export const Decimal: Story = {
  render: (): React.JSX.Element => <LabeledSliderDemo initial={0.25} />,
};

export const Disabled: Story = {
  render: (): React.JSX.Element => <LabeledSliderDemo disabled />,
};
