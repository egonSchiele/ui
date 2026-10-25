import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HelperText, Input } from "egon-ui";
import "../../globals.css";

const meta = {
  title: "Typography/HelperText",
  component: HelperText,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof HelperText>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FieldDescription: Story = {
  render: (): React.JSX.Element => (
    <div className="space-y-2">
      <Input aria-label="Image title" aria-describedby="title-help" />
      <HelperText id="title-help">
        A short title helps you find the image later.
      </HelperText>
    </div>
  ),
};
