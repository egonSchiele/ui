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
import { CircleIcon } from "lucide-react";
import { cn } from "../../../utils";
function RadioGroup(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3 data-[orientation=horizontal]:flex data-[orientation=horizontal]:flex-wrap", className)} {...props}/>);
}
function RadioGroupItem(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<RadioGroupPrimitive.Item data-slot="radio-group-item" className={cn("peer border-muted-foreground bg-background text-primary aspect-square size-4 shrink-0 rounded-full border shadow-xs outline-none transition-[color,box-shadow] data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props}>
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="flex items-center justify-center">
        <CircleIcon aria-hidden="true" className="size-2 fill-current"/>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>);
}
export { RadioGroup, RadioGroupItem };
