<script lang="ts">
  import { Textarea } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const basicCode = '<Textarea label="Notes" placeholder="Add a note" rows="4" />';
  const errorCode = '<Textarea label="Notes" error="Add at least 20 characters" />';

  const props = [
    {
      name: "label",
      type: "string",
      default: "—",
      description:
        "Visible label text. The textarea is wrapped in a label, so the association is automatic.",
    },
    {
      name: "error",
      type: "string",
      default: "—",
      description:
        "When set, the field takes the danger tone, the textarea is marked aria-invalid, and the message shows below it.",
    },
  ];
</script>

<DocPage title="Textarea" rows={props}>
  {#snippet lede()}
    A multi-line text field with the same focus, disabled and error states as
    Input.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={basicCode}>
      {#snippet preview()}
        <Textarea label="Notes" placeholder="Add a note" rows={4} />
      {/snippet}
    </Demo>

    <Demo label="Error" code={errorCode}>
      {#snippet preview()}
        <Textarea label="Notes" error="Add at least 20 characters" />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Any other attribute — <code>rows</code>, <code>placeholder</code>,
    <code>value</code>, <code>maxlength</code> — is spread onto the
    <code>&lt;textarea&gt;</code>.
  {/snippet}
</DocPage>
