var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger, } from "../../components/ui/tooltip";
export function SimpleTooltip(_a) {
    var { children, tooltipContent, asChild = false, triggerProps, contentProps, open, defaultOpen, onOpenChange, delayDuration, disableHoverableContent } = _a, content = __rest(_a, ["children", "tooltipContent", "asChild", "triggerProps", "contentProps", "open", "defaultOpen", "onOpenChange", "delayDuration", "disableHoverableContent"]);
    return (<Tooltip open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} delayDuration={delayDuration} disableHoverableContent={disableHoverableContent}>
      <TooltipTrigger type={asChild ? undefined : "button"} {...triggerProps} asChild={asChild}>
        {children}
      </TooltipTrigger>
      <TooltipContent {...content} {...contentProps}>
        {tooltipContent}
      </TooltipContent>
    </Tooltip>);
}
