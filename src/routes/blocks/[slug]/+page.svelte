<script lang="ts">
  import type { Component } from "svelte";
  import { Breadcrumb, Button, SegmentedControl } from "#lib";
  import type { BlockMeta } from "../_registry";

  let { data }: { data: { block: BlockMeta } } = $props();

  const previews = import.meta.glob<Component>("../_blocks/*.svelte", {
    eager: true,
    import: "default",
  });
  // The real source, so the code panel can never drift from the preview.
  const sources = import.meta.glob<string>("../_blocks/*.svelte", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const key = $derived(`../_blocks/${data.block.slug}.svelte`);
  const Preview = $derived(previews[key]);
  const source = $derived(sources[key] ?? "");

  const views = [
    { value: "preview", label: "Preview" },
    { value: "code", label: "Code" },
  ];
  let view = $state("preview");
  let copied = $state(false);

  async function copy() {
    await navigator.clipboard.writeText(source);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }

  // Component names map straight to docs slugs: AvatarGroup → avatar-group.
  const toSlug = (name: string) =>
    name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
</script>

<svelte:head>
  <title>{data.block.title} block — PureSV</title>
</svelte:head>

<main id="main">
  <Breadcrumb
    items={[
      { label: "Home", href: "/" },
      { label: "Blocks", href: "/blocks" },
      { label: data.block.title },
    ]}
  />

  <header class="head">
    <h1>{data.block.title}</h1>
    <p class="lede">{data.block.description}</p>

    <div class="uses">
      <span class="uses-label">Built with</span>
      {#each data.block.components as name (name)}
        <a class="chip" href={`/components/${toSlug(name)}`}>{name}</a>
      {/each}
    </div>
  </header>

  <div class="frame">
    <div class="frame-bar">
      <SegmentedControl options={views} bind:value={view} aria-label="View" />
      <span class="frame-file">{data.block.slug}.svelte</span>
      <Button variant="ghost" size="sm" onclick={copy}>{copied ? "Copied" : "Copy"}</Button>
    </div>

    {#if view === "preview"}
      {#key data.block.slug}
        <div class="preview">
          {#if Preview}<Preview />{/if}
        </div>
      {/key}
    {:else}
      <pre class="code"><code>{source}</code></pre>
    {/if}
  </div>

  <p class="note">
    Copy the source into your project and own it. Blocks are compositions of the
    components above, not exports of the package.
  </p>
</main>

<style>
  @layer puresv {
    main {
      display: block;
      max-width: 72rem;
      margin-inline: auto;
      padding: var(--puresv-space-6) var(--puresv-space-4);
    }

    .head {
      margin-block-start: var(--puresv-space-4);
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
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-lg);
      line-height: 1.6;
    }

    .uses {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-2);
      align-items: center;
      margin-block-start: var(--puresv-space-4);
    }

    .uses-label {
      margin-inline-end: var(--puresv-space-1);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }

    .chip {
      padding: var(--puresv-space-1) var(--puresv-space-3);
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-full);
      background-color: var(--puresv-surface);
      color: var(--puresv-text);
      font-family: var(--puresv-font-mono);
      font-size: var(--puresv-text-xs);
      text-decoration: none;
      transition:
        border-color var(--puresv-duration) var(--puresv-ease-out),
        background-color var(--puresv-duration) var(--puresv-ease-out);
    }

    .chip:hover {
      border-color: var(--puresv-accent);
      background-color: var(--puresv-accent-soft);
    }

    .chip:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: 2px;
    }

    .frame {
      margin-block-start: var(--puresv-space-5);
      overflow: clip;
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-lg);
      background-color: var(--puresv-canvas);
    }

    .frame-bar {
      display: flex;
      gap: var(--puresv-space-3);
      align-items: center;
      padding: var(--puresv-space-2) var(--puresv-space-3);
      border-bottom: 1px solid var(--puresv-border);
      background-color: var(--puresv-surface);
    }

    .frame-file {
      margin-inline-start: auto;
      color: var(--puresv-text-muted);
      font-family: var(--puresv-font-mono);
      font-size: var(--puresv-text-xs);
    }

    /* Preview and code share one slot, so the switch fades the incoming panel
       in instead of teleporting. Only one panel exists at a time, so there is
       nothing to double-expose. */
    .preview,
    .code {
      transition: opacity var(--puresv-duration) var(--puresv-ease-out);
    }

    @starting-style {
      .preview,
      .code {
        opacity: 0;
      }
    }

    .preview {
      background-color: var(--puresv-canvas);
    }

    .code {
      max-height: 40rem;
      margin: 0;
      padding: var(--puresv-space-4);
      overflow: auto;
      background-color: var(--puresv-canvas);
      color: var(--puresv-text);
      font-family: var(--puresv-font-mono);
      font-size: var(--puresv-text-xs);
      line-height: 1.7;
      tab-size: 2;
    }

    .note {
      max-width: 40rem;
      margin-block-start: var(--puresv-space-4);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      line-height: 1.7;
    }
  }
</style>
