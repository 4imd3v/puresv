<script lang="ts">
  import { Button, Toaster, toast } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const code = `<Button onclick={() => toast({ title: "Saved", tone: "success" })}>Save</Button>
<Toaster />`;

  const props = [
    {
      name: "title",
      type: "string",
      default: "—",
      description: "The bold first line.",
    },
    {
      name: "description",
      type: "string",
      default: "—",
      description: "Optional supporting line.",
    },
    {
      name: "tone",
      type: '"info" | "success" | "warning" | "danger"',
      default: '"info"',
      description: "Colors the dot and picks role=alert for warning and danger.",
    },
    {
      name: "duration",
      type: "number",
      default: "5000",
      description: "Milliseconds before it dismisses itself; 0 keeps it on screen.",
    },
  ];
</script>

<DocPage title="Toast" rows={props}>
  {#snippet lede()}
    Short, non-blocking feedback from a global queue. Call <code>toast()</code>
    from anywhere and mount one <code>&lt;Toaster /&gt;</code> near the root of
    your layout.
  {/snippet}

  {#snippet demos()}
    <Demo label="Tones" code={code}>
      {#snippet preview()}
        <Button
          onclick={() =>
            toast({ title: "Saved", description: "Your changes are live.", tone: "success" })}
        >
          Save
        </Button>
        <Button
          variant="outline"
          onclick={() =>
            toast({
              title: "Upload failed",
              description: "Check your connection and try again.",
              tone: "danger",
            })}
        >
          Trigger error
        </Button>
        <Button
          variant="ghost"
          onclick={() => toast({ title: "Heads up", description: "This one stays put.", duration: 0 })}
        >
          Sticky toast
        </Button>
        <Toaster />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    <code>toast(options)</code> returns an id and stacks newest last;
    <code>dismiss(id)</code> closes one early. The region is labelled
    "Notifications" and sits in the bottom-end corner, above the safe area.
    Mount a single <code>Toaster</code> — not one per page.
  {/snippet}
</DocPage>
