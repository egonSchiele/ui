import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/components/ui/form/slider";
import "../../globals.css";

const meta: Meta = {
  title: "UI/Slider",
  component: Slider,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

function SliderDemo(): React.JSX.Element {
  const [value, setValue]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(25);
  const [committed, setCommitted]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(25);
  return (
    <div className="flex w-72 flex-col gap-4">
      <Slider
        aria-label="Volume"
        value={value}
        onChange={setValue}
        onCommit={setCommitted}
        min={0}
        max={100}
        step={5}
      />
      <output>
        Value: {value}; committed: {committed}
      </output>
      <button
        onClick={(): void => {
          setValue(0);
        }}
      >
        Reset volume
      </button>
    </div>
  );
}

export const Default: Story = {
  render: (): React.JSX.Element => <SliderDemo />,
};

export const Disabled: Story = {
  args: {
    "aria-label": "Volume",
    defaultValue: 25,
    disabled: true,
    className: "w-72",
  },
};

export const Vertical: Story = {
  args: {
    "aria-label": "Volume",
    defaultValue: 50,
    orientation: "vertical",
    className: "h-48",
  },
};
