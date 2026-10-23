import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DropZone,
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

function NestedDropZoneDemo(): React.JSX.Element {
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
