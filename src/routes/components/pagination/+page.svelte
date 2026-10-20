<script lang="ts">
  import { Pagination } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  let page = $state(5);

  const code = `<Pagination pages={10} bind:page />`;
  const shortCode = `<Pagination pages={3} page={2} />`;

  const props = [
    {
      name: "pages",
      type: "number",
      default: "—",
      description: "Total number of pages. Renders nothing when there is one.",
    },
    {
      name: "page",
      type: "number",
      default: "1",
      description: "Current page. Bind it with bind:page.",
    },
  ];
</script>

<DocPage title="Pagination" rows={props}>
  {#snippet lede()}
    Page controls that collapse long ranges to the first page, the last page
    and the current page's neighbours.
  {/snippet}

  {#snippet demos()}
    <Demo label="Long range" code={code}>
      {#snippet preview()}
        <div class="pagination-demo">
          <Pagination pages={10} bind:page />
          <p class="readout">Page {page} of 10</p>
        </div>
      {/snippet}
    </Demo>

    <Demo label="Short range" code={shortCode}>
      {#snippet preview()}
        <Pagination pages={3} page={2} />
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    The current page is the only ink-filled control and is exposed with
    <code>aria-current="page"</code>. Pass <code>aria-label</code> to localize
    the landmark.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    .pagination-demo {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-3);
    }

    .readout {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }
  }
</style>
