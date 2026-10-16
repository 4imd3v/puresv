<script lang="ts">
  import { Alert } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const tones = ["info", "success", "warning", "danger"] as const;
  const toneCode = '<Alert tone="success" title="Saved">Your changes have been saved.</Alert>';

  const props = [
    {
      name: "tone",
      type: '"info" | "success" | "warning" | "danger"',
      default: '"info"',
      description: "Colour and left accent. info is neutral; the rest map to status.",
    },
    {
      name: "title",
      type: "string",
      default: "—",
      description: "Optional bold heading above the message.",
    },
  ];
</script>

<DocPage title="Alert" rows={props}>
  {#snippet lede()}
    An inline status banner. Warnings and errors announce with role=alert; info
    and success are passive status.
  {/snippet}

  {#snippet demos()}
    <Demo label="Tones" code={toneCode}>
      {#snippet preview()}
        {#each tones as tone (tone)}
          <Alert {tone} title={tone}>Something you should know about.</Alert>
        {/each}
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Any other attribute is spread onto the container. Override the role by
    passing <code>role</code>.
  {/snippet}
</DocPage>
