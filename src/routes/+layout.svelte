<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { Button } from "#lib";
  import { topLinks } from "./_shared/nav";

  let { children } = $props();

  const themes = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ] as const;
  type Theme = (typeof themes)[number]["value"];

  let theme = $state<Theme>("system");
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
    </a>

    <nav class="topnav" aria-label="Main">
      {#each topLinks as link (link.href)}
        <a href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
          {link.label}
        </a>
      {/each}
    </nav>

    <div class="themes">
      {#each themes as option (option.value)}
        <Button
          variant={theme === option.value ? "solid" : "outline"}
          size="sm"
          onclick={() => (theme = option.value)}
          aria-pressed={theme === option.value}
        >
          {option.label}
        </Button>
      {/each}
    </div>
  </div>
</header>

{@render children()}

<footer class="footer">
  <p>
    PureSV is MIT licensed. Built with Svelte 5, modern CSS, and no runtime
    dependencies.
  </p>
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
        background-color var(--puresv-duration) var(--puresv-ease),
        color var(--puresv-duration) var(--puresv-ease);
    }

    .topnav a:hover {
      background-color: var(--puresv-surface);
      color: var(--puresv-text);
    }

    .topnav a[aria-current="page"] {
      background-color: var(--puresv-surface);
      color: var(--puresv-text);
    }

    /* A segmented control rather than three loose buttons — the top bar is
       chrome, it should not compete with the content. */
    .themes {
      display: flex;
      gap: 2px;
      padding: 2px;
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-md);
      background-color: var(--puresv-surface);
    }

    .themes :global(.button) {
      border-radius: var(--puresv-radius-sm);
    }

    .themes :global(.button[data-variant="outline"]) {
      border-color: transparent;
      background-color: transparent;
    }

    .themes :global(.button[data-variant="outline"]:hover) {
      background-color: var(--puresv-surface-2);
    }

    .footer {
      border-top: 1px solid var(--puresv-border);
    }

    .footer p {
      max-width: 72rem;
      margin-inline: auto;
      padding: var(--puresv-space-5) var(--puresv-space-4);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }

    /* Two rows below 48rem: brand + theme on the first, nav on the second.
       A single row would need ~485px and force the nav to scroll. */
    @media (width < 48rem) {
      .brand-name {
        display: none;
      }

      .topbar-inner {
        flex-wrap: wrap;
        gap: var(--puresv-space-2);
      }

      .topnav {
        order: 3;
        flex-basis: 100%;
        margin-inline-start: 0;
        overflow-x: auto;
        scrollbar-width: none;
      }

      .themes {
        margin-inline-start: auto;
      }
    }
  }
</style>
