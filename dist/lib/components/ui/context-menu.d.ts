import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Kbd } from "../../components/ui/kbd";
export declare const ContextMenu: React.FC<ContextMenuPrimitive.ContextMenuProps>;
export declare function ContextMenuTrigger({ onKeyDown, disabled, tabIndex, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>): React.JSX.Element;
export declare const ContextMenuGroup: React.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
export declare const ContextMenuPortal: React.FC<ContextMenuPrimitive.ContextMenuPortalProps>;
export declare const ContextMenuSub: React.FC<ContextMenuPrimitive.ContextMenuSubProps>;
export declare const ContextMenuRadioGroup: React.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
export declare function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>): React.JSX.Element;
export declare function ContextMenuItem({ className, inset, variant, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): React.JSX.Element;
export declare function ContextMenuCheckboxItem({ children, className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>): React.JSX.Element;
export declare function ContextMenuRadioItem({ children, className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>): React.JSX.Element;
export declare function ContextMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
}): React.JSX.Element;
export declare function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>): React.JSX.Element;
export declare function ContextMenuShortcut({ className, ...props }: React.ComponentProps<typeof Kbd>): React.JSX.Element;
export declare function ContextMenuSubTrigger({ className, children, inset, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): React.JSX.Element;
export declare function ContextMenuSubContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>): React.JSX.Element;
