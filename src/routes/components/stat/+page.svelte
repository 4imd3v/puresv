<script lang="ts">
  import { Stat } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const code = `<Stat label="Revenue" value="$12,400" delta="+12%" tone="positive" />`;

  const props = [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "The micro-label above the value.",
    },
    {
      name: "value",
      type: "string",
      default: "—",
      description: "The headline number, preformatted.",
    },
    {
      name: "delta",
      type: "string",
      default: "—",
      description: "Optional change line.",
    },
    {
      name: "tone",
      type: '"positive" | "negative" | "neutral"',
      default: '"neutral"',
      description: "Colors the delta with the readable semantic text colors.",
    },
  ];
</script>

<DocPage title="Stat" rows={props}>
  {#snippet lede()}
    A single metric: micro-label, a tabular headline and an optional delta. The
    value stays a string so you control the formatting.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <div class="stats">
          <Stat label="Revenue" value="$12,400" delta="+12% vs last month" tone="positive" />
          <Stat label="Churn" value="2.4%" delta="+0.3 pts" tone="negative" />
          <Stat label="Active users" value="1,284" delta="steady" />
        </div>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Values use tabular numerals so a row of stats stays aligned. The delta is
    plain text — add arrows or signs in the value if you need them.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--puresv-space-5);
      width: 100%;
    }

    @media (width < 40rem) {
      .stats {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  }
</style>
