<script lang="ts">
  import { AvatarGroup } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const team = [
    { name: "Ada Lovelace" },
    { name: "Grace Hopper" },
    { name: "Alan Turing" },
    { name: "Edsger Dijkstra" },
    { name: "Barbara Liskov" },
  ];

  const code = `<AvatarGroup items={team} max={4} />`;
  const sizeCode = `<AvatarGroup items={team} size="sm" />\n<AvatarGroup items={team} size="lg" />`;

  const props = [
    {
      name: "items",
      type: "{ src?: string; name?: string }[]",
      default: "—",
      description: "People, passed through to Avatar (image, initials or icon).",
    },
    {
      name: "max",
      type: "number",
      default: "4",
      description: "How many avatars to show before the +N chip.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Avatar size, applied to the overflow chip too.",
    },
  ];
</script>

<DocPage title="AvatarGroup" rows={props}>
  {#snippet lede()}
    A compact stack of avatars with a +N overflow chip. Each avatar carries a
    canvas ring, so the overlap stays legible in both themes.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <AvatarGroup items={team} max={4} />
      {/snippet}
    </Demo>

    <Demo label="Sizes" code={sizeCode}>
      {#snippet preview()}
        <AvatarGroup items={team} size="sm" />
        <AvatarGroup items={team} size="md" />
        <AvatarGroup items={team} size="lg" />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    The overflow chip only appears when items exceed <code>max</code>. Native
    attributes are spread onto the group, so <code>class</code> and
    <code>aria-label</code> work as expected.
  {/snippet}
</DocPage>
