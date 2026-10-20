<script lang="ts">
  import { Button, Popover } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const code = `<Popover label="Filters">
  {#snippet trigger(attrs)}
    <Button {...attrs} variant="outline">Filters</Button>
  {/snippet}

  <p>Filter the table by status, owner or date.</p>
  <Button size="sm">Apply</Button>
</Popover>`;

  const topCode = `<Popover label="Help" side="top" align="end">
  {#snippet trigger(attrs)}
    <Button {...attrs} variant="ghost">Help</Button>
  {/snippet}

  <p>Shown above the trigger, aligned to its end edge.</p>
</Popover>`;

  const props = [
    {
      name: "trigger",
      type: "Snippet<[TriggerProps]>",
      default: "—",
      description:
        "Renders the trigger. Spread the props; they wire the click, keys, aria-expanded and aria-controls.",
    },
    {
      name: "children",
      type: "Snippet",
      default: "—",
      description: "The panel content.",
    },
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Whether the panel is open. Bind it with bind:open.",
    },
    {
      name: "side",
      type: '"top" | "bottom"',
      default: '"bottom"',
      description: "Which side of the trigger the panel sits on.",
    },
    {
      name: "align",
      type: '"start" | "center" | "end"',
      default: '"start"',
      description: "How the panel lines up horizontally.",
    },
    {
      name: "label",
      type: "string",
      default: '"Popover"',
      description: "Accessible name for the dialog panel.",
    },
  ];
</script>

<DocPage title="Popover" rows={props}>
  {#snippet lede()}
    A floating panel for filters, settings or extra detail. It is positioned
    with fixed coordinates, so it escapes <code>overflow: hidden</code>
    ancestors, and it closes on Escape or an outside click.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <Popover label="Filters">
          {#snippet trigger(attrs)}
            <Button {...attrs} variant="outline">Filters</Button>
          {/snippet}
          <div class="popover-body">
            <p class="popover-title">Filters</p>
            <p class="popover-desc">Filter the table by status, owner or date.</p>
            <Button size="sm">Apply</Button>
          </div>
        </Popover>
      {/snippet}
    </Demo>

    <Demo label="Top, end aligned" code={topCode}>
      {#snippet preview()}
        <Popover label="Help" side="top" align="end">
          {#snippet trigger(attrs)}
            <Button {...attrs} variant="ghost">Help</Button>
          {/snippet}
          <p class="popover-desc">Shown above the trigger, aligned to its end edge.</p>
        </Popover>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    The panel is a non-modal <code>dialog</code> and takes focus when opened.
    Escape and outside presses close it and return focus to the trigger. Bind
    <code>open</code> to control it yourself.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .popover-body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--puresv-space-2);
    }

    .popover-title {
      margin: 0;
      color: var(--puresv-text);
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .popover-desc {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
    }
  }
</style>
