import React from "react";
declare const SIDE_OPTIONS: readonly ["top", "right", "bottom", "left"];
declare const ALIGN_OPTIONS: readonly ["start", "center", "end"];
type Side = (typeof SIDE_OPTIONS)[number];
type Align = (typeof ALIGN_OPTIONS)[number];
type Boundary = Element | null;
type SimpleTooltipProps = {
    children: React.ReactNode;
    tooltipContent: React.ReactNode;
    side: Side;
    sideOffset?: number;
    align?: Align;
    alignOffset?: number;
    arrowPadding?: number;
    avoidCollisions?: boolean;
    collisionBoundary?: Boundary | Boundary[];
    collisionPadding?: number | Partial<Record<Side, number>>;
    /** Keep showing the tooltip even when the user scrolls till the trigger isn't visible anymore */
    sticky?: "partial" | "always";
    hideWhenDetached?: boolean;
    updatePositionStrategy?: "optimized" | "always";
    onPlaced?: () => void;
    forceMount?: true;
    className?: string;
    open?: boolean;
    defaultOpen?: boolean;
    delayDuration?: number;
    /**
     * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
     * @defaultValue false
     */
    disableHoverableContent?: boolean;
};
export declare function SimpleTooltip(props: SimpleTooltipProps): React.JSX.Element;
export {};
