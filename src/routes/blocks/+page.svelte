<script lang="ts">
  import type { Component } from "svelte";
  import { Breadcrumb } from "#lib";
  import { blocks, categories } from "./_registry";

  const previews = import.meta.glob<Component>("./_blocks/*.svelte", {
    eager: true,
    import: "default",
  });
</script>

<svelte:head>
  <title>Blocks — PureSV</title>
</svelte:head>

<main id="main">
  <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blocks" }]} />

  <header class="head">
    <h1>Blocks</h1>
    <p class="lede">
      Full-page compositions built from PureSV components. Copy the source and own
      it — blocks are compositions, not part of the package.
    </p>
  </header>

  {#each categories as category (category)}
    <section class="group">
      <h2>{category}</h2>
      <ul class="grid">
        {#each blocks.filter((block) => block.category === category) as block (block.slug)}
          {@const Preview = previews[`./_blocks/${block.slug}.svelte`]}
          <li>
            <div class="card">
              <div class="thumb" inert aria-hidden="true">
                {#if Preview}<Preview />{/if}
              </div>
              <div class="meta">
                <h3><a class="title" href={`/blocks/${block.slug}`}>{block.title}</a></h3>
                <p>{block.description}</p>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
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

    .group {
      margin-block-start: var(--puresv-space-6);
    }

    .group h2 {
      margin: 0 0 var(--puresv-space-4);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--puresv-space-4);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    /* Not a wrapping <a>: the live thumbnail renders real anchors of its own,
       and nested links are invalid HTML. The title link is stretched instead. */
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: clip;
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-lg);
      background-color: var(--puresv-canvas);
      box-shadow: inset 0 1px 0 var(--puresv-inset-hl);
      transition: border-color var(--puresv-duration) var(--puresv-ease-out);
    }

    @media (hover: hover) {
      .card:hover {
        border-color: var(--puresv-border-strong);
      }
    }

    .title {
      border-radius: var(--puresv-radius-sm);
      color: inherit;
      text-decoration: none;
    }

    /* The link covers the whole card, so the card is still one hit target. */
    .title::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: var(--puresv-radius-lg);
    }

    .title:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: 2px;
    }

    /* The live block is decoration and a thumbnail at once: clipped to a fixed
       height, and inert so its controls are not tab stops. */
    .thumb {
      position: relative;
      height: 17rem;
      overflow: clip;
      border-bottom: 1px solid var(--puresv-border);
      background-color: var(--puresv-canvas);
      pointer-events: none;
    }

    /* The block is cropped, not scaled; a fade makes the cut read as
       intentional instead of a half-rendered screenshot. */
    .thumb::after {
      content: "";
      position: absolute;
      inset: auto 0 0;
      height: 2.5rem;
      background-image: linear-gradient(to bottom, transparent, var(--puresv-canvas));
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-1) var(--puresv-space-4);
      align-items: baseline;
      justify-content: space-between;
      padding: var(--puresv-space-3) var(--puresv-space-4);
    }

    .meta h3 {
      margin: 0;
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .meta p {
      max-width: 36rem;
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
    }
  }
</style>
