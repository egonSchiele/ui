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
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../../utils";
const segmentSizes = {
    sm: "min-h-7 px-2 text-xs",
    md: "min-h-9 px-3 text-sm",
    lg: "min-h-11 px-4 text-base",
};
export function SegmentedControl(_a) {
    var { options, size = "md", className, orientation = "horizontal", onValueChange } = _a, props = __rest(_a, ["options", "size", "className", "orientation", "onValueChange"]);
    function select(value) {
        const option = options.find((candidate) => candidate.value === value);
        if (option && !option.disabled) {
            onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(option.value);
        }
    }
    return (<RadioGroupPrimitive.Root {...props} required onValueChange={select} orientation={orientation} data-slot="segmented-control" className={cn("inline-flex w-fit gap-1 rounded-lg bg-muted p-1 data-[orientation=vertical]:flex-col", className)}>
      {options.map((option) => (<RadioGroupPrimitive.Item key={option.value} value={option.value} disabled={option.disabled} aria-label={option.ariaLabel} className={cn("inline-flex items-center justify-center gap-2 rounded-md font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:bg-background data-[state=checked]:text-foreground data-[state=checked]:shadow-sm disabled:pointer-events-none disabled:opacity-50", segmentSizes[size])}>
            {option.label}
          </RadioGroupPrimitive.Item>))}
    </RadioGroupPrimitive.Root>);
}
