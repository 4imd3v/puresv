<script lang="ts">
  import { Checkbox } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  let terms = $state(false);

  const basicCode = '<Checkbox label="Accept the terms" bind:checked={terms} />';
  const disabledCode = '<Checkbox label="Unavailable" disabled />';

  const props = [
    {
      name: "checked",
      type: "boolean",
      default: "false",
      description: "Checked state. Bind it with bind:checked.",
    },
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Visible label text beside the box.",
    },
  ];
</script>

<DocPage title="Checkbox" rows={props}>
  {#snippet lede()}
    A checkbox built on a native input, so keyboard and form behaviour come for
    free. The check draws in on an ease-out curve.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={basicCode}>
      {#snippet preview()}
        <Checkbox label="Accept the terms" bind:checked={terms} />
      {/snippet}
    </Demo>

    <Demo label="Disabled" code={disabledCode}>
      {#snippet preview()}
        <Checkbox label="Unavailable" disabled />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Any other attribute is spread onto the underlying checkbox input.
  {/snippet}
</DocPage>
