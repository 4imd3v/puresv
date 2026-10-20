<script lang="ts">
  import { Badge } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const tones = ["neutral", "accent", "success", "warning", "danger"] as const;

  const toneCode = tones.map((t) => `<Badge tone="${t}">${t}</Badge>`).join("\n");

  const dotCode = tones
    .map((t) => `<Badge tone="${t}" dot>${t}</Badge>`)
    .join("\n");

  const props = [
    {
      name: "tone",
      type: '"neutral" | "accent" | "success" | "warning" | "danger"',
      default: '"neutral"',
      description: "Color of the pill. success, warning and danger are for status.",
    },
    {
      name: "dot",
      type: "boolean",
      default: "false",
      description: "Shows a status dot in the current text color before the label.",
    },
  ];
</script>

<DocPage title="Badge" rows={props}>
  {#snippet lede()}
    A compact pill label for status and metadata. Five tones, sized to sit
    inline next to text or inside a button.
  {/snippet}

  {#snippet demos()}
    <Demo label="Tones" code={toneCode}>
      {#snippet preview()}
        {#each tones as tone (tone)}
          <Badge {tone}>{tone}</Badge>
        {/each}
      {/snippet}
    </Demo>

    <Demo label="With status dots" code={dotCode}>
      {#snippet preview()}
        {#each tones as tone (tone)}
          <Badge {tone} dot>{tone}</Badge>
        {/each}
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Any other attribute is spread onto the <code>&lt;span&gt;</code>, so a badge
    can carry <code>title</code> or an <code>aria-label</code> when the text
    alone is not descriptive enough.
  {/snippet}
</DocPage>
