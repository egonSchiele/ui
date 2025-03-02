import React from "react";
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


// Types taken from
// @radix-ui/react-popper/dist/index.d.mts
declare const SIDE_OPTIONS: readonly ["top", "right", "bottom", "left"];
declare const ALIGN_OPTIONS: readonly ["start", "center", "end"];
type Side = (typeof SIDE_OPTIONS)[number];
type Align = (typeof ALIGN_OPTIONS)[number];
type Boundary = Element | null;

type TooltipContentProps = {
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
  arrowPadding?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Boundary | Boundary[];
  collisionPadding?: number | Partial<Record<Side, number>>;
  sticky?: 'partial' | 'always';
  hideWhenDetached?: boolean;
  updatePositionStrategy?: 'optimized' | 'always';
  onPlaced?: () => void;

  forceMount?: true;

  children: React.ReactNode;
  className?: string;
}

interface TooltipProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened. This will
   * override the prop with the same name passed to Provider.
   * @defaultValue 700
   */
  delayDuration?: number;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean;
}


export function TooltipDemo({ tooltipProps, tooltipContentProps }: { tooltipProps: TooltipProps, tooltipContentProps: TooltipContentProps }) {
  return (
    <TooltipProvider>
      <Tooltip {...tooltipProps}>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent {...tooltipContentProps}>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
