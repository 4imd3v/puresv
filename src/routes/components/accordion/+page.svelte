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

  const richCode = `<Accordion items={[{ id: "ship", title: "Shipping", content: body }]} />

{#snippet body()}
  <p>Orders ship <strong>within two business days</strong>.</p>
{/snippet}`;

  const props = [
    {
      name: "items",
      type: "{ id: string; title: string; content: string | Snippet }[]",
      default: "—",
      description: "The sections to render. The content can be plain text or a snippet.",
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

    <Demo label="Snippet content" code={richCode}>
      {#snippet preview()}
        <Accordion items={[{ id: "ship", title: "Shipping", content: body }]} />
        {#snippet body()}
          <p>Orders ship <strong>within two business days</strong>.</p>
        {/snippet}
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Each item is a <code>&lt;details&gt;</code>; the chevron rotates when open.
    Set <code>content</code> to a snippet to render links or markup inside a
    section.
  {/snippet}
</DocPage>
