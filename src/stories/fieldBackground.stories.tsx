import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, NumberField, Textarea } from "egon-ui";
import "../../globals.css";

const meta = {
  title: "Examples/Field background",
  parameters: { layout: "centered" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
type FieldTheme = React.CSSProperties & {
  "--input": string;
  "--input-background"?: string;
};
const customTheme: FieldTheme = {
  "--input": "rgb(60, 70, 80)",
  "--input-background": "rgb(20, 30, 40)",
};
const fallbackTheme: FieldTheme = { "--input": "rgb(60, 70, 80)" };
function Fields({ style }: { style: FieldTheme }): React.JSX.Element {
  return (
    <div className="w-[280px] space-y-3" style={style}>
      <Input aria-label="Title" />
      <Textarea aria-label="Description" />
      <NumberField
        label="Count"
        defaultValue={4}
        density="compact"
        showSteppers={false}
      />
    </div>
  );
}
export const Custom: Story = {
  render: (): React.JSX.Element => <Fields style={customTheme} />,
};
export const Fallback: Story = {
  render: (): React.JSX.Element => <Fields style={fallbackTheme} />,
};
