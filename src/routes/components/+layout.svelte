<script lang="ts">
  import { page } from "$app/state";
  import { groups } from "../_shared/nav";

  let { children } = $props();

  const isActive = (href: string) =>
    href === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(href);
</script>

<div class="body">
  <aside class="sidebar">
    {#each groups as group (group.title)}
      <section class="nav-group">
        <h2>{group.title}</h2>
        <ul>
          {#each group.links as link (link.href)}
            <li>
              <a href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </aside>

  <main id="main">
    {@render children()}
  </main>
</div>

<style>
  @layer puresv {
    .body {
      display: grid;
      grid-template-columns: 13rem minmax(0, 1fr);
      gap: var(--puresv-space-6);
      max-width: 72rem;
      margin-inline: auto;
      padding: var(--puresv-space-6) var(--puresv-space-4);
    }

    /* With 21 links the sidebar is taller than a laptop viewport; cap it and
       let it scroll on its own instead of clipping the last groups. */
    .sidebar {
      position: sticky;
      top: 4.5rem;
      align-self: start;
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-5);
      max-height: calc(100dvh - 6rem);
      padding-block-end: var(--puresv-space-4);
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--puresv-border-strong) transparent;
      overscroll-behavior: contain;
    }

    /* A 4px thumb instead of the browser's default gutter. */
    .sidebar::-webkit-scrollbar {
      width: 4px;
    }

    .sidebar::-webkit-scrollbar-thumb {
      border-radius: var(--puresv-radius-full);
      background-color: var(--puresv-border-strong);
    }

    .sidebar::-webkit-scrollbar-track {
      background: transparent;
    }

    .nav-group h2 {
      margin: 0 0 var(--puresv-space-2);
      padding-inline-start: var(--puresv-space-3);
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.005em;
      color: var(--puresv-text-muted);
    }

    .nav-group ul {
      display: flex;
      flex-direction: column;
      gap: 1px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .nav-group a {
      display: block;
      padding: var(--puresv-space-2) var(--puresv-space-3);
      border-radius: var(--puresv-radius-md);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      text-decoration: none;
      transition:
        background-color var(--puresv-duration) var(--puresv-ease),
        color var(--puresv-duration) var(--puresv-ease);
    }

    .nav-group a:hover {
      background-color: var(--puresv-surface);
      color: var(--puresv-text);
    }

    .nav-group a[aria-current="page"] {
      background-color: var(--puresv-accent-soft);
      color: var(--puresv-accent-text);
      font-weight: var(--puresv-weight-medium);
    }

    main {
      min-width: 0;
    }

    @media (width < 60rem) {
      .body {
        grid-template-columns: minmax(0, 1fr);
      }

      /* The top nav already carries these four links on small screens. */
      .sidebar {
        display: none;
      }
    }
  }
</style>
