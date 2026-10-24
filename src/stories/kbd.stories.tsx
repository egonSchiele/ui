import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "@/components/ui/kbd";
import "../../globals.css";

const meta: Meta<typeof Kbd> = {
  title: "UI/Kbd",
  component: Kbd,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (): React.JSX.Element => (
    <p>
      Open commands <Kbd aria-label="Command K">⌘ K</Kbd>
    </p>
  ),
};
