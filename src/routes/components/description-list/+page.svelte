<script lang="ts">
  import { Card, DescriptionList } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const items = [
    { term: "Plan", description: "Pro, billed yearly" },
    { term: "Owner", description: "Ada Lovelace" },
    { term: "Region", description: "eu-central-1" },
    { term: "Created", description: "12 March 2025" },
  ];

  const code = `<DescriptionList {items} />`;

  const props = [
    {
      name: "items",
      type: "{ term: string; description: string }[]",
      default: "—",
      description: "Term and value rows, rendered as dt/dd pairs.",
    },
  ];
</script>

<DocPage title="DescriptionList" rows={props}>
  {#snippet lede()}
    Term/value rows for metadata: a muted term column and a value column,
    separated by hairlines. It collapses to one column on narrow screens.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <div class="details-demo">
          <Card>
            <DescriptionList {items} />
          </Card>
        </div>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    The root is a <code>&lt;dl&gt;</code>, so every row exposes its term and
    description to assistive tech. Native attributes are spread onto it.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .details-demo {
      width: 100%;
    }
  }
</style>
