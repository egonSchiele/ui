"use client";
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
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "../../../utils";
function Checkbox(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<CheckboxPrimitive.Root data-slot="checkbox" className={cn("peer border-muted-foreground bg-background size-4 shrink-0 rounded border shadow-xs outline-none transition-[color,box-shadow] data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props}>
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current data-[state=checked]:[&_.checkbox-minus]:hidden data-[state=indeterminate]:[&_.checkbox-check]:hidden">
        <CheckIcon aria-hidden="true" className="checkbox-check size-3.5"/>
        <MinusIcon aria-hidden="true" className="checkbox-minus size-3.5"/>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>);
}
export { Checkbox };
