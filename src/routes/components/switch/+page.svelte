<script lang="ts">
  import { Switch } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  let on = $state(false);

  const basicCode = '<Switch label="Notifications" bind:checked={on} />';
  const disabledCode = '<Switch label="Notifications" disabled />';

  const props = [
    {
      name: "checked",
      type: "boolean",
      default: "false",
      description: "On/off state. Bind it with bind:checked.",
    },
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Visible label text beside the switch.",
    },
  ];
</script>

<DocPage title="Switch" rows={props}>
  {#snippet lede()}
    An on/off toggle built on a native checkbox, so keyboard and form behaviour
    come for free. The knob slides on an ease-out curve.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={basicCode}>
      {#snippet preview()}
        <Switch label="Notifications" bind:checked={on} />
      {/snippet}
    </Demo>

    <Demo label="Disabled" code={disabledCode}>
      {#snippet preview()}
        <Switch label="Notifications" disabled />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Any other attribute is spread onto the underlying checkbox input.
  {/snippet}
</DocPage>
