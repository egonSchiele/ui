import type { Meta, StoryObj } from "@storybook/react";
import "../../globals.css";
import { Skeleton } from "@/components/ui/skeleton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Examples/Skeleton",
  component: Skeleton,
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
    className: {
      type: "string",
    }
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Circle: Story = {
  args: {
    className: "h-12 w-12 rounded-full"
  },
};

export const Rectangle: Story = {
  args: {
    className: "h-4 w-[250px]"
  },
};
