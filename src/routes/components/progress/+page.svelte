<script lang="ts">
  import { Progress } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const props = [
    { name: "value", type: "number", default: "0", description: "Current progress, clamped to 0..max." },
    { name: "max", type: "number", default: "100", description: "The value that counts as 100%." },
    { name: "label", type: "string", default: "—", description: "Accessible name for the progressbar." },
  ];
</script>

<DocPage title="Progress" rows={props}>
  {#snippet lede()}
    A determinate progress bar. The fill scales on the compositor and clamps to
    the valid range.
  {/snippet}

  {#snippet demos()}
    <Demo label="Values" code={'<Progress value={60} label="Upload" />'}>
      {#snippet preview()}
        <div class="col">
          <Progress value={25} label="25%" />
          <Progress value={60} label="60%" />
          <Progress value={100} label="Done" />
        </div>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Exposes <code>role="progressbar"</code> with <code>aria-valuenow</code>,
    <code>aria-valuemin</code> and <code>aria-valuemax</code>.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .col {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-4);
      width: 100%;
    }
  }
</style>
