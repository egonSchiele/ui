import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Grid2X2Icon, ListIcon } from "lucide-react";
import {
  SegmentedControl,
  SegmentedControlOption,
} from "@/components/ui/form/segmented-control";
import "../../globals.css";
const options: SegmentedControlOption[] = [
  { value: "basic", label: "Basic" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert", disabled: true },
];
const meta = {
  title: "UI/SegmentedControl",
  component: SegmentedControl,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { options, defaultValue: "basic", "aria-label": "Settings tier" },
} satisfies Meta<typeof SegmentedControl>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const Disabled: Story = { args: { disabled: true } };
export const Icons: Story = {
  args: {
    "aria-label": "View",
    defaultValue: "grid",
    options: [
      {
        value: "grid",
        label: <Grid2X2Icon aria-hidden="true" />,
        ariaLabel: "Grid",
      },
      {
        value: "list",
        label: <ListIcon aria-hidden="true" />,
        ariaLabel: "List",
      },
    ],
  },
};
function ControlledSegments(): React.JSX.Element {
  const [value, setValue]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = React.useState<string>("basic");
  return (
    <div className="flex flex-col gap-3">
      <SegmentedControl
        aria-label="Settings tier"
        options={options}
        value={value}
        onValueChange={setValue}
      />
      <output>Selected: {value}</output>
    </div>
  );
}
export const Controlled: Story = {
  render: (): React.JSX.Element => <ControlledSegments />,
};
