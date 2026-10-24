import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../components/ui/tooltip";
type ContentProps = Omit<React.ComponentProps<typeof TooltipContent>, "children" | "asChild">;
type RootProps = Omit<React.ComponentProps<typeof Tooltip>, "children">;
export type SimpleTooltipProps = ContentProps & RootProps & {
    children: React.ReactNode;
    tooltipContent: React.ReactNode;
    asChild?: boolean;
    triggerProps?: Omit<React.ComponentProps<typeof TooltipTrigger>, "children" | "asChild">;
    contentProps?: ContentProps;
};
export declare function SimpleTooltip({ children, tooltipContent, asChild, triggerProps, contentProps, open, defaultOpen, onOpenChange, delayDuration, disableHoverableContent, ...content }: SimpleTooltipProps): React.JSX.Element;
export {};
