// The classes ContextMenu and DropdownMenu share, so a right-click menu
// and an actions menu look the same. A menu taller than the room Radix
// finds beside its trigger stops at that height and scrolls.

export const menuContentClassName: string =
  "bg-popover text-popover-foreground z-50 min-w-40 max-h-(--radix-popper-available-height) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md outline-none";

export const menuItemClassName: string =
  "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
