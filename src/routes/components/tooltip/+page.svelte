<script lang="ts">
  import { Button, Tooltip } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const code = `<Tooltip label="Copy to clipboard">
  {#snippet trigger(attrs)}
    <Button {...attrs} variant="outline">Copy</Button>
  {/snippet}
</Tooltip>`;

  const bottomCode = `<Tooltip label="Shown below" placement="bottom">
  {#snippet trigger(attrs)}
    <Button {...attrs} variant="ghost">Below</Button>
  {/snippet}
</Tooltip>`;

  const props = [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "The tooltip text.",
    },
    {
      name: "placement",
      type: '"top" | "bottom"',
      default: '"top"',
      description: "Which side of the trigger the bubble sits on.",
    },
    {
      name: "trigger",
      type: "Snippet<[{ aria-describedby: string }]>",
      default: "—",
      description:
        "Renders the trigger. Spread the props onto the focusable element so it names the tooltip.",
    },
  ];
</script>

<DocPage title="Tooltip" rows={props}>
  {#snippet lede()}
    A short label shown on hover or keyboard focus. The trigger snippet receives
    the descriptor props, so the bubble is announced as a description rather
    than a mystery.
  {/snippet}

  {#snippet demos()}
    <Demo label="Top" code={code}>
      {#snippet preview()}
        <div class="tip-demo">
          <Tooltip label="Copy to clipboard">
            {#snippet trigger(attrs)}
              <Button {...attrs} variant="outline">Copy</Button>
            {/snippet}
          </Tooltip>
        </div>
      {/snippet}
    </Demo>

    <Demo label="Bottom" code={bottomCode}>
      {#snippet preview()}
        <div class="tip-demo">
          <Tooltip label="Shown below the trigger" placement="bottom">
            {#snippet trigger(attrs)}
              <Button {...attrs} variant="ghost">Below</Button>
            {/snippet}
          </Tooltip>
        </div>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Use a tooltip only for short, supplementary text — not for information the
    user needs to complete a task. The bubble is
    <code>pointer-events: none</code>, so it never traps the pointer. It is
    absolutely positioned, so avoid placing a tooltip inside an
    <code>overflow: hidden</code> container.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    /* Room above and below so the bubble is not clipped by the demo frame. */
    .tip-demo {
      display: flex;
      justify-content: center;
      width: 100%;
      padding-block: 2.25rem 2.5rem;
    }
  }
</style>
