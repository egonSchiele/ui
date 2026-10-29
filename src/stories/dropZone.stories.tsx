import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DropArea,
  DropZone,
  type DropZoneChoice,
  type DropZoneDecodeResult,
  type DropZoneRejection,
} from "@/components/ui/drop-zone";
import { Button } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import "../../globals.css";

const meta: Meta = {
  title: "UI/DropZone",
  component: DropZone,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

function decodeNames(payload: string): DropZoneDecodeResult<string[]> {
  const decoded: unknown = JSON.parse(payload);
  if (
    Array.isArray(decoded) &&
    decoded.every((item: unknown): item is string => typeof item === "string")
  ) {
    return { ok: true, value: decoded };
  }
  return { ok: false, message: "Expected a list of names." };
}

function DropZoneDemo({
  disabled = false,
  pasteActive = false,
}: {
  disabled?: boolean;
  pasteActive?: boolean;
}): React.JSX.Element {
  const [files, setFiles]: [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>,
  ] = React.useState<string[]>([]);
  const [rejections, setRejections]: [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>,
  ] = React.useState<string[]>([]);
  const [childClicks, setChildClicks]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(0);
  return (
    <div className="flex w-96 flex-col gap-3">
      <DropZone
        label="Images"
        accept="image/*,.png"
        disabled={disabled}
        pasteActive={pasteActive}
        onFiles={(next: File[]): void => {
          setFiles((previous: string[]): string[] => [
            ...previous,
            ...next.map((file: File): string => file.name),
          ]);
        }}
        onReject={(next: DropZoneRejection[]): void => {
          setRejections(
            next.map((item: DropZoneRejection): string => item.message),
          );
        }}
        internalDrop={{
          mimeType: "application/x-demo-names",
          decode: decodeNames,
          onDrop: setFiles,
        }}
      >
        <span>Images</span>
        <Button
          onClick={(): void => {
            setChildClicks((count: number): number => count + 1);
          }}
        >
          Child action
        </Button>
        <Input aria-label="Caption" />
      </DropZone>
      <output>Received: {files.join(", ") || "none"}</output>
      <output>Rejected: {rejections.join(", ") || "none"}</output>
      <output>Child clicks: {childClicks}</output>
      <Input aria-label="Outside text" />
    </div>
  );
}

function NestedDropZoneDemo({
  innerDisabled = false,
}: {
  innerDisabled?: boolean;
}): React.JSX.Element {
  const [outerCount, setOuterCount]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(0);
  const [innerCount, setInnerCount]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(0);
  return (
    <div>
      <DropZone
        label="Outer"
        onFiles={(): void => {
          setOuterCount((count: number): number => count + 1);
        }}
      >
        <DropZone
          label="Inner"
          disabled={innerDisabled}
          onFiles={(): void => {
            setInnerCount((count: number): number => count + 1);
          }}
        />
      </DropZone>
      <output>
        Outer: {outerCount}; inner: {innerCount}
      </output>
    </div>
  );
}

function choiceText(choice: DropZoneChoice): string {
  return choice.accepted
    ? `${choice.file.name} accepted`
    : `${choice.rejection.file?.name ?? "item"} ${choice.rejection.code}`;
}

// Records each selection as one line, in the order of its choices.
function useSelections(): {
  lines: string[];
  reading: number;
  onSelect: (choices: Promise<DropZoneChoice[]>) => void;
} {
  const [lines, setLines]: [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>,
  ] = React.useState<string[]>([]);
  const [reading, setReading]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(0);
  const onSelect = React.useCallback(
    (choices: Promise<DropZoneChoice[]>): void => {
      setReading((count: number): number => count + 1);
      void choices.then((list: DropZoneChoice[]): void => {
        setReading((count: number): number => count - 1);
        setLines((previous: string[]): string[] => [
          ...previous,
          list.map(choiceText).join(", "),
        ]);
      });
    },
    [],
  );
  return { lines, reading, onSelect };
}

function SelectionOutput({
  lines,
  reading,
}: {
  lines: string[];
  reading: number;
}): React.JSX.Element {
  return (
    <>
      <output>Selections: {lines.length}</output>
      <output>Reading: {reading}</output>
      {lines.map(
        (line: string, index: number): React.JSX.Element => (
          <output key={index}>
            Selection {index + 1}: {line}
          </output>
        ),
      )}
    </>
  );
}

function FoldersDemo(): React.JSX.Element {
  const selections = useSelections();
  return (
    <div className="flex w-96 flex-col gap-3">
      <DropZone
        label="Images"
        accept="image/png,.png"
        multiple
        folders
        onSelect={selections.onSelect}
      />
      <SelectionOutput lines={selections.lines} reading={selections.reading} />
    </div>
  );
}

function DropAreaDemo(): React.JSX.Element {
  const selections = useSelections();
  return (
    <div className="flex w-[32rem] flex-col gap-3">
      <DropArea
        prompt="Drop images to add them"
        accept="image/png,.png"
        multiple
        folders
        pasteActive
        onSelect={selections.onSelect}
        className="h-64 rounded-lg border p-4"
      >
        <p data-testid="area-content">Page content</p>
        <Input aria-label="Area text" />
      </DropArea>
      <SelectionOutput lines={selections.lines} reading={selections.reading} />
    </div>
  );
}

export const Default: Story = {
  render: (): React.JSX.Element => <DropZoneDemo />,
};

export const Disabled: Story = {
  render: (): React.JSX.Element => <DropZoneDemo disabled />,
};

export const ActivePaste: Story = {
  render: (): React.JSX.Element => <DropZoneDemo pasteActive />,
};

export const Nested: Story = {
  render: (): React.JSX.Element => <NestedDropZoneDemo />,
};

export const NestedDisabled: Story = {
  render: (): React.JSX.Element => <NestedDropZoneDemo innerDisabled />,
};

export const MultipleFiles: Story = {
  args: {
    label: "Images",
    multiple: true,
    onFiles: (files: File[]): void => {
      console.info("Selected images", files);
    },
  },
};

export const CustomInstructions: Story = {
  args: {
    label: "Reference image",
    description: "Drag an image from the gallery, paste an image, or browse.",
    pickerLabel: "Browse image",
    pasteActive: true,
    onFiles: (files: File[]): void => {
      console.info("Selected reference image", files);
    },
  },
};

export const Folders: Story = {
  render: (): React.JSX.Element => <FoldersDemo />,
};

export const Area: Story = {
  render: (): React.JSX.Element => <DropAreaDemo />,
};
