import type { Meta, StoryObj } from "@storybook/react";
import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";
import { Button } from "@/components/ui/form/button";
import React from "react";
import "../../globals.css";

const statusItems = [
  { key: "backlog", label: "Backlog" },
  { key: "todo", label: "Todo" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
  { key: "canceled", label: "Canceled" },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Examples/Combobox",
  component: ComboBox,
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
  argTypes: {},
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: statusItems,
    placeholder: "Select status...",
    onSelect: (item: ComboBoxItem) => {
      console.log("Selected:", item);
    },
  },
};

export const WithCustomEmptyState: Story = {
  args: {
    items: statusItems,
    placeholder: "Select status...",
    emptyState: (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">No status found.</p>
        <Button
          onClick={() => {
            alert("Add new status clicked!");
          }}
        >
          Add new status
        </Button>
      </div>
    ),
    onSelect: (item: ComboBoxItem) => {
      console.log("Selected:", item);
    },
  },
};

const groupedItems: ComboBoxItem<{ size: string }>[] = [
  {
    key: "one",
    label: "Shared name",
    group: "Family A",
    metadata: { size: "4 GB" },
  },
  {
    key: "two",
    label: "Shared name",
    group: "Family B",
    metadata: { size: "8 GB" },
  },
  { key: "disabled", label: "Unavailable", group: "Family B", disabled: true },
  { key: "third", label: "Third model", group: "Family B" },
];
function ControlledComboBox(): React.JSX.Element {
  const [key, setKey]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ] = React.useState<string | null>("one");
  return (
    <div className="flex flex-col gap-3">
      <ComboBox
        items={groupedItems}
        selectedKey={key}
        onSelectedKeyChange={setKey}
        aria-label="Model"
        placeholder="Search models"
        buttonClassName="w-64"
        renderItem={(item: ComboBoxItem<{ size: string }>): React.ReactNode => (
          <span>
            {item.label} {item.metadata?.size}
          </span>
        )}
      />
      <output>Selected key: {key ?? "none"}</output>
      <Button onClick={(): void => setKey(null)}>Clear selection</Button>
      <Button onClick={(): void => setKey("third")}>
        Select third externally
      </Button>
    </div>
  );
}
export const ControlledGrouped: Story = {
  render: (): React.JSX.Element => <ControlledComboBox />,
};
export const Loading: Story = {
  args: { items: [], loading: true, "aria-label": "Model" },
};
export const Disabled: Story = { args: { items: statusItems, disabled: true } };
