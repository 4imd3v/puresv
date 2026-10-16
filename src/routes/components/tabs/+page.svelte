<script lang="ts">
  import { Tabs } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Activity" },
    { id: "settings", label: "Settings" },
  ];
  let active = $state("overview");

  const code = "<Tabs {tabs} bind:active>{#snippet panel(id)}…{/snippet}</Tabs>";

  const props = [
    {
      name: "tabs",
      type: "{ id: string; label: string }[]",
      default: "—",
      description: "The tab definitions, in order.",
    },
    {
      name: "active",
      type: "string",
      default: "first tab's id",
      description: "The selected tab id. Bind it with bind:active.",
    },
  ];
</script>

<DocPage title="Tabs" rows={props}>
  {#snippet lede()}
    An accessible tab list. Arrow keys move between tabs, and only the active
    tab is in the tab order (roving tabindex).
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <Tabs {tabs} bind:active>
          {#snippet panel(id)}
            <div class="panel-body">
              {#if id === "overview"}A high-level summary of the project.{/if}
              {#if id === "activity"}Recent events and changes.{/if}
              {#if id === "settings"}Configuration options.{/if}
            </div>
          {/snippet}
        </Tabs>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Panels come from the <code>panel</code> snippet, which receives the active
    tab's id. Home/End and Left/Right/Up/Down are supported.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .panel-body {
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
    }
  }
</style>
