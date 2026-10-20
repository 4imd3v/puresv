# PureSV

Reusable **Svelte 5** UI components styled with **modern CSS**.

No runtime dependencies. No Tailwind, no utility classes, no CSS-in-JS — just
Svelte components, scoped styles, and CSS custom properties.

## Install

```sh
pnpm add puresv
```

Peer dependency: `svelte@^5`.

## Usage

```svelte
<script>
  import { Button, Card, Badge } from "puresv";
</script>

<Card>
  {#snippet header()}
    Monthly report
  {/snippet}

  <Badge tone="success">paid</Badge>

  {#snippet footer()}
    Updated 2 minutes ago
  {/snippet}
</Card>

<Button variant="outline" size="lg" onclick={() => save()}>Save</Button>
```

Importing anything from `puresv` also loads the design tokens, so components
look right with no extra setup — each component imports `theme.css` itself, so
only the CSS you actually use gets bundled. If you only want the tokens:

```js
import "puresv/theme.css";
```

## Theming

Every visual value is a CSS custom property prefixed `--puresv-`. Override any
of them in your own stylesheet — component styles live inside
`@layer puresv`, so plain (unlayered) CSS always wins:

```css
:root {
  --puresv-accent: oklch(0.62 0.19 275);
  --puresv-radius-md: 0.25rem;
}
```

Light/dark follows the OS by default. Force a palette with `data-theme` on
`<html>`:

```svelte
<script>
  let theme = $state("system");

  $effect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.dataset.theme = theme;
  });
</script>
```

Both branches are plain custom-property overrides — no `light-dark()`, so the
toggle keeps working even when a build step (Lightning CSS, older targets)
downlevels modern color functions.

PureSV styles its own components only. Give your page the matching canvas:

```css
body {
  background-color: var(--puresv-canvas);
  color: var(--puresv-text);
}
```

## Components

### Button

| Prop      | Type                                                  | Default   |
| --------- | ----------------------------------------------------- | --------- |
| `variant` | `"solid" \| "soft" \| "outline" \| "ghost" \| "link"` | `"solid"` |
| `size`    | `"sm" \| "md" \| "lg"`                                | `"md"`    |
| `href`    | `string`                                              | —         |

- **solid** — the primary action. Near-black ink fill, quiet hover, and a
  `scale(0.97)` press. No lift, no colored glow.
- **soft** — tinted accent background, for a secondary action that still needs to
  read as "accent".
- **outline** — bordered and transparent, for an action next to a solid one.
- **ghost** — no border, for toolbars and dense rows.
- **link** — text only. Sheds the height and padding from `size` but keeps its
  font size.

Pass `href` to render an `<a>` with the same styling, for navigation that must
stay a real link. Also accepts every native `<button>` attribute (`type`,
`disabled`, `aria-*`, `onclick`, …) — they are forwarded with `{...rest}`.

### Card

Optional `header` and `footer` snippets around a default body slot. Accepts
native `<div>` attributes.

### Badge

| Prop   | Type                                                          | Default     |
| ------ | ------------------------------------------------------------- | ----------- |
| `tone` | `"neutral" \| "accent" \| "success" \| "warning" \| "danger"` | `"neutral"` |
| `dot`  | `boolean`                                                     | `false`     |

## Adding a component

1. Create `src/lib/components/MyThing.svelte`.
2. Wrap its `<style>` rules in `@layer puresv { … }` so consumers can override
   them.
3. Style with `var(--puresv-*)` tokens only — no hardcoded colors or spacing.
4. Re-export it from `src/lib/index.ts`.
5. Add `MyThing.test.ts` next to it and run `vp test`.

## Development

```sh
vp dev          # showcase app with every component
vp test         # component tests (Vitest + happy-dom)
vp check        # format, lint, type check
pnpm run build  # showcase build + library build into dist/
```

Everything in `src/lib` ships. Everything in `src/routes` is the showcase app
and is not published.

## Publishing

`pnpm run build` runs `svelte-package` (source of truth is `src/lib`) and
`publint`. Update `version`, then `npm publish`.

## License

MIT
