import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types taken from
// @radix-ui/react-popper/dist/index.d.mts
const SIDE_OPTIONS = ["top", "right", "bottom", "left"] as const;
const ALIGN_OPTIONS = ["start", "center", "end"] as const;
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

export function SimpleTooltip(props: SimpleTooltipProps) {
  const tooltipProps = {
    open: props.open,
    defaultOpen: props.defaultOpen,
    delayDuration: props.delayDuration,
  };

  return (
    <TooltipProvider>
      <Tooltip {...tooltipProps}>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent {...props}>{props.tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

{
  /* <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider> */
}
