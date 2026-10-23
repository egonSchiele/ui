"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import {
  Group,
  Panel,
  Separator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
  type Layout,
  type LayoutChangedMeta,
} from "react-resizable-panels";
import { cn } from "@/utils";

export type ResizableLayout = Layout;

export type ResizableLayoutChangedMeta = LayoutChangedMeta;

export type ResizablePanelSize = `${number}%` | `${number}px`;

export type ResizablePanelGroupProps = GroupProps;

export type ResizablePanelProps = Omit<
  PanelProps,
  | "id"
  | "defaultSize"
  | "minSize"
  | "maxSize"
  | "collapsedSize"
  | "collapsedThreshold"
> & {
  id: string;
  defaultSize?: ResizablePanelSize;
  minSize?: ResizablePanelSize;
  maxSize?: ResizablePanelSize;
  collapsedSize?: ResizablePanelSize;
  collapsedThreshold?: ResizablePanelSize;
};

export type ResizableHandleProps = SeparatorProps & {
  "aria-label": string;
  withHandle?: boolean;
};

export function ResizablePanelGroup({
  className,
  ...props
}: ResizablePanelGroupProps): React.JSX.Element {
  return (
    <Group
      {...props}
      data-slot="resizable-panel-group"
      className={cn("h-full w-full", className)}
    />
  );
}

export function ResizablePanel({
  className,
  ...props
}: ResizablePanelProps): React.JSX.Element {
  return (
    <Panel
      {...props}
      data-slot="resizable-panel"
      className={cn("min-h-0 min-w-0", className)}
    />
  );
}

export function ResizableHandle({
  withHandle = false,
  children,
  className,
  ...props
}: ResizableHandleProps): React.JSX.Element {
  return (
    <Separator
      {...props}
      data-slot="resizable-handle"
      className={cn(
        "bg-border relative flex w-1 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset aria-disabled:opacity-50 aria-[orientation=horizontal]:h-1 aria-[orientation=horizontal]:w-full [&[aria-orientation=horizontal]>svg]:rotate-90",
        className,
      )}
    >
      {children ??
        (withHandle && (
          <GripVerticalIcon
            aria-hidden="true"
            className="bg-border z-10 h-5 w-3 rounded-sm"
          />
        ))}
    </Separator>
  );
}
