<script lang="ts">
  import { Radio } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  let plan = $state("pro");

  const groupCode = '<Radio name="plan" value="free" bind:group={plan} label="Free" />';

  const props = [
    {
      name: "value",
      type: "string",
      default: "—",
      description: "The value this radio represents in the group.",
    },
    {
      name: "group",
      type: "string",
      default: "—",
      description: "The selected value of the group. Bind one shared variable with bind:group.",
    },
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Visible label text beside the control.",
    },
  ];
</script>

<DocPage title="Radio" rows={props}>
  {#snippet lede()}
    A radio built on a native input. Bind one shared variable with bind:group
    across a set of radios for exclusive selection.
  {/snippet}

  {#snippet demos()}
    <Demo label="Group" code={groupCode}>
      {#snippet preview()}
        <Radio name="plan" value="free" bind:group={plan} label="Free" />
        <Radio name="plan" value="pro" bind:group={plan} label="Pro" />
        <Radio name="plan" value="team" bind:group={plan} label="Team" />
      {/snippet}
    </Demo>

    <Demo label="Disabled" code={'<Radio label="Unavailable" disabled />'}>
      {#snippet preview()}
        <Radio label="Unavailable" disabled />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Selected: <code>{plan}</code>. Any other attribute is spread onto the
    underlying radio input.
  {/snippet}
</DocPage>
