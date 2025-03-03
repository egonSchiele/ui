import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../../globals.css";
import { LabeledSwitch } from "@/components/ui/labeledSwitch";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "UI/LabeledSwitch",
  component: LabeledSwitch,
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
  argTypes: {
    id: {
      type: "string",
    },
    checked: {
      type: "boolean",
    },
    onCheckedChange: {
      type: { name: "function", required: true },
      description: "Function to handle checked state change",
    },
    label: {
      type: "string",
    },
    className: {
      type: "string",
    },
  },
} satisfies Meta<typeof LabeledSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    id: "labeled-switch",
    checked: false,
    onCheckedChange: fn(),
    label: "Label",
    className: "",
  },
};
