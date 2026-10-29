"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/utils";
import { menuContentClassName, menuItemClassName } from "./menu-classes";

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
>): React.JSX.Element {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        {...props}
        sideOffset={sideOffset}
        data-slot="dropdown-menu-content"
        className={cn(menuContentClassName, className)}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  className,
  inset = false,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}): React.JSX.Element {
  return (
    <DropdownMenuPrimitive.Item
      {...props}
      data-slot="dropdown-menu-item"
      className={cn(
        menuItemClassName,
        inset && "pl-8",
        variant === "destructive" && "text-destructive focus:text-destructive",
        className,
      )}
    />
  );
}

export function DropdownMenuCheckboxItem({
  children,
  className,
  ...props
}: React.ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
>): React.JSX.Element {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      {...props}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(menuItemClassName, "pl-8", className)}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon aria-hidden="true" className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({
  children,
  className,
  ...props
}: React.ComponentProps<
  typeof DropdownMenuPrimitive.RadioItem
>): React.JSX.Element {
  return (
    <DropdownMenuPrimitive.RadioItem
      {...props}
      data-slot="dropdown-menu-radio-item"
      className={cn(menuItemClassName, "pl-8", className)}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon aria-hidden="true" className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

export function DropdownMenuLabel({
  className,
  inset = false,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}): React.JSX.Element {
  return (
    <DropdownMenuPrimitive.Label
      {...props}
      data-slot="dropdown-menu-label"
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className,
      )}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<
  typeof DropdownMenuPrimitive.Separator
>): React.JSX.Element {
  return (
    <DropdownMenuPrimitive.Separator
      {...props}
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
    />
  );
}

export function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<typeof Kbd>): React.JSX.Element {
  return <Kbd {...props} className={cn("ml-auto", className)} />;
}

export function DropdownMenuSubTrigger({
  className,
  children,
  inset = false,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}): React.JSX.Element {
  return (
    <DropdownMenuPrimitive.SubTrigger
      {...props}
      data-slot="dropdown-menu-sub-trigger"
      className={cn(
        menuItemClassName,
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        inset && "pl-8",
        className,
      )}
    >
      {children}
      <ChevronRightIcon aria-hidden="true" className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<
  typeof DropdownMenuPrimitive.SubContent
>): React.JSX.Element {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        {...props}
        data-slot="dropdown-menu-sub-content"
        className={cn(menuContentClassName, className)}
      />
    </DropdownMenuPrimitive.Portal>
  );
}
