"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/utils";
import { menuContentClassName, menuItemClassName } from "./menu-classes";

export const ContextMenu = ContextMenuPrimitive.Root;

export function ContextMenuTrigger({
  onKeyDown,
  disabled,
  asChild,
  tabIndex,
  ...props
}: React.ComponentProps<
  typeof ContextMenuPrimitive.Trigger
>): React.JSX.Element {
  function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>): void {
    onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      disabled ||
      !(event.key === "ContextMenu" || (event.shiftKey && event.key === "F10"))
    ) {
      return;
    }
    event.preventDefault();
    const bounds: DOMRect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.dispatchEvent(
      new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        button: 2,
        clientX: bounds.left + bounds.width / 2,
        clientY: bounds.top + bounds.height / 2,
      }),
    );
  }
  return (
    <ContextMenuPrimitive.Trigger
      {...props}
      disabled={disabled}
      asChild={asChild}
      tabIndex={asChild ? tabIndex : (tabIndex ?? (disabled ? -1 : 0))}
      onKeyDown={handleKeyDown}
    />
  );
}

export const ContextMenuGroup = ContextMenuPrimitive.Group;

export const ContextMenuPortal = ContextMenuPrimitive.Portal;

export const ContextMenuSub = ContextMenuPrimitive.Sub;

export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<
  typeof ContextMenuPrimitive.Content
>): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        {...props}
        data-slot="context-menu-content"
        className={cn(menuContentClassName, className)}
      />
    </ContextMenuPrimitive.Portal>
  );
}

export function ContextMenuItem({
  className,
  inset = false,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Item
      {...props}
      data-slot="context-menu-item"
      className={cn(
        menuItemClassName,
        inset && "pl-8",
        variant === "destructive" && "text-destructive focus:text-destructive",
        className,
      )}
    />
  );
}

export function ContextMenuCheckboxItem({
  children,
  className,
  ...props
}: React.ComponentProps<
  typeof ContextMenuPrimitive.CheckboxItem
>): React.JSX.Element {
  return (
    <ContextMenuPrimitive.CheckboxItem
      {...props}
      data-slot="context-menu-checkbox-item"
      className={cn(menuItemClassName, "pl-8", className)}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon aria-hidden="true" className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

export function ContextMenuRadioItem({
  children,
  className,
  ...props
}: React.ComponentProps<
  typeof ContextMenuPrimitive.RadioItem
>): React.JSX.Element {
  return (
    <ContextMenuPrimitive.RadioItem
      {...props}
      data-slot="context-menu-radio-item"
      className={cn(menuItemClassName, "pl-8", className)}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon aria-hidden="true" className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

export function ContextMenuLabel({
  className,
  inset = false,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Label
      {...props}
      data-slot="context-menu-label"
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className,
      )}
    />
  );
}

export function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<
  typeof ContextMenuPrimitive.Separator
>): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Separator
      {...props}
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
    />
  );
}

export function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<typeof Kbd>): React.JSX.Element {
  return <Kbd {...props} className={cn("ml-auto", className)} />;
}

export function ContextMenuSubTrigger({
  className,
  children,
  inset = false,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}): React.JSX.Element {
  return (
    <ContextMenuPrimitive.SubTrigger
      {...props}
      data-slot="context-menu-sub-trigger"
      className={cn(
        menuItemClassName,
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        inset && "pl-8",
        className,
      )}
    >
      {children}
      <ChevronRightIcon aria-hidden="true" className="ml-auto size-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

export function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<
  typeof ContextMenuPrimitive.SubContent
>): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        {...props}
        data-slot="context-menu-sub-content"
        className={cn(menuContentClassName, className)}
      />
    </ContextMenuPrimitive.Portal>
  );
}
