<script lang="ts">
  import type { Snippet } from "svelte";
  import { Breadcrumb } from "#lib";
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

<Breadcrumb items={[{ label: "Home", href: "/" }, { label: title }]} />

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
    .page-head {
      margin-block-start: var(--puresv-space-4);
    }

    .page-head h1 {
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

    .section {
      margin-block-start: var(--puresv-space-6);
    }

    .section h2 {
      margin: 0 0 var(--puresv-space-4);
      font-size: var(--puresv-text-xs);
      font-weight: var(--puresv-weight-semibold);
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
