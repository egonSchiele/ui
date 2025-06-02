import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../../globals.css";
import { SectionHeading } from "@/components/ui/typography/sectionHeading";

const meta: Meta = {
  title: "Typography/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Default Page Heading",
  },
};

export const DefaultWithDescription: Story = {
  args: {
    text: "Default Page Heading",
    description: "This is a description for the section heading.",
  },
};

export const DefaultWithButtons: Story = {
  args: {
    text: "Default Page Heading",
    actions: (
      <>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
        >
          Edit
        </button>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Publish
        </button>
      </>
    ),
  },
};

export const DefaultWithButtonsAndDescription: Story = {
  args: {
    text: "Default Page Heading",
    description: "This is a description for the section heading.",
    actions: (
      <>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
        >
          Edit
        </button>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Publish
        </button>
      </>
    ),
  },
};
