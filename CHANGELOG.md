# Changelog

## Oct 29 2026
- DropdownMenu: Added the DropdownMenu family, styled like ContextMenu. Both now share their classes from `menu-classes.ts`.
- Menus: A menu taller than the room beside its trigger stops at that height and scrolls.
- Dialog and Popover: Bumped `@radix-ui/react-dialog` and `@radix-ui/react-popover` to 1.3.1, so they share Radix's layer and focus code with the menus. A menu item that opens a dialog no longer leaves the page unclickable, and a menu inside a dialog takes focus. A new layer now takes Escape a few frames after it mounts.

## Nov 23 2025
- SimpleForm: Added `transform` param to transform field values before validation/submission
- SimpleForm: Auto-convert `isNumber` input fields to float via `parseFloat()` by default