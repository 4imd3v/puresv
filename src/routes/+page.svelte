<script lang="ts">
  import { Badge, Button, Card } from "#lib";

  const themes = ["system", "light", "dark"] as const;
  let theme = $state<(typeof themes)[number]>("system");

  $effect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.dataset.theme = theme;
  });
</script>

<svelte:head>
  <title>PureSV — component showcase</title>
</svelte:head>

<main>
  <header>
    <h1>PureSV</h1>
    <p>Reusable Svelte 5 components, styled with modern CSS.</p>
    <div class="themes">
      {#each themes as value (value)}
        <Button
          variant={theme === value ? "solid" : "outline"}
          size="sm"
          onclick={() => (theme = value)}
        >
          {value}
        </Button>
      {/each}
    </div>
  </header>

  <section>
    <h2>Button</h2>
    <div class="row">
      <Button onclick={() => alert("clicked")}>Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
    </div>
    <div class="row">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  </section>

  <section>
    <h2>Badge</h2>
    <div class="row">
      <Badge>neutral</Badge>
      <Badge tone="accent">accent</Badge>
      <Badge tone="success">success</Badge>
      <Badge tone="warning">warning</Badge>
      <Badge tone="danger">danger</Badge>
    </div>
  </section>

  <section>
    <h2>Card</h2>
    <Card>
      {#snippet header()}
        Monthly report
      {/snippet}
      <p>
        Slots keep composition flexible: <code>header</code>, default body and
        <code>footer</code> are all optional.
      </p>
      {#snippet footer()}
        Updated 2 minutes ago
      {/snippet}
    </Card>
  </section>
</main>

<style>
  :global(body) {
    background-color: var(--puresv-canvas);
  }

  main {
    max-width: 48rem;
    margin-inline: auto;
    padding: var(--puresv-space-6) var(--puresv-space-4);
    font-family: var(--puresv-font);
    color: var(--puresv-text);
  }

  h1 {
    margin: 0;
    font-size: 2rem;
  }

  h2 {
    margin-block: var(--puresv-space-6) var(--puresv-space-3);
    font-size: var(--puresv-text-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--puresv-text-muted);
  }

  header p {
    margin-block: var(--puresv-space-2) var(--puresv-space-4);
    color: var(--puresv-text-muted);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--puresv-space-3);
    align-items: center;
  }

  .themes {
    display: flex;
    gap: var(--puresv-space-2);
  }

  code {
    padding-block: 0.1em;
    padding-inline: 0.35em;
    border-radius: var(--puresv-radius-sm);
    background-color: var(--puresv-surface);
    font-family: var(--puresv-font-mono);
    font-size: 0.9em;
  }
</style>
