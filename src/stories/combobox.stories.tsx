import type { Meta, StoryObj } from "@storybook/react";
import { ComboBox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/form/button";
import React from "react";
import "../../globals.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Examples/Combobox",
  component: ComboBox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomEmptyState: Story = {
  args: {
    emptyState: (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">No status found.</p>
        <Button
          onClick={() => {
            alert("Add new status clicked!");
          }}
        >
          Add new status
        </Button>
      </div>
    ),
  },
};
