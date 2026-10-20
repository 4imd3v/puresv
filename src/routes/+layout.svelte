<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { Badge, SegmentedControl } from "#lib";
  import { topLinks } from "./_shared/nav";

  let { children } = $props();

  const themes = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  let theme = $state("system");
  // app.html already applied the saved theme; wait until the state catches up
  // so this effect does not strip it for a frame.
  let ready = $state(false);

  onMount(() => {
    const stored = localStorage.getItem("puresv-theme");
    if (stored === "light" || stored === "dark") theme = stored;
    ready = true;
  });

  $effect(() => {
    if (!ready) return;
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.dataset.theme = theme;
    localStorage.setItem("puresv-theme", theme);
  });

  const isActive = (href: string) =>
    href === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(href);
</script>

<a class="skip" href="#main">Skip to content</a>

<header class="topbar">
  <div class="topbar-inner">
    <a class="brand" href="/">
      <span class="brand-mark" aria-hidden="true">PS</span>
      <span class="brand-name">PureSV</span>
      <span class="version"><Badge tone="neutral">v0.0.1</Badge></span>
    </a>

    <nav class="topnav" aria-label="Main">
      {#each topLinks as link (link.href)}
        <a href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
          {link.label}
        </a>
      {/each}
    </nav>

    <div class="topbar-actions">
      <span class="divider" aria-hidden="true"></span>
      <div class="themes">
        <SegmentedControl options={themes} bind:value={theme} aria-label="Theme" />
      </div>
    </div>
  </div>
</header>

{@render children()}

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true">PS</span>
        <span class="brand-name">PureSV</span>
      </a>
      <p class="footer-tag">
        Svelte 5 components styled with modern CSS. No runtime dependencies, no
        utility-class framework.
      </p>
    </div>

    <nav class="footer-nav" aria-label="Footer">
      <a href="/components/button">Button</a>
      <a href="/components/input">Input</a>
      <a href="/components/table">Table</a>
      <a class="footer-all" href="/components">All components →</a>
    </nav>
  </div>

  <div class="footer-bottom">
    <div class="footer-meta">
      <p>MIT licensed</p>
      <p>Built with Svelte 5 and modern CSS</p>
    </div>
  </div>
</footer>

<style>
  @layer puresv {
    :global(body) {
      margin: 0;
      background-color: var(--puresv-canvas);
      color: var(--puresv-text);
      font-family: var(--puresv-font);
    }

    .skip {
      position: absolute;
      left: -9999px;
      z-index: 100;
      padding: var(--puresv-space-2) var(--puresv-space-4);
      border-radius: var(--puresv-radius-md);
      background-color: var(--puresv-primary);
      color: var(--puresv-on-primary);
    }

    .skip:focus {
      left: var(--puresv-space-4);
      top: var(--puresv-space-4);
    }

    /* Top bar */
    .topbar {
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid var(--puresv-border);
      background-color: color-mix(in oklab, var(--puresv-canvas) 82%, transparent);
      backdrop-filter: blur(12px);
    }

    .topbar-inner {
      display: flex;
      gap: var(--puresv-space-4);
      align-items: center;
      max-width: 72rem;
      margin-inline: auto;
      padding: var(--puresv-space-3) var(--puresv-space-4);
    }

    .brand {
      display: inline-flex;
      gap: var(--puresv-space-2);
      align-items: center;
      border-radius: var(--puresv-radius-md);
      color: var(--puresv-text);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.02em;
      text-decoration: none;
    }

    .brand:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: 2px;
    }

    .brand-mark {
      display: grid;
      place-items: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: var(--puresv-radius-sm);
      background-color: var(--puresv-primary);
      color: var(--puresv-on-primary);
      font-size: var(--puresv-text-xs);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .version {
      display: inline-flex;
      margin-inline-start: var(--puresv-space-1);
    }

    .topnav {
      display: flex;
      gap: var(--puresv-space-1);
      margin-inline-start: auto;
    }

    .topnav a {
      padding: var(--puresv-space-2) var(--puresv-space-3);
      border-radius: var(--puresv-radius-md);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-medium);
      text-decoration: none;
      transition:
        background-color var(--puresv-duration) var(--puresv-ease-out),
        color var(--puresv-duration) var(--puresv-ease-out);
    }

    .topnav a:hover {
      background-color: var(--puresv-surface);
      color: var(--puresv-text);
    }

    /* The current page reads stronger than a hovered one. */
    .topnav a[aria-current="page"] {
      background-color: var(--puresv-surface-2);
      color: var(--puresv-text);
    }

    .topnav a:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: 2px;
    }

    .topbar-actions {
      display: flex;
      gap: var(--puresv-space-3);
      align-items: center;
    }

    .divider {
      width: 1px;
      height: 1.25rem;
      background-color: var(--puresv-border);
    }

    .themes {
      display: flex;
    }

    /* Footer */
    .footer {
      border-top: 1px solid var(--puresv-border);
      background-color: var(--puresv-surface);
    }

    .footer-inner {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: var(--puresv-space-6);
      align-items: start;
      max-width: 72rem;
      margin-inline: auto;
      padding: var(--puresv-space-6) var(--puresv-space-4) var(--puresv-space-5);
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-3);
      min-width: 0;
    }

    .footer-tag {
      max-width: 24rem;
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
    }

    .footer-nav {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-2) var(--puresv-space-4);
      align-items: center;
      justify-content: flex-end;
    }

    .footer-nav a {
      padding-block: 0.125rem;
      border-radius: var(--puresv-radius-sm);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-medium);
      text-decoration: none;
      transition: color var(--puresv-duration) var(--puresv-ease-out);
    }

    .footer-nav a:hover {
      color: var(--puresv-text);
    }

    .footer-nav a:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: 2px;
    }

    .footer-nav .footer-all {
      color: var(--puresv-accent-text);
    }

    .footer-bottom {
      border-top: 1px solid var(--puresv-border);
    }

    .footer-meta {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: var(--puresv-space-2) var(--puresv-space-4);
      max-width: 72rem;
      margin-inline: auto;
      padding: var(--puresv-space-4);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-xs);
    }

    .footer-meta p {
      margin: 0;
    }

    /* Two rows below 48rem: brand + actions on the first, nav on the second.
       A single row would need ~650px and force the nav to scroll. */
    @media (width < 48rem) {
      .topbar-inner {
        flex-wrap: wrap;
        gap: var(--puresv-space-2);
      }

      .version,
      .divider {
        display: none;
      }

      .topbar-actions {
        margin-inline-start: auto;
      }

      .topnav {
        order: 3;
        flex-basis: 100%;
        margin-inline-start: 0;
        overflow-x: auto;
        scrollbar-width: none;
      }

      .footer-inner {
        grid-template-columns: minmax(0, 1fr);
        gap: var(--puresv-space-5);
        padding-block: var(--puresv-space-5);
      }

      .footer-nav {
        justify-content: flex-start;
      }

      .footer-meta {
        flex-direction: column;
        gap: var(--puresv-space-1);
      }
    }

    /* The wordmark finally has to give way on very narrow screens. */
    @media (width < 22rem) {
      .brand-name {
        display: none;
      }
    }
  }
</style>
