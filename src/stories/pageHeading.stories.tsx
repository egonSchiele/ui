import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../../globals.css";
import { PageHeading } from "@/components/ui/typography/pageHeading";

const meta: Meta = {
  title: "Typography/PageHeading",
  component: PageHeading,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PageHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Default Page Heading",
  },
};

export const DefaultWithAccent: Story = {
  args: {
    text: "Default Page Heading",
    accentText: "Accent Text",
  },
};
