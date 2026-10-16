<script lang="ts">
  import { Select } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const basicCode =
    '<Select label="Country"><option value="us">United States</option><option value="ca">Canada</option></Select>';
  const errorCode = '<Select label="Country" error="Pick a country" />';

  const props = [
    {
      name: "label",
      type: "string",
      default: "—",
      description:
        "Visible label text. The select is wrapped in a label, so the association is automatic.",
    },
    {
      name: "error",
      type: "string",
      default: "—",
      description:
        "When set, the field takes the danger tone, the select is marked aria-invalid, and the message shows below it.",
    },
  ];
</script>

<DocPage title="Select" rows={props}>
  {#snippet lede()}
    A native select, restyled to match Input, with a chevron and the same focus,
    disabled and error states. Options are passed as children.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={basicCode}>
      {#snippet preview()}
        <Select label="Country">
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </Select>
      {/snippet}
    </Demo>

    <Demo label="Error" code={errorCode}>
      {#snippet preview()}
        <Select label="Country" error="Pick a country">
          <option value="">Choose…</option>
        </Select>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Any other attribute — <code>name</code>, <code>value</code>,
    <code>multiple</code>, <code>onchange</code> — is spread onto the
    <code>&lt;select&gt;</code>.
  {/snippet}
</DocPage>
