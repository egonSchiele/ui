import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/form/button";
import "../../globals.css";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

function ScrollAreaDemo(): React.JSX.Element {
  const viewportRef: React.RefObject<HTMLDivElement | null> =
    React.useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col gap-3">
      <ScrollArea
        className="h-48 w-72 rounded border"
        orientation="both"
        viewportRef={viewportRef}
        viewportProps={{ "aria-label": "Files", role: "region" }}
      >
        <div className="w-96 p-4">
          {Array.from(
            { length: 30 },
            (_: unknown, index: number): React.JSX.Element => (
              <p key={index}>File {index + 1}</p>
            ),
          )}
        </div>
      </ScrollArea>
      <Button
        onClick={(): void => {
          viewportRef.current?.scrollTo({
            top: viewportRef.current.scrollHeight,
          });
        }}
      >
        Scroll to last file
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: (): React.JSX.Element => <ScrollAreaDemo />,
};
