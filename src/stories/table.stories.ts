import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../../globals.css";
import { TableDemo } from "./TableDemo";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Examples/TableDemo",
  component: TableDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    backgrounds: {
      default: "light",
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    darkMode: {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<typeof TableDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    darkMode: false,
  },
};

export const DarkMode: Story = {
  args: {
    darkMode: true,
  },
};
