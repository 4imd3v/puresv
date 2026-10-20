<script lang="ts">
  import { Checkbox } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  let terms = $state(false);
  let all = $state(false);
  let mixed = $state(true);

  const basicCode = '<Checkbox label="Accept the terms" bind:checked={terms} />';
  const disabledCode = '<Checkbox label="Unavailable" disabled />';
  const mixedCode = '<Checkbox label="Select all" bind:checked={all} bind:indeterminate={mixed} />';

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
    {
      name: "indeterminate",
      type: "boolean",
      default: "false",
      description:
        "Shows the mixed dash and sets the native mixed state. Bind it; the browser clears it on activation.",
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

    <Demo label="Indeterminate" code={mixedCode}>
      {#snippet preview()}
        <Checkbox label="Select all" bind:checked={all} bind:indeterminate={mixed} />
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
