<script lang="ts">
  import { Slider } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  let volume = $state(50);
  let budget = $state(300);

  const code = `<Slider label="Volume" min={0} max={100} bind:value={volume} />`;

  const rangeCode = `<Slider label="Budget" min={100} max={1000} step={50} bind:value={budget} />\n<Slider label="Disabled" value={40} disabled />`;

  const props = [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Label above the track.",
    },
    {
      name: "value",
      type: "number",
      default: "0",
      description: "Current value. Bind it with bind:value.",
    },
  ];
</script>

<DocPage title="Slider" rows={props}>
  {#snippet lede()}
    A native range input. Keyboard, touch and form behaviour come free; the
    filled track is painted from the value.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <div class="slider-demo">
          <Slider label="Volume" min={0} max={100} bind:value={volume} />
          <p class="readout">Volume: {volume}</p>
        </div>
      {/snippet}
    </Demo>

    <Demo label="Steps and disabled" code={rangeCode}>
      {#snippet preview()}
        <div class="slider-demo">
          <Slider label="Budget" min={100} max={1000} step={50} bind:value={budget} />
          <p class="readout">Budget: ${budget}</p>
          <Slider label="Disabled" value={40} disabled />
        </div>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    <code>min</code>, <code>max</code>, <code>step</code>, <code>name</code> and
    every other native range attribute are forwarded. Use
    <code>bind:value</code> to read the number back.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .slider-demo {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-3);
      width: min(100%, 22rem);
    }

    .readout {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }
  }
</style>
