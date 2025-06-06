import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { TooltipProps, TooltipProviderProps } from "@radix-ui/react-tooltip";
declare function TooltipProvider({ delayDuration, ...props }: TooltipProviderProps & React.ComponentProps<typeof TooltipPrimitive.Provider>): React.JSX.Element;
declare function Tooltip({ ...props }: TooltipProps & React.ComponentProps<typeof TooltipPrimitive.Root>): React.JSX.Element;
declare function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>): React.JSX.Element;
declare const SIDE_OPTIONS: readonly ["top", "right", "bottom", "left"];
declare const ALIGN_OPTIONS: readonly ["start", "center", "end"];
type Side = (typeof SIDE_OPTIONS)[number];
type Align = (typeof ALIGN_OPTIONS)[number];
type Boundary = Element | null;
type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & {
    side?: Side;
    sideOffset?: number;
    align?: Align;
    alignOffset?: number;
    arrowPadding?: number;
    avoidCollisions?: boolean;
    collisionBoundary?: Boundary | Boundary[];
    collisionPadding?: number | Partial<Record<Side, number>>;
    sticky?: "partial" | "always";
    hideWhenDetached?: boolean;
    updatePositionStrategy?: "optimized" | "always";
    onPlaced?: () => void;
    forceMount?: true;
    children: React.ReactNode;
    className?: string;
};
declare function TooltipContent(props: TooltipContentProps): React.JSX.Element;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
