import * as React from "react";
import { type GroupProps, type PanelProps, type SeparatorProps, type Layout, type LayoutChangedMeta } from "react-resizable-panels";
export type ResizableLayout = Layout;
export type ResizableLayoutChangedMeta = LayoutChangedMeta;
export type ResizablePanelSize = `${number}%` | `${number}px`;
export type ResizablePanelGroupProps = GroupProps;
export type ResizablePanelProps = Omit<PanelProps, "id" | "defaultSize" | "minSize" | "maxSize" | "collapsedSize" | "collapsedThreshold"> & {
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
export declare function ResizablePanelGroup({ className, ...props }: ResizablePanelGroupProps): React.JSX.Element;
export declare function ResizablePanel({ className, ...props }: ResizablePanelProps): React.JSX.Element;
export declare function ResizableHandle({ withHandle, children, className, ...props }: ResizableHandleProps): React.JSX.Element;
