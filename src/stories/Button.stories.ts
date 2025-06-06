import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../../globals.css";
import { Button } from "@/components/ui/form/button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "UI/Button",
  component: Button,
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
    variant: {
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
    },
    asChild: {
      control: { type: "boolean" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    // label: "Button",
    children: "Submit",
  },
};

export const Destructive: Story = {
  args: {
    // label: "Destructive Button",
    variant: "destructive",
    children: "Submit",
  },
};

export const Outline: Story = {
  args: {
    // label: "Outline Button",
    variant: "outline",
    children: "Submit",
  },
};

export const Secondary: Story = {
  args: {
    // label: "Secondary Button",
    variant: "secondary",
    children: "Submit",
  },
};

export const Ghost: Story = {
  args: {
    // label: "Ghost Button",
    variant: "ghost",
    children: "Submit",
  },
};

export const Link: Story = {
  args: {
    // label: "Link Button",
    variant: "link",
    children: "Submit",
  },
};
