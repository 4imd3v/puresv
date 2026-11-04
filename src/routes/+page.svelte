<script lang="ts">
  import { Alert, AvatarGroup, Badge, Button, Rating, SegmentedControl } from "#lib";

  let copied = $state(false);

  const install = "pnpm add puresv";

  async function copy() {
    await navigator.clipboard.writeText(install);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }

  const features = [
    {
      title: "Zero runtime dependencies",
      body: "Everything is Svelte and CSS. Nothing to audit, nothing to keep up to date.",
    },
    {
      title: "Design tokens",
      body: "Every color, radius and spacing value is a --puresv-* custom property you can override.",
    },
    {
      title: "Modern CSS",
      body: "Scoped styles inside @layer puresv, so your unlayered CSS always wins.",
    },
    {
      title: "Svelte 5 runes",
      body: "Snippets instead of slots, typed props, and native attributes forwarded through.",
    },
  ];


  const segments = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];

  const team = [
    "Ada Lovelace",
    "Grace Hopper",
    "Alan Turing",
    "Edsger Dijkstra",
    "Barbara Liskov",
  ].map((name) => ({ name }));
</script>

<svelte:head>
  <title>PureSV — Svelte 5 components styled with modern CSS</title>
</svelte:head>

<main id="main">
<section class="hero">
  <Badge tone="accent">Svelte 5</Badge>
  <h1>Pure<span class="accent">SV</span></h1>
  <p class="lede">
    Reusable Svelte 5 components styled with modern CSS. No runtime
    dependencies, no utility-class framework — just Svelte and CSS.
  </p>

  <div class="cta">
    <Button href="/components/button" size="lg">Get started</Button>
    <Button href="/components/card" size="lg" variant="outline">Browse components</Button>
  </div>

  <div class="install">
    <code>{install}</code>
    <Button variant="ghost" size="sm" style="min-width: 4.75rem" onclick={copy}>
      {copied ? "Copied" : "Copy"}
    </Button>
  </div>
</section>

<section class="section">
  <h2>Why PureSV</h2>
  <ul class="features">
    {#each features as feature (feature.title)}
      <li>
        <h3>{feature.title}</h3>
        <p>{feature.body}</p>
      </li>
    {/each}
  </ul>
</section>

<section class="section">
  <div class="section-head">
    <h2>Components</h2>
    <a class="all" href="/components">Browse all components →</a>
  </div>

  <ul class="showcase">
    <li>
      <a class="showcase-card" href="/components/button">
        <div class="preview" inert aria-hidden="true">
          <Button size="sm">Save</Button>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="ghost" size="sm">Later</Button>
        </div>
        <div class="meta">
          <h3>Button</h3>
          <p>Five variants on the same ink action color.</p>
        </div>
      </a>
    </li>

    <li>
      <a class="showcase-card" href="/components/badge">
        <div class="preview" inert aria-hidden="true">
          <Badge tone="neutral" dot>draft</Badge>
          <Badge tone="success" dot>active</Badge>
          <Badge tone="accent">beta</Badge>
        </div>
        <div class="meta">
          <h3>Badge</h3>
          <p>Tone-tinted labels for status and metadata.</p>
        </div>
      </a>
    </li>

    <li>
      <a class="showcase-card" href="/components/alert">
        <div class="preview" inert aria-hidden="true">
          <Alert tone="success" title="Changes saved">
            Your changes are live.
          </Alert>
        </div>
        <div class="meta">
          <h3>Alert</h3>
          <p>Inline feedback with a tone icon, no stripe.</p>
        </div>
      </a>
    </li>

    <li>
      <a class="showcase-card" href="/components/segmented-control">
        <div class="preview" inert aria-hidden="true">
          <SegmentedControl options={segments} value="week" aria-label="Range" />
        </div>
        <div class="meta">
          <h3>SegmentedControl</h3>
          <p>One choice, ink-filled, keyboard ready.</p>
        </div>
      </a>
    </li>

    <li>
      <a class="showcase-card" href="/components/rating">
        <div class="preview" inert aria-hidden="true">
          <Rating label="Rating" value={4} readonly />
        </div>
        <div class="meta">
          <h3>Rating</h3>
          <p>Stars on native radios, hover to preview.</p>
        </div>
      </a>
    </li>

    <li>
      <a class="showcase-card" href="/components/avatar-group">
        <div class="preview" inert aria-hidden="true">
          <AvatarGroup items={team} max={4} />
        </div>
        <div class="meta">
          <h3>AvatarGroup</h3>
          <p>A team stack with a +N overflow chip.</p>
        </div>
      </a>
    </li>
  </ul>
</section>
</main>

<style>
  @layer puresv {
    main {
      display: block;
      max-width: 56rem;
      margin-inline: auto;
      padding: var(--puresv-space-6) var(--puresv-space-4);
    }

    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--puresv-space-4);
      padding-block: var(--puresv-space-6) var(--puresv-space-6);
      text-align: center;
    }

    .hero h1 {
      margin: 0;
      font-size: clamp(2.75rem, 9vw, 4.5rem);
      font-weight: var(--puresv-weight-semibold);
      line-height: 1;
      letter-spacing: -0.04em;
    }

    .accent {
      color: var(--puresv-accent);
    }

    .lede {
      max-width: 34rem;
      margin: 0;
      font-size: var(--puresv-text-lg);
      line-height: 1.6;
      color: var(--puresv-text-muted);
    }

    .cta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-3);
      justify-content: center;
      margin-block-start: var(--puresv-space-2);
    }

    .install {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
      margin-block-start: var(--puresv-space-3);
      padding: var(--puresv-space-2) var(--puresv-space-2) var(--puresv-space-2)
        var(--puresv-space-4);
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-md);
      background-color: var(--puresv-surface);
    }

    .install code {
      font-family: var(--puresv-font-mono);
      font-size: var(--puresv-text-sm);
      color: var(--puresv-text);
    }

    .section {
      margin-block-start: var(--puresv-space-6);
    }

    .section h2 {
      margin: 0 0 var(--puresv-space-4);
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
      color: var(--puresv-text-muted);
    }

    .features {
      display: grid;
      gap: var(--puresv-space-4);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    /* Explicit column counts, not auto-fit: auto-fit picks whatever fits,
		   which leaves a lone card on a second row for a fixed item count. */
    .features {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (width < 40rem) {
      .features {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .features li {
      padding: var(--puresv-space-4);
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-lg);
      background-color: var(--puresv-canvas);
      box-shadow: inset 0 1px 0 var(--puresv-inset-hl);
    }

    .features h3 {
      margin: 0 0 var(--puresv-space-2);
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .features p {
      margin: 0;
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
      color: var(--puresv-text-muted);
    }

    .section-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--puresv-space-4);
      margin-block-end: var(--puresv-space-4);
    }

    .section-head h2 {
      margin: 0;
    }

    .all {
      border-radius: var(--puresv-radius-sm);
      color: var(--puresv-accent-text);
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-medium);
      text-decoration: none;
      white-space: nowrap;
    }

    @media (hover: hover) {
      .all:hover {
        text-decoration: underline;
      }
    }

    .all:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: 2px;
    }

    .showcase {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--puresv-space-4);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    /* Explicit counts: 6 cards stay symmetric at every width. */
    @media (width < 48rem) {
      .showcase {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (width < 34rem) {
      .showcase {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .showcase-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-lg);
      background-color: var(--puresv-canvas);
      color: inherit;
      text-decoration: none;
      box-shadow: inset 0 1px 0 var(--puresv-inset-hl);
      transition: border-color var(--puresv-duration) var(--puresv-ease-out);
    }

    @media (hover: hover) {
      .showcase-card:hover {
        border-color: var(--puresv-border-strong);
      }
    }

    .showcase-card:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: 2px;
    }

    /* The live previews are decoration; the card link is the only target. */
    .preview {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: var(--puresv-space-2);
      min-height: 7.5rem;
      padding: var(--puresv-space-4);
      border-bottom: 1px solid var(--puresv-border);
      background-color: var(--puresv-surface);
    }

    .meta {
      padding: var(--puresv-space-4);
    }

    .meta h3 {
      margin: 0 0 var(--puresv-space-1);
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .meta p {
      margin: 0;
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
      color: var(--puresv-text-muted);
    }

  }
</style>
