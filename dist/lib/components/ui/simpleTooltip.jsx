import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../components/ui/tooltip";
// Types taken from
// @radix-ui/react-popper/dist/index.d.mts
const SIDE_OPTIONS = ["top", "right", "bottom", "left"];
const ALIGN_OPTIONS = ["start", "center", "end"];
export function SimpleTooltip(props) {
    const tooltipProps = {
        open: props.open,
        defaultOpen: props.defaultOpen,
        delayDuration: props.delayDuration,
    };
    return (<TooltipProvider>
      <Tooltip {...tooltipProps}>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent {...props}>{props.tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>);
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
