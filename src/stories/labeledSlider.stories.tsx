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
  density = "default",
  invalidBlur = "keep",
  width = 384,
}: {
  initial?: number | null;
  disabled?: boolean;
  density?: "default" | "compact";
  invalidBlur?: "keep" | "restore";
  width?: number;
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
    <div className="flex max-w-full flex-col gap-3" style={{ width }}>
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
        density={density}
        invalidBlur={invalidBlur}
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

export const Compact: Story = {
  render: (): React.JSX.Element => (
    <LabeledSliderDemo
      initial={0.25}
      density="compact"
      invalidBlur="restore"
      width={320}
    />
  ),
};

export const CompactNullable: Story = {
  render: (): React.JSX.Element => (
    <LabeledSliderDemo density="compact" invalidBlur="restore" width={240} />
  ),
};

function UncontrolledResetDemo({
  defaultValue,
}: {
  defaultValue: number | null;
}): React.JSX.Element {
  const [resets, setResets]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(0);
  const [lastChange, setLastChange]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = React.useState<string>("none");
  return (
    <div className="flex w-96 max-w-full flex-col gap-3">
      <LabeledSlider
        label="Steps"
        defaultValue={defaultValue}
        placeholderValue={3}
        min={1}
        max={10}
        onChange={(value: number | null): void => {
          setLastChange(String(value));
        }}
        onReset={(): void => {
          setResets((count: number): number => count + 1);
        }}
      />
      <output>Resets: {resets}</output>
      <output>Last change: {lastChange}</output>
    </div>
  );
}

export const UncontrolledReset: Story = {
  render: (): React.JSX.Element => <UncontrolledResetDemo defaultValue={5} />,
};

export const UncontrolledNullableReset: Story = {
  render: (): React.JSX.Element => (
    <UncontrolledResetDemo defaultValue={null} />
  ),
};
