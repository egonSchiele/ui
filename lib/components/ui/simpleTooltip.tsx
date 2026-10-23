import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ContentProps = Omit<
  React.ComponentProps<typeof TooltipContent>,
  "children" | "asChild"
>;
type RootProps = Omit<React.ComponentProps<typeof Tooltip>, "children">;
export type SimpleTooltipProps = ContentProps &
  RootProps & {
    children: React.ReactNode;
    tooltipContent: React.ReactNode;
    asChild?: boolean;
    triggerProps?: Omit<
      React.ComponentProps<typeof TooltipTrigger>,
      "children" | "asChild"
    >;
    contentProps?: ContentProps;
  };

export function SimpleTooltip({
  children,
  tooltipContent,
  asChild = false,
  triggerProps,
  contentProps,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  disableHoverableContent,
  ...content
}: SimpleTooltipProps): React.JSX.Element {
  return (
    <Tooltip
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipTrigger
        type={asChild ? undefined : "button"}
        {...triggerProps}
        asChild={asChild}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent {...content} {...contentProps}>
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
}
