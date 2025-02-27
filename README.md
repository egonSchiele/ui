# ui

## Storybook

[See storybook](https://ui-f9fn.vercel.app/?path=/docs/example-button--docs)

### Storybook debugging

- If styles look off, refresh.
- You'll need these two buttons to toggle between light and dark mode. If you don't see them, refresh.

![](/public/storybook-buttons.png)

## Use it

```bash
pnpm add egonSchiele/ui
```

To enable dark mode you'll need to add `class="dark"` to HTML tag. You also need to copy `globals.css` into your project in order to get all of the styling.

## Work on it

```bash
pnpm install

pnpm run vite

pnpm run storybook

pnpm run shadcn add
```

## Publish it

```bash
pnpm run build
```
