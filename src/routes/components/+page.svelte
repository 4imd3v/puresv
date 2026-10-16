<script lang="ts">
  import { groups } from "../_shared/nav";
</script>

<svelte:head>
  <title>Components — PureSV</title>
</svelte:head>

<nav class="crumbs" aria-label="Breadcrumb">
  <a href="/">Home</a>
  <span aria-hidden="true">/</span>
  <span aria-current="page">Components</span>
</nav>

<header class="head">
  <h1>Components</h1>
  <p class="lede">Everything in the library, grouped by what it's for.</p>
</header>

{#each groups as group (group.title)}
  <section class="group">
    <h2>{group.title}</h2>
    <div class="chips">
      {#each group.links as link (link.href)}
        <a class="chip" href={link.href}>{link.label}</a>
      {/each}
    </div>
  </section>
{/each}

<style>
  @layer puresv {
    .crumbs {
      display: flex;
      gap: var(--puresv-space-2);
      margin-block-end: var(--puresv-space-4);
      font-size: var(--puresv-text-sm);
      color: var(--puresv-text-muted);
    }

    .crumbs a {
      border-radius: var(--puresv-radius-sm);
      color: var(--puresv-text-muted);
      text-decoration: none;
    }

    .crumbs a:hover {
      color: var(--puresv-text);
      text-decoration: underline;
    }

    .head h1 {
      margin: 0 0 var(--puresv-space-3);
      font-size: clamp(2rem, 5vw, 2.75rem);
      font-weight: var(--puresv-weight-semibold);
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    .lede {
      max-width: 40rem;
      margin: 0;
      font-size: var(--puresv-text-lg);
      line-height: 1.6;
      color: var(--puresv-text-muted);
    }

    .group {
      margin-block-start: var(--puresv-space-6);
    }

    .group h2 {
      margin: 0 0 var(--puresv-space-3);
      font-size: var(--puresv-text-xs);
      font-weight: var(--puresv-weight-semibold);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--puresv-text-muted);
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-2);
    }

    .chip {
      display: inline-flex;
      padding: var(--puresv-space-2) var(--puresv-space-4);
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-full);
      background-color: var(--puresv-surface);
      color: var(--puresv-text);
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-medium);
      text-decoration: none;
      transition:
        border-color var(--puresv-duration) var(--puresv-ease-out),
        background-color var(--puresv-duration) var(--puresv-ease-out),
        color var(--puresv-duration) var(--puresv-ease-out);
    }

    .chip:hover {
      border-color: var(--puresv-accent);
      background-color: var(--puresv-accent-soft);
      color: var(--puresv-accent);
    }
  }
</style>
