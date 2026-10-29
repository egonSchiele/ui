# Changelog

## Oct 29 2026
- DropdownMenu: Added the DropdownMenu family, styled like ContextMenu. Both now share their classes from `menu-classes.ts`.
- Menus: A menu taller than the room beside its trigger stops at that height and scrolls.
- Radix: Pinned every Radix package that opens a layer to an exact version: Dialog and Popover 1.3.1, Select 2.4.1, Tooltip 1.4.1, ContextMenu 2.4.1, DropdownMenu 2.2.1, Menubar 1.2.1, and NavigationMenu 1.4.1. They now share one copy of Radix's layer and focus code.
- Dialog: A menu item that opens a dialog no longer leaves the page unclickable after the dialog closes. A menu or Select inside a dialog takes focus. Escape closes a menu, Select, or tooltip inside a dialog without closing the dialog.
- Layers: A new layer takes Escape a few frames after it mounts. Until then, the layer under it takes Escape.

## Nov 23 2025
- SimpleForm: Added `transform` param to transform field values before validation/submission
- SimpleForm: Auto-convert `isNumber` input fields to float via `parseFloat()` by default