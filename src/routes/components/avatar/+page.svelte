<script lang="ts">
  import { Avatar } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const sizes = ["sm", "md", "lg"] as const;
  const initialsCode = '<Avatar name="Ada Lovelace" />';
  const imgCode = '<Avatar name="Ada Lovelace" src="https://i.pravatar.cc/150?img=5" />';

  const props = [
    {
      name: "src",
      type: "string",
      default: "—",
      description: "Image URL. Falls back to initials (or an icon) if it fails to load.",
    },
    {
      name: "name",
      type: "string",
      default: "—",
      description: "The person's name — used for initials and the accessible label.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Diameter: 2rem, 2.5rem, 3.5rem.",
    },
  ];
</script>

<DocPage title="Avatar" rows={props}>
  {#snippet lede()}
    A round avatar from an image, initials, or a fallback icon. Initials use
    grapheme segmentation, and a broken image falls back to initials.
  {/snippet}

  {#snippet demos()}
    <Demo label="Initials" code={initialsCode}>
      {#snippet preview()}
        {#each sizes as size (size)}
          <Avatar name="Ada Lovelace" {size} />
        {/each}
      {/snippet}
    </Demo>

    <Demo label="Image" code={imgCode}>
      {#snippet preview()}
        <Avatar name="Ada Lovelace" src="https://i.pravatar.cc/150?img=5" />
      {/snippet}
    </Demo>

    <Demo label="Fallback icon" code={"<Avatar />"}>
      {#snippet preview()}
        <Avatar />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Initials come from the first grapheme of the first and last words, so emoji
    and accented names survive. Any other attribute is spread onto the root.
  {/snippet}
</DocPage>
