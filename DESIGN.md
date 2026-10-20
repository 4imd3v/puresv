---
version: alpha
name: PureSV
description: Geist-style precise minimal — a restrained Svelte 5 component library where near-black is the action color and blue is reserved for meaning.
colors:
  primary: "#171717"
  primary-hover: "#333333"
  on-primary: "#ffffff"
  accent: "#0070f3"
  accent-hover: "#0761d1"
  on-accent: "#ffffff"
  background: "#ffffff"
  surface: "#fafafa"
  surface-2: "#f4f4f5"
  text: "#171717"
  text-muted: "#6b6b6b"
  border: "#eaeaea"
  border-strong: "#d4d4d4"
  accent-soft: "#e8f1fd"
  success: "#00a86b"
  success-soft: "#e0f5ec"
  warning: "#b8860b"
  warning-soft: "#f6ecd2"
  danger: "#e5484d"
  danger-soft: "#fdeaea"
typography:
  display:
    fontFamily: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
    fontSize: 2.75rem
    fontWeight: 600
    letterSpacing: -0.03em
  h1:
    fontFamily: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
    fontSize: 1.5rem
    fontWeight: 600
    letterSpacing: -0.02em
  body-md:
    fontFamily: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
    fontSize: 0.875rem
    fontWeight: 400
  label:
    fontFamily: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
    fontSize: 0.875rem
    fontWeight: 500
    letterSpacing: -0.005em
  caption:
    fontFamily: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
    fontSize: 0.75rem
    fontWeight: 500
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    height: 36px
  button-soft:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-hover}"
    rounded: "{rounded.md}"
    height: 36px
  link:
    backgroundColor: "{colors.background}"
    textColor: "{colors.accent}"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    height: 40px
  card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
---

## Overview

**Geist-style precise minimal.** PureSV is a Svelte 5 component library whose
identity is built on _restraint_ rather than tint. It deliberately rejects the
default "AI-generated dashboard" look — indigo accents, Tailwind slate grays, a
border plus a soft drop shadow on every surface, and sprinkled font-weights.

The whole system rests on a few convictions:

1. **The action color is near-black, not a hue.** A solid button is ink. This is
   the single strongest signal that the design was _chosen_, not generated.
2. **Blue means something.** The accent (`#0070f3`) is rationed to links, focus
   rings, and selected states. It is never a default button fill.
3. **Everything else is a true neutral.** No blue cast in the grays. Elevation
   comes from borders and a hairline top highlight, not shadows.
4. **Discipline reads as craft.** Tight radii, a strict weight scale, and fast,
   quiet motion compound into something that feels intentional.

This document is the canonical aesthetic reference. Any agent working on this
repo should treat it as normative — if a change would violate a rule in
_Do's and Don'ts_, don't ship it.

## Colors

The palette is a neutral ramp plus two reserved colors. Values here are the
**light** theme; the dark theme lives in `src/lib/theme.css` (kept in two synced
blocks — a forced `[data-theme="dark"]` block and a `prefers-color-scheme` block —
because `light-dark()` gets downleveled into a no-op by the build). Derived
shades (soft tints, rings) are `color-mix()` off these in `theme.css`.

- **Primary (`#171717`):** Near-black. The action color — solid buttons, the
  brand mark, primary CTAs. Hover lifts to `#333333`. Text on it is `#ffffff`.
- **Accent (`#0070f3`):** Geist blue. Reserved for links, focus rings, and
  selected/active states only. Rationed on purpose so it stays meaningful.
- **Text (`#171717`) / Text-muted (`#6b6b6b`):** Core and secondary text. True
  neutral — do not substitute a slate/blue-tinted gray.
- **Background (`#ffffff`) / Surface (`#fafafa`) / Surface-2 (`#f4f4f5`):** Page
  and subtle raised/inset surfaces. Barely-there steps, never heavy fills.
- **Border (`#eaeaea`) / Border-strong (`#d4d4d4`):** Hairlines. The primary tool
  for defining surfaces and affordance.
- **Semantic — Success `#00a86b`, Warning `#b8860b`, Danger `#e5484d`:** Used for
  icons, dots, borders and status. They are tuned for graphics, so **small text
  uses the darker `-text` variants** (`--puresv-accent-text`,
  `-success-text`, `-warning-text`, `-danger-text`): each is the raw hue mixed
  70% toward the body text color, which clears WCAG AA on its own soft tint in
  both themes. Badge labels and field error messages must use these.

## Typography

One family — the **system sans stack** (`ui-sans-serif, system-ui, -apple-system,
"Segoe UI", Roboto, …`). No web-font dependency (the library ships with zero
runtime deps). Personality comes from weight and tracking, not from the typeface.

- **Weights are a strict 3-step scale:** 400 (normal), 500 (medium), 600
  (semibold). Never 550, 650, or 700 as one-off magic numbers.
  `--puresv-weight-normal / -medium / -semibold`.
- **Tracking goes negative as size grows.** Display/headings use `-0.02em` to
  `-0.04em`; body stays near `0`; tiny labels get a slight negative nudge. Tight
  tracking on large text is a core part of the precise look.
- **Body sits at 0.875rem** (`--puresv-text-md`) — slightly denser than the usual
  1rem, for an application feel rather than a marketing feel.

## Layout

Density is _tight and even_. Spacing follows a 4px-based scale
(`--puresv-space-1…6` = 4 / 8 / 12 / 16 / 24 / 32px). Prefer consistent rhythm
over generous whitespace — this is an application UI, not a landing page. Every
form control is `--puresv-control-height` (`2.5rem`), which is exactly Button's
`md` height, so a field and a button placed side by side line up flush. Buttons
are `2 / 2.5 / 3rem` by size.

## Elevation & Depth

Depth is **border-driven**, not shadow-driven. This is the opposite of the typical
card-with-a-soft-shadow and is central to the identity.

- **Cards and surfaces:** a `1px` border plus an inset top hairline
  (`box-shadow: inset 0 1px 0`). No drop shadow. In light mode the hairline is a
  no-op; in dark mode it's `rgba(255,255,255,0.04)` and gives a crisp lit edge.
- **Overlays (modal, dropdown):** may use a **layered** shadow — a `1px` ring
  (`0 0 0 1px border`) plus a soft spread — so they clearly float. This is the
  _only_ place shadows appear.
- **Never** put a blurred drop shadow on an in-flow card.

## Shapes

Radii are **small and precise** — loose corners read as "generic dashboard":

- `sm` 4px (checkbox, small chips), `md` 6px (buttons, inputs), `lg` 8px (cards,
  modals), `full` 999px (badges, pills, avatars).

## Components

Component-level rules, expressed as token references above and implemented in
`src/lib/components/`. Key behaviors a future agent must preserve:

- **Button** — 5 variants. `solid` uses `primary`/`on-primary` (near-black), with
  a quiet `primary-hover` and a `scale(0.97)` press. `soft` is accent-tinted.
  `outline` and `ghost` are neutral. `link` is accent text only. **No lift on
  hover, no colored glow.** Pass `href` to render an `<a>` with the same styling
  (navigation must stay a real link, and it keeps the focus ring).
- **Card** — border + inset hairline, canvas background, no drop shadow.
- **Badge** — soft tint background + a hairline border that tracks the text color
  (`color-mix(currentColor …)`), not a loud solid fill.
- **Alert** — tinted surface + a leading tone-colored inline-SVG icon + a matching
  border. **No left accent stripe.**
- **Switch** — off-state track is a _readable_ `border-strong` gray, not an
  invisible hairline.
- **Slider** — native range; the filled portion is the accent and the empty
  track is `--puresv-fill-muted`. The knob is the same white object as the
  switch's, and the focus ring sits on the knob, not the full 24px hit area.
- **Breadcrumb** — muted trail with chevron separators; only the current item
  uses full-strength text, and it carries `aria-current="page"`.
- **Pagination** — square `--puresv-control-height` controls; the current page
  is the only ink-filled one, mirroring a solid Button. Long ranges collapse to
  first / last / current ±1 with non-interactive ellipses.
- **Input / Select / Textarea** — crisp **double-ring** focus from the shared
  `--puresv-focus-shadow` (`0 0 0 2px canvas, 0 0 0 4px accent-ring`), not a soft
  glow; the error state swaps to `--puresv-focus-shadow-danger`. Error text is
  linked with `aria-describedby`.
- **Focus everywhere** — a crisp ring, never `outline: none` without a
  replacement. Motion uses a strong ease-out
  (`cubic-bezier(0.23, 1, 0.32, 1)`) at `140ms`, and respects
  `prefers-reduced-motion`.

## Do's and Don'ts

**Do**

- Use **near-black `primary`** for the main action; reach for `accent` blue only
  for links, focus, and selected states.
- Keep grays **truly neutral** (no blue cast).
- Define surfaces with **borders + the inset hairline**; reserve layered shadows
  for overlays.
- Keep radii **tight** (4/6/8px) and weights on the **400/500/600** scale.
- Keep motion **fast (< 200ms) and ease-out**, and honor reduced-motion.

**Don't**

- **Don't** introduce an indigo/purple accent or Tailwind slate grays
  (`#0f172a`, `#f7f8fa`, `#e3e8ef`, `#4f46e5`). That palette is the exact
  "generated" look this system exists to avoid.
- **Don't** make the default button a saturated hue, or add a lift/glow hover.
- **Don't** add a blurred drop shadow to in-flow cards.
- **Don't** use loud solid-fill badges or a left-stripe alert.
- **Don't** use stray font-weights (550/650/700) or loose radii (12px+).
- **Don't** use the raw semantic colors (success/warning/danger) as small text on
  their soft tints — they fail AA there (they are tuned for icons, dots, and
  borders). Use the `-text` variants instead.
