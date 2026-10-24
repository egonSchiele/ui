import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/form/button";
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
    children: "Default Section Heading",
  },
};

export const DefaultWithDescription: Story = {
  args: {
    children: "Default Section Heading",
    description: "This is a description for the section heading.",
  },
};

export const DefaultWithButtons: Story = {
  args: {
    children: "Default Section Heading",
    actions: (
      <>
        <Button variant="outline">Edit</Button>
        <Button className="ml-3">Publish</Button>
      </>
    ),
  },
};

export const DefaultWithButtonsAndDescription: Story = {
  args: {
    children: "Default Section Heading",
    description: "This is a description for the section heading.",
    actions: (
      <>
        <Button variant="outline">Edit</Button>
        <Button className="ml-3">Publish</Button>
      </>
    ),
  },
};

function CompactHeading(): React.JSX.Element {
  const headingRef: React.RefObject<HTMLHeadingElement | null> =
    React.useRef<HTMLHeadingElement>(null);
  return (
    <section aria-labelledby="preview-heading" className="w-[280px] space-y-4">
      <SectionHeading
        variant="compact"
        level="h2"
        headingId="preview-heading"
        headingRef={headingRef}
        tabIndex={-1}
        description="Review the selected image."
        actions={
          <>
            <Button size="sm" variant="outline">
              Download image
            </Button>
            <Button size="sm">Save to library</Button>
          </>
        }
      >
        Preview
      </SectionHeading>
      <Button onClick={(): void => headingRef.current?.focus()}>
        Focus preview heading
      </Button>
    </section>
  );
}
export const Compact: Story = {
  render: (): React.JSX.Element => <CompactHeading />,
};
