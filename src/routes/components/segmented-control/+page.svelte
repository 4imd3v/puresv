<script lang="ts">
  import { SegmentedControl } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const options = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];

  let range = $state("week");

  const code = `let range = $state("week");
const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

<SegmentedControl {options} bind:value={range} aria-label="Range" />`;

  const props = [
    {
      name: "options",
      type: "{ value: string; label: string; disabled?: boolean }[]",
      default: "—",
      description: "The segments, in order.",
    },
    {
      name: "value",
      type: "string",
      default: "first option's value",
      description: "The selected value. Bind it with bind:value.",
    },
  ];
</script>

<DocPage title="SegmentedControl" rows={props}>
  {#snippet lede()}
    A compact single-choice control for two to five options. It is a
    <code>radiogroup</code>: arrow keys move the selection and only the selected
    segment is in the tab order.
  {/snippet}

  {#snippet demos()}
    <Demo label="Range" code={code}>
      {#snippet preview()}
        <div class="segmented-demo">
          <SegmentedControl {options} bind:value={range} aria-label="Range" />
          <p class="readout">Range: {range}</p>
        </div>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    The selected segment uses the same ink fill as a solid Button, so
    "selected" looks the same everywhere in the library. Pass
    <code>aria-label</code> to name the group.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .segmented-demo {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-3);
    }

    .readout {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }
  }
</style>
