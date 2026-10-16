<script lang="ts">
  import { Spinner } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const sizes = ["sm", "md", "lg"] as const;
  const sizeCode = '<Spinner size="md" />';

  const props = [
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Diameter: 1rem, 1.5rem, 2rem.",
    },
    {
      name: "label",
      type: "string",
      default: '"Loading"',
      description: "Accessible name announced to screen readers via role=status.",
    },
  ];
</script>

<DocPage title="Spinner" rows={props}>
  {#snippet lede()}
    A loading indicator. Rotates on the compositor and slows down under reduced
    motion.
  {/snippet}

  {#snippet demos()}
    <Demo label="Sizes" code={sizeCode}>
      {#snippet preview()}
        {#each sizes as size (size)}
          <Spinner {size} />
        {/each}
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    The spinner exposes <code>role="status"</code> with the label as its
    accessible name, so assistive tech announces it when it appears.
  {/snippet}
</DocPage>
