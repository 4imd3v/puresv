<script lang="ts">
  import { Separator } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const props = [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Direction of the divider.",
    },
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Optional centered text with a line on each side (horizontal).",
    },
  ];
</script>

<DocPage title="Separator" rows={props}>
  {#snippet lede()}
    A divider between content. Horizontal by default; add a label for an
    "OR"-style break, or set vertical for side-by-side groups.
  {/snippet}

  {#snippet demos()}
    <Demo label="Horizontal" code={"<Separator />"}>
      {#snippet preview()}
        <div class="col">
          <span>Above</span>
          <Separator />
          <span>Below</span>
        </div>
      {/snippet}
    </Demo>

    <Demo label="Labeled" code={'<Separator label="OR" />'}>
      {#snippet preview()}
        <Separator label="OR" />
      {/snippet}
    </Demo>

    <Demo label="Vertical" code={'<Separator orientation="vertical" />'}>
      {#snippet preview()}
        <div class="row">
          <span>Left</span>
          <Separator orientation="vertical" />
          <span>Right</span>
        </div>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    A vertical separator stretches to its container's height, so place it in a
    flex row with a set height.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .col {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-3);
      width: 100%;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }

    .row {
      display: flex;
      align-items: stretch;
      gap: var(--puresv-space-4);
      height: 2.5rem;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }
  }
</style>
