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
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../utils";
export function ScrollArea(_a) {
    var _b;
    var { children, className, viewportRef, viewportProps, orientation = "vertical" } = _a, props = __rest(_a, ["children", "className", "viewportRef", "viewportProps", "orientation"]);
    return (<ScrollAreaPrimitive.Root {...props} data-slot="scroll-area" className={cn("relative overflow-hidden", className)}>
      <ScrollAreaPrimitive.Viewport {...viewportProps} ref={viewportRef} data-slot="scroll-area-viewport" tabIndex={(_b = viewportProps === null || viewportProps === void 0 ? void 0 : viewportProps.tabIndex) !== null && _b !== void 0 ? _b : 0} className={cn("size-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset", viewportProps === null || viewportProps === void 0 ? void 0 : viewportProps.className)}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      {orientation !== "horizontal" && <ScrollBar orientation="vertical"/>}
      {orientation !== "vertical" && <ScrollBar orientation="horizontal"/>}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>);
}
export function ScrollBar(_a) {
    var { className, orientation = "vertical" } = _a, props = __rest(_a, ["className", "orientation"]);
    return (<ScrollAreaPrimitive.Scrollbar {...props} orientation={orientation} data-slot="scroll-bar" className={cn("flex touch-none select-none p-0.5 transition-colors", orientation === "vertical"
            ? "h-full w-2.5 border-l border-l-transparent"
            : "h-2.5 flex-col border-t border-t-transparent", className)}>
      <ScrollAreaPrimitive.Thumb className="bg-border relative flex-1 rounded-full"/>
    </ScrollAreaPrimitive.Scrollbar>);
}
