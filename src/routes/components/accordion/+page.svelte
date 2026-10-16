<script lang="ts">
  import { Accordion } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const items = [
    { id: "ship", title: "Shipping", content: "Orders ship within two business days." },
    { id: "return", title: "Returns", content: "Return any item within 30 days for a full refund." },
    { id: "warranty", title: "Warranty", content: "Covered for one year against defects." },
  ];

  const code = "<Accordion {items} />";

  const props = [
    {
      name: "items",
      type: "{ id: string; title: string; content: string }[]",
      default: "—",
      description: "The sections to render.",
    },
  ];
</script>

<DocPage title="Accordion" rows={props}>
  {#snippet lede()}
    A disclosure list built on the native details element, so toggling and
    keyboard support come for free.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <Accordion {items} />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Each item is a <code>&lt;details&gt;</code>; the chevron rotates when open.
  {/snippet}
</DocPage>
