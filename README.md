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

## Usage notes

After you add the npm package, you'll also need to manually copy over the CSS. Additionally, you'll need to set this package as a source in your CSS, so Tailwind knows to pull Tailwind classes from Egon UI components.

## Troubleshooting

If you see an error related to props, make sure the React version in your app matches the React version in this package, currently React 19.

If you see an error related to `useRef` being `null`, it might be because you're trying to use this package locally instead of pulling it from GitHub. This is a bug in pnpm. Change to pulling it from GitHub and it should now work.