<script lang="ts">
  import { Skeleton } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const props = [
    { name: "width", type: "string", default: '"100%"', description: "CSS width, e.g. 200px or 50%." },
    { name: "height", type: "string", default: '"1rem"', description: "CSS height." },
    { name: "circle", type: "boolean", default: "false", description: "A circle instead of a rounded bar." },
  ];
</script>

<DocPage title="Skeleton" rows={props}>
  {#snippet lede()}
    A loading placeholder that pulses on the compositor and holds still under
    reduced motion.
  {/snippet}

  {#snippet demos()}
    <Demo label="Text lines" code={'<Skeleton width="60%" height="1rem" />'}>
      {#snippet preview()}
        <div class="stack">
          <Skeleton width="60%" height="1rem" />
          <Skeleton width="90%" />
          <Skeleton width="75%" />
        </div>
      {/snippet}
    </Demo>

    <Demo label="Circle" code={'<Skeleton circle width="3rem" height="3rem" />'}>
      {#snippet preview()}
        <Skeleton circle width="3rem" height="3rem" />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    The placeholder is <code>aria-hidden</code>; announce the loading state on a
    parent (a <code>role="status"</code> region or a Spinner).
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .stack {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-3);
      width: 100%;
    }
  }
</style>
