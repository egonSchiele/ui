import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../../globals.css";
import { Banner } from "@/components/ui/banner";

const meta: Meta = {
  title: "UI/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    // @ts-ignore
    style: {
      options: ["info", "error"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    style: "info",
    children: <p>This is an informational banner.</p>,
    onDismiss: fn(),
  },
};

export const Error: Story = {
  args: {
    style: "error",
    children: <p>This is an error banner.</p>,
    onDismiss: fn(),
  },
};
