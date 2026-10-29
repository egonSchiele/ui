import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/form/button";
import "../../globals.css";

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

function DropdownMenuDemo(): React.JSX.Element {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">File actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={(): void => {
              setAction("Opened");
            }}
          >
            Open<DropdownMenuShortcut>↵</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Unavailable</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onSelect={(): void => {
                  setAction("Archived");
                }}
              >
                Archive
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={checked}
            onCheckedChange={(next: boolean | "indeterminate"): void => {
              setChecked(next === true);
            }}
          >
            Show details
          </DropdownMenuCheckboxItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={(): void => {
              setAction("Trashed");
            }}
          >
            Move to Trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <output>Action: {action}</output>
    </div>
  );
}

export const Default: Story = {
  render: (): React.JSX.Element => <DropdownMenuDemo />,
};

// An icon button that opens an item's actions, as on a card in a grid.
function ActionsButtonDemo(): React.JSX.Element {
  const [action, setAction]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = React.useState<string>("None");
  return (
    <div className="flex flex-col items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" aria-label="Actions for Cover 3">
            <MoreHorizontalIcon aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={(): void => setAction("Rename")}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(): void => setAction("Move to…")}>
            Move to…
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <output>Action: {action}</output>
    </div>
  );
}

export const ActionsButton: Story = {
  render: (): React.JSX.Element => <ActionsButtonDemo />,
};
