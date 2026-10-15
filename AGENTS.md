<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## Memory (NWron MCP)

- Before answering questions about this project's history, decisions, or setup, call `remember` first and ground your answer in what it returns.
- After reaching a decision, changing an architecture choice, or learning a fact worth keeping, call `memorize` to persist it.
- On session start, call `recent` to scan what's already known.

# PureSV conventions

Svelte 5 component library. `src/lib` ships, `src/routes` is the showcase app.

- **No runtime dependencies.** Everything is Svelte + CSS. Adding a dependency
  needs a strong reason.
- **No Tailwind / utility classes.** Components use scoped `<style>` blocks and
  CSS custom properties.
- **Design tokens only.** Never hardcode a color, radius, or spacing value in a
  component. Use `var(--puresv-*)` from `src/lib/theme.css`. Need a new token?
  Add it to `theme.css` and use it.
- **Every component imports `../theme.css` in its own `<script>`.** Do NOT move
  that import into `src/lib/index.ts` — Vite's `sideEffects` globs do not match
  `.css` files, so a package-level side-effect import gets tree-shaken away and
  consumers end up with unstyled components. Verified against Vite 8.
- **Wrap component styles in `@layer puresv { … }`** so consumer CSS (unlayered)
  always wins. Do the same for the global stylesheet.
- **Theming** is plain custom-property overrides in `src/lib/theme.css`: a light
  base, a dark block for `:root[data-theme="dark"]`, and the same dark block
  under `@media (prefers-color-scheme: dark)` for the OS default. Do not use
  `light-dark()` — build pipelines that downlevel it (Lightning CSS) turn the
  `data-theme` toggle into a no-op. Keep the two dark blocks in sync.
- **Snippets over slots.** Svelte 5 runes mode: `children: Snippet`, `{@render
  children()}`, named snippets via `{#snippet header()}`.
- **Forward native attributes** with `let { …rest }: Props = $props()` and
  `{...rest}` on the root element, typed via `HTMLAttributes` from
  `svelte/elements`.
- **Every component gets a test.** Component tests live next to the component
  and run under `vp test`. Svelte 5 snippets render into an anchor node, so build
  test snippets with `createRawSnippet` — a plain `() => "text"` renders
  nothing.
- **Validate with** `vp check`, `vp test`, and `pnpm run build` (which also runs
  `svelte-package` + `publint`).

# NOTES

- DO NOT run dev server, let user run it manually
- DO NOT commit changes, let user commit them manually or if user ask to commit
