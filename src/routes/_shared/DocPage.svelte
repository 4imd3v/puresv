<script lang="ts">
  import type { Snippet } from "svelte";
  import PropsTable from "./PropsTable.svelte";
  import type { Row } from "./types";

  interface Props {
    title: string;
    lede: Snippet;
    demos: Snippet;
    rows: Row[];
    note: Snippet;
  }

  let { title, lede, demos, rows, note }: Props = $props();
</script>

<svelte:head>
  <title>{title} — PureSV</title>
</svelte:head>

<nav class="crumbs" aria-label="Breadcrumb">
  <a href="/">Home</a>
  <span aria-hidden="true">/</span>
  <span aria-current="page">{title}</span>
</nav>

<header class="page-head">
  <h1>{title}</h1>
  <p class="lede">{@render lede()}</p>
</header>

<section class="section">
  <h2>Examples</h2>
  <div class="demos">{@render demos()}</div>
</section>

<section class="section">
  <h2>Props</h2>
  <PropsTable {rows} />
  <p class="note">{@render note()}</p>
</section>

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

    .page-head h1 {
      margin: 0 0 var(--puresv-space-3);
      font-size: clamp(2rem, 5vw, 2.75rem);
      font-weight: 700;
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

    .section {
      margin-block-start: var(--puresv-space-6);
    }

    .section h2 {
      margin: 0 0 var(--puresv-space-4);
      font-size: var(--puresv-text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--puresv-text-muted);
    }

    .demos {
      display: grid;
      gap: var(--puresv-space-4);
    }

    .note {
      margin-block-start: var(--puresv-space-4);
      font-size: var(--puresv-text-sm);
      line-height: 1.7;
      color: var(--puresv-text-muted);
    }

    .note :global(code),
    .lede :global(code) {
      padding-block: 0.1em;
      padding-inline: 0.35em;
      border-radius: var(--puresv-radius-sm);
      background-color: var(--puresv-surface);
      font-family: var(--puresv-font-mono);
      font-size: 0.9em;
      color: var(--puresv-text);
    }
  }
</style>
