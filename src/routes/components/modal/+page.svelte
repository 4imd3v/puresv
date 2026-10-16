<script lang="ts">
  import { Button, Modal } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  let open = $state(false);

  const code = '<Modal bind:open title="Delete file">Are you sure?</Modal>';

  const props = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Whether the dialog is shown. Bind it with bind:open.",
    },
    {
      name: "title",
      type: "string",
      default: "—",
      description: "Optional heading in the dialog header.",
    },
  ];
</script>

<DocPage title="Modal" rows={props}>
  {#snippet lede()}
    A modal built on the native dialog element, so focus trapping, Escape and
    the top layer come for free. Closes on Escape, a backdrop click, or the
    close button.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <Button variant="solid" onclick={() => (open = true)}>Open modal</Button>
        <Modal bind:open title="Delete file">
          <p>This action can't be undone.</p>
          <div class="actions">
            <Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
            <Button variant="solid" onclick={() => (open = false)}>Delete</Button>
          </div>
        </Modal>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    The dialog is always in the DOM and shown via <code>showModal()</code>; bind
    <code>open</code> to control it.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--puresv-space-2);
      margin-block-start: var(--puresv-space-4);
    }
  }
</style>
