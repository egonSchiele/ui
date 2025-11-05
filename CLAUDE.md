This repo contains reusable React components.

## Adding or updating components
All components are under `lib/components/`.
If you edit or add a component, make sure you update its related story in `src/stories/`.
If you are creating or deleting a component, you will also need to edit `lib/index.tsx`, which is the file that exports all components that will be used by external apps.

## Updating documentation
If you add or update a component, please also update the documentation in `DOCS_FOR_CLAUDE.md`. This documentation is used by Claude. For any component you add or update, it should give a 1-line description, show an example of usage, and give a list of properties that that component takes.

## Testing your changes

Run

```
make
```

and make sure the command does not fail.

## shadcn UI
These components are built on top of shadcn UI. You can use the shadcn MCP server to see what other components are available.