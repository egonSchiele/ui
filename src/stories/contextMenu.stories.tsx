import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/form/button";
import "../../globals.css";

const meta: Meta<typeof ContextMenu> = {
  title: "UI/ContextMenu",
  component: ContextMenu,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

function ContextMenuDemo(): React.JSX.Element {
  const [action, setAction]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = React.useState<string>("None");
  const [checked, setChecked]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = React.useState<boolean>(true);
  return (
    <div className="flex flex-col gap-3">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button variant="outline">File actions</Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuItem
            onSelect={(): void => {
              setAction("Opened");
            }}
          >
            Open<ContextMenuShortcut>↵</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>Unavailable</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem
                onSelect={(): void => {
                  setAction("Archived");
                }}
              >
                Archive
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={checked}
            onCheckedChange={(next: boolean | "indeterminate"): void => {
              setChecked(next === true);
            }}
          >
            Show details
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
      <output>Action: {action}</output>
    </div>
  );
}

export const Default: Story = {
  render: (): React.JSX.Element => <ContextMenuDemo />,
};
