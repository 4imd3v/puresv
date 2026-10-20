<script lang="ts">
  import { Kbd } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const code = `<p>Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search.</p>`;

  const props = [
    {
      name: "children",
      type: "Snippet",
      default: "—",
      description: "The key or chord label.",
    },
  ];
</script>

<DocPage title="Kbd" rows={props}>
  {#snippet lede()}
    A keycap for documenting keyboard shortcuts. A hairline, a slightly heavier
    bottom edge and mono type make it read as a physical key.
  {/snippet}

  {#snippet demos()}
    <Demo label="Shortcut" code={code}>
      {#snippet preview()}
        <p class="shortcut">Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search.</p>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Every native attribute is spread onto the <code>&lt;kbd&gt;</code>, so
    <code>class</code> and <code>title</code> work as expected.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .shortcut {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-md);
    }
  }
</style>
