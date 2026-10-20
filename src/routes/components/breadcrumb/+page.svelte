<script lang="ts">
  import { Breadcrumb } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const items = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ];

  const code = `<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]}
/>`;

  const props = [
    {
      name: "items",
      type: "{ label: string; href?: string }[]",
      default: "—",
      description: "The trail, in order. The last item is the current page.",
    },
  ];
</script>

<DocPage title="Breadcrumb" rows={props}>
  {#snippet lede()}
    A trail of links back up the hierarchy, ending in the current page. Every
    item but the last is a real link; the last one carries
    <code>aria-current="page"</code>.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <Breadcrumb {items} />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    The root is a <code>&lt;nav&gt;</code> with an
    <code>aria-label</code> of "Breadcrumb"; pass your own to localize it. A
    middle item without <code>href</code> renders as plain text.
  {/snippet}
</DocPage>
