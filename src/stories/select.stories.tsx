import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../../globals.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "UI/Select",
  component: Select,
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
    value: { type: "string", defaultValue: "" },
    defaultValue: { type: "string", defaultValue: "" },
    onValueChange: { type: "function", defaultValue: fn() },
    open: { type: "boolean", defaultValue: false },
    defaultOpen: { type: "boolean", defaultValue: false },
    onOpenChange: { type: "function", defaultValue: fn() },
    dir: { options: ["ltr", "rtl"], control: { type: "select" } },
    name: { type: "string", defaultValue: "" },
    autoComplete: { type: "string", defaultValue: "" },
    disabled: { type: "boolean", defaultValue: false },
    required: { type: "boolean", defaultValue: false },
    form: { type: "string", defaultValue: "" },
    children: {},
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </>
    ),
    onValueChange: console.log,
  },
};

// A Select inside a dialog. The list must take focus from the dialog's
// focus trap, and Escape must close the list without closing the dialog.
function InDialogDemo(): React.JSX.Element {
  const [fruit, setFruit]: [string, React.Dispatch<React.SetStateAction<string>>] =
    React.useState<string>("None");
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pick a fruit</DialogTitle>
          <DialogDescription>A dialog with a Select.</DialogDescription>
        </DialogHeader>
        <Select onValueChange={setFruit}>
          <SelectTrigger aria-label="Fruit" className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
        <output>Fruit: {fruit}</output>
      </DialogContent>
    </Dialog>
  );
}

export const InDialog: Story = {
  render: (): React.JSX.Element => <InDialogDemo />,
};
