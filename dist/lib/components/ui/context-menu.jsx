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
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { Kbd } from "../../components/ui/kbd";
import { cn } from "../../utils";
export const ContextMenu = ContextMenuPrimitive.Root;
export function ContextMenuTrigger(_a) {
    var { onKeyDown, disabled, asChild, tabIndex } = _a, props = __rest(_a, ["onKeyDown", "disabled", "asChild", "tabIndex"]);
    function handleKeyDown(event) {
        onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
        if (event.defaultPrevented ||
            disabled ||
            !(event.key === "ContextMenu" || (event.shiftKey && event.key === "F10"))) {
            return;
        }
        event.preventDefault();
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.dispatchEvent(new MouseEvent("contextmenu", {
            bubbles: true,
            cancelable: true,
            button: 2,
            clientX: bounds.left + bounds.width / 2,
            clientY: bounds.top + bounds.height / 2,
        }));
    }
    return (<ContextMenuPrimitive.Trigger {...props} disabled={disabled} asChild={asChild} tabIndex={asChild ? tabIndex : (tabIndex !== null && tabIndex !== void 0 ? tabIndex : (disabled ? -1 : 0))} onKeyDown={handleKeyDown}/>);
}
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
const contentClassName = "bg-popover text-popover-foreground z-50 min-w-40 overflow-hidden rounded-md border p-1 shadow-md outline-none";
const itemClassName = "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
export function ContextMenuContent(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content {...props} data-slot="context-menu-content" className={cn(contentClassName, className)}/>
    </ContextMenuPrimitive.Portal>);
}
export function ContextMenuItem(_a) {
    var { className, inset = false, variant = "default" } = _a, props = __rest(_a, ["className", "inset", "variant"]);
    return (<ContextMenuPrimitive.Item {...props} data-slot="context-menu-item" className={cn(itemClassName, inset && "pl-8", variant === "destructive" && "text-destructive focus:text-destructive", className)}/>);
}
export function ContextMenuCheckboxItem(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<ContextMenuPrimitive.CheckboxItem {...props} data-slot="context-menu-checkbox-item" className={cn(itemClassName, "pl-8", className)}>
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon aria-hidden="true" className="size-4"/>
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>);
}
export function ContextMenuRadioItem(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<ContextMenuPrimitive.RadioItem {...props} data-slot="context-menu-radio-item" className={cn(itemClassName, "pl-8", className)}>
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon aria-hidden="true" className="size-2 fill-current"/>
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>);
}
export function ContextMenuLabel(_a) {
    var { className, inset = false } = _a, props = __rest(_a, ["className", "inset"]);
    return (<ContextMenuPrimitive.Label {...props} data-slot="context-menu-label" className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}/>);
}
export function ContextMenuSeparator(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<ContextMenuPrimitive.Separator {...props} data-slot="context-menu-separator" className={cn("bg-border -mx-1 my-1 h-px", className)}/>);
}
export function ContextMenuShortcut(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return <Kbd {...props} className={cn("ml-auto", className)}/>;
}
export function ContextMenuSubTrigger(_a) {
    var { className, children, inset = false } = _a, props = __rest(_a, ["className", "children", "inset"]);
    return (<ContextMenuPrimitive.SubTrigger {...props} data-slot="context-menu-sub-trigger" className={cn(itemClassName, "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", inset && "pl-8", className)}>
      {children}
      <ChevronRightIcon aria-hidden="true" className="ml-auto size-4"/>
    </ContextMenuPrimitive.SubTrigger>);
}
export function ContextMenuSubContent(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent {...props} data-slot="context-menu-sub-content" className={cn(contentClassName, className)}/>
    </ContextMenuPrimitive.Portal>);
}
