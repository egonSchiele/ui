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
import { GripVerticalIcon } from "lucide-react";
import { Group, Panel, Separator, } from "react-resizable-panels";
import { cn } from "../../../utils";
export function ResizablePanelGroup(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<Group {...props} data-slot="resizable-panel-group" className={cn("h-full w-full", className)}/>);
}
export function ResizablePanel(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<Panel {...props} data-slot="resizable-panel" className={cn("min-h-0 min-w-0", className)}/>);
}
export function ResizableHandle(_a) {
    var { withHandle = false, children, className } = _a, props = __rest(_a, ["withHandle", "children", "className"]);
    return (<Separator {...props} data-slot="resizable-handle" className={cn("bg-border relative flex w-1 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset aria-disabled:opacity-50 aria-[orientation=horizontal]:h-1 aria-[orientation=horizontal]:w-full [&[aria-orientation=horizontal]>svg]:rotate-90", className)}>
      {children !== null && children !== void 0 ? children : (withHandle && (<GripVerticalIcon aria-hidden="true" className="bg-border z-10 h-5 w-3 rounded-sm"/>))}
    </Separator>);
}
