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
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { Kbd } from "../../components/ui/kbd";
import { cn } from "../../utils";
import { menuContentClassName, menuItemClassName } from "./menu-classes";
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export function DropdownMenuContent(_a) {
    var { className, sideOffset = 4 } = _a, props = __rest(_a, ["className", "sideOffset"]);
    return (<DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content {...props} sideOffset={sideOffset} data-slot="dropdown-menu-content" className={cn(menuContentClassName, className)}/>
    </DropdownMenuPrimitive.Portal>);
}
export function DropdownMenuItem(_a) {
    var { className, inset = false, variant = "default" } = _a, props = __rest(_a, ["className", "inset", "variant"]);
    return (<DropdownMenuPrimitive.Item {...props} data-slot="dropdown-menu-item" className={cn(menuItemClassName, inset && "pl-8", variant === "destructive" && "text-destructive focus:text-destructive", className)}/>);
}
export function DropdownMenuCheckboxItem(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<DropdownMenuPrimitive.CheckboxItem {...props} data-slot="dropdown-menu-checkbox-item" className={cn(menuItemClassName, "pl-8", className)}>
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon aria-hidden="true" className="size-4"/>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>);
}
export function DropdownMenuRadioItem(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<DropdownMenuPrimitive.RadioItem {...props} data-slot="dropdown-menu-radio-item" className={cn(menuItemClassName, "pl-8", className)}>
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon aria-hidden="true" className="size-2 fill-current"/>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>);
}
export function DropdownMenuLabel(_a) {
    var { className, inset = false } = _a, props = __rest(_a, ["className", "inset"]);
    return (<DropdownMenuPrimitive.Label {...props} data-slot="dropdown-menu-label" className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}/>);
}
export function DropdownMenuSeparator(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<DropdownMenuPrimitive.Separator {...props} data-slot="dropdown-menu-separator" className={cn("bg-border -mx-1 my-1 h-px", className)}/>);
}
export function DropdownMenuShortcut(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return <Kbd {...props} className={cn("ml-auto", className)}/>;
}
export function DropdownMenuSubTrigger(_a) {
    var { className, children, inset = false } = _a, props = __rest(_a, ["className", "children", "inset"]);
    return (<DropdownMenuPrimitive.SubTrigger {...props} data-slot="dropdown-menu-sub-trigger" className={cn(menuItemClassName, "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", inset && "pl-8", className)}>
      {children}
      <ChevronRightIcon aria-hidden="true" className="ml-auto size-4"/>
    </DropdownMenuPrimitive.SubTrigger>);
}
export function DropdownMenuSubContent(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent {...props} data-slot="dropdown-menu-sub-content" className={cn(menuContentClassName, className)}/>
    </DropdownMenuPrimitive.Portal>);
}
