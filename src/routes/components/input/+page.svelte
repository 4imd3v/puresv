<script lang="ts">
  import { Input } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const basicCode = '<Input label="Email" type="email" placeholder="you@example.com" />';
  const errorCode = '<Input label="Email" error="Enter a valid email" />';

  const props = [
    {
      name: "label",
      type: "string",
      default: "—",
      description:
        "Visible label text. The input is wrapped in a label, so the association is automatic.",
    },
    {
      name: "error",
      type: "string",
      default: "—",
      description:
        "When set, the field takes the danger tone, the input is marked aria-invalid, and the message shows below it.",
    },
  ];
</script>

<DocPage title="Input" rows={props}>
  {#snippet lede()}
    A labelled text field with focus, disabled and error states. Any native
    input attribute is forwarded.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={basicCode}>
      {#snippet preview()}
        <Input label="Email" type="email" placeholder="you@example.com" />
      {/snippet}
    </Demo>

    <Demo label="Error" code={errorCode}>
      {#snippet preview()}
        <Input label="Email" error="Enter a valid email" />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Any other attribute — <code>type</code>, <code>placeholder</code>,
    <code>name</code>, <code>value</code>, <code>oninput</code> — is spread
    onto the <code>&lt;input&gt;</code>.
  {/snippet}
</DocPage>
