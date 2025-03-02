import React from "react";
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import "../../globals.css";
import { SimpleTooltip } from "@/components/ui/simpleTooltip";

const SIDE_OPTIONS = ["top", "right", "bottom", "left"];
const ALIGN_OPTIONS = ["start", "center", "end"];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "UI/SimpleTooltip",
  component: SimpleTooltip,
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
    side: {
      control: {
        type: "select",
        options: SIDE_OPTIONS,
      },
    },
    sideOffset: {
      control: {
        type: "number",
      },
    },
    align: {
      control: {
        type: "select",
        options: ALIGN_OPTIONS,
      },
    },
    alignOffset: {
      control: {
        type: "number",
      },
    },
    arrowPadding: {
      control: {
        type: "number",
      },
    },
    avoidCollisions: {
      control: {
        type: "boolean",
      },
    },
    collisionBoundary: {
      control: {
        type: "object",
      },
    },
    collisionPadding: {
      control: {
        type: "object",
      },
    },
    sticky: {
      control: {
        type: "select",
        options: ["partial", "always"],
      },
    },
    hideWhenDetached: {
      control: {
        type: "boolean",
      },
    },
    updatePositionStrategy: {
      control: {
        type: "select",
        options: ["optimized", "always"],
      },
    },
    forceMount: {
      control: {
        type: "boolean",
      },
    },
    children: {
      control: {
        type: "object",
      },
    },
    tooltipContent: {
      control: {
        type: "object",
      },
    },
    className: {
      type: "string",
    },
    open: {
      control: {
        type: "boolean",
      },
    },
    defaultOpen: {
      control: {
        type: "boolean",
      },
    },
    delayDuration: {
      control: {
        type: "number",
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof SimpleTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button>Hover me</Button>,
    tooltipContent: <p>Tooltip content</p>,
    side: "right",
    open: true,
  },
};

export const AlwaysOpen: Story = {
  args: {
    children: <Button>Hover me</Button>,
    tooltipContent: <p>Tooltip content</p>,
    side: "right",
    open: true,
  },
};

export const SideOffset: Story = {
  args: {
    children: <Button>Hover me</Button>,
    tooltipContent: <p>Tooltip content</p>,
    side: "right",
    sideOffset: 16,
    open: true,
  },
};

export const AlignStart: Story = {
  args: {
    children: <Button>Hover me</Button>,
    tooltipContent: <p>Tooltip content</p>,
    side: "right",
    align: "start",
    open: true,
  },
};

export const AlignEnd: Story = {
  args: {
    children: <Button>Hover me</Button>,
    tooltipContent: <p>Tooltip content</p>,
    side: "right",
    align: "end",
    open: true,
  },
};

export const LongDelayDuration: Story = {
  args: {
    children: <Button>1 second delay</Button>,
    tooltipContent: <p>Yay I showed up!</p>,
    side: "right",
    delayDuration: 1000,
  },
};

export const DisableHoverableContent: Story = {
  args: {
    children: <Button>Doesn't seem to do anything</Button>,
    tooltipContent: <p>You can hover over this without it closing</p>,
    side: "right",
    disableHoverableContent: true,
  },
};
