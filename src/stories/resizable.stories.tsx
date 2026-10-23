import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  type ResizableLayout,
  type ResizableLayoutChangedMeta,
} from "@/components/ui/layout/resizable";
import "../../globals.css";

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "UI/Resizable",
  component: ResizablePanelGroup,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

function ResizableDemo({
  orientation = "horizontal",
  disabled = false,
}: {
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
}): React.JSX.Element {
  const [layout, setLayout]: [
    ResizableLayout,
    React.Dispatch<React.SetStateAction<ResizableLayout>>,
  ] = React.useState<ResizableLayout>({ sidebar: 30, content: 70 });
  const [userChanges, setUserChanges]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(0);
  function onLayoutChanged(
    next: ResizableLayout,
    meta: ResizableLayoutChangedMeta,
  ): void {
    if (meta.isUserInteraction) {
      setLayout(meta.requestedLayout ?? next);
      setUserChanges((count: number): number => count + 1);
    }
  }
  return (
    <div className="flex w-[600px] max-w-full flex-col gap-3">
      <div className="h-72 rounded border">
        <ResizablePanelGroup
          orientation={orientation}
          disabled={disabled}
          defaultLayout={{ sidebar: 30, content: 70 }}
          onLayoutChanged={onLayoutChanged}
        >
          <ResizablePanel
            id="sidebar"
            minSize="15%"
            maxSize="70%"
            collapsible
            collapsedSize="0%"
          >
            <div className="p-4">Sidebar</div>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize sidebar" withHandle />
          <ResizablePanel id="content" minSize="100px">
            <div className="p-4">Content</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <output>
        Saved sidebar: {Math.round(layout.sidebar)}%; user changes:{" "}
        {userChanges}
      </output>
    </div>
  );
}

export const Default: Story = {
  render: (): React.JSX.Element => <ResizableDemo />,
};

export const Vertical: Story = {
  render: (): React.JSX.Element => <ResizableDemo orientation="vertical" />,
};

export const Disabled: Story = {
  render: (): React.JSX.Element => <ResizableDemo disabled />,
};
