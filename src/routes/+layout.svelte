<script lang="ts">
  import { page } from "$app/state";
  import { Button } from "#lib";
  import { groups } from "./_shared/nav";

  let { children } = $props();

  const themes = ["system", "light", "dark"] as const;
  let theme = $state<(typeof themes)[number]>("system");

  $effect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.dataset.theme = theme;
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
      {#each groups as group (group.title)}
        {#each group.links as link (link.href)}
          <a href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
            {link.label}
          </a>
        {/each}
      {/each}
    </nav>

    <div class="themes">
      {#each themes as value (value)}
        <Button
          variant={theme === value ? "solid" : "outline"}
          size="sm"
          onclick={() => (theme = value)}
          aria-pressed={theme === value}
        >
          {value}
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
      background-color: var(--puresv-accent);
      color: var(--puresv-on-accent);
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
      font-weight: 650;
      letter-spacing: -0.02em;
      text-decoration: none;
    }

    .brand-mark {
      display: grid;
      place-items: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: var(--puresv-radius-sm);
      background-color: var(--puresv-accent);
      color: var(--puresv-on-accent);
      font-size: var(--puresv-text-xs);
      font-weight: 700;
      letter-spacing: 0;
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
      font-size: var(--puresv-text-sm);
      font-weight: 550;
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
      color: var(--puresv-text);
    }

    .themes {
      display: flex;
      gap: var(--puresv-space-2);
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
