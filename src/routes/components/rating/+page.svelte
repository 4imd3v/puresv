<script lang="ts">
  import { Rating } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  let score = $state(3);

  const code = `<Rating label="Quality" bind:value={score} />`;
  const readonlyCode = `<Rating label="Average score" value={4} readonly />`;

  const props = [
    {
      name: "value",
      type: "number",
      default: "0",
      description: "Selected score. Bind it with bind:value.",
    },
    {
      name: "max",
      type: "number",
      default: "5",
      description: "Number of stars.",
    },
    {
      name: "label",
      type: "string",
      default: '"Rating"',
      description: "Accessible name for the radiogroup.",
    },
    {
      name: "readonly",
      type: "boolean",
      default: "false",
      description: "Shows the score without allowing changes.",
    },
  ];
</script>

<DocPage title="Rating" rows={props}>
  {#snippet lede()}
    A star rating built on native radios, so arrow keys, focus and form values
    work as expected. Hovering previews the score without committing it.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <div class="rating-demo">
          <Rating label="Quality" bind:value={score} />
          <p class="readout">Score: {score}</p>
        </div>
      {/snippet}
    </Demo>

    <Demo label="Read only" code={readonlyCode}>
      {#snippet preview()}
        <Rating label="Average score" value={4} readonly />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Filled stars use the ink action color, not a semantic hue, so the control
    stays inside the system. Each radio is labelled "1 star", "2 stars" and so
    on for screen readers.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .rating-demo {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-2);
    }

    .readout {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }
  }
</style>
