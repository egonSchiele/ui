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
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../../utils";
export function Slider(_a) {
    var { value, defaultValue, onChange, onCommit, className, min = 0, max = 100, step = 1 } = _a, props = __rest(_a, ["value", "defaultValue", "onChange", "onCommit", "className", "min", "max", "step"]);
    return (<SliderPrimitive.Root {...props} data-slot="slider" min={min} max={max} step={step} value={value === undefined ? undefined : [value]} defaultValue={value === undefined ? [defaultValue !== null && defaultValue !== void 0 ? defaultValue : min] : undefined} onValueChange={(values) => {
            onChange === null || onChange === void 0 ? void 0 : onChange(values[0]);
        }} onValueCommit={(values) => {
            onCommit === null || onCommit === void 0 ? void 0 : onCommit(values[0]);
        }} className={cn("relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-32 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", className)}>
      <SliderPrimitive.Track className="bg-secondary relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2">
        <SliderPrimitive.Range className="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"/>
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb aria-label={props["aria-label"]} aria-labelledby={props["aria-labelledby"]} aria-describedby={props["aria-describedby"]} aria-valuetext={props["aria-valuetext"]} className="border-primary bg-background block size-4 shrink-0 rounded-full border shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"/>
    </SliderPrimitive.Root>);
}
