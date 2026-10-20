<script lang="ts">
  import type { Row } from "./types";

  interface Props {
    rows: Row[];
  }

  let { rows }: Props = $props();
</script>

<div class="scroll">
  <table>
    <thead>
      <tr>
        <th scope="col">Prop</th>
        <th scope="col">Type</th>
        <th scope="col">Default</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row.name)}
        <tr>
          <th scope="row"><code>{row.name}</code></th>
          <td><code>{row.type}</code></td>
          <td><code>{row.default}</code></td>
          <td>{row.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  @layer puresv {
    .scroll {
      overflow-x: auto;
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-lg);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--puresv-text-sm);
      text-align: left;
    }

    thead th {
      padding: var(--puresv-space-3) var(--puresv-space-4);
      border-bottom: 1px solid var(--puresv-border);
      background-color: var(--puresv-surface);
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-semibold);
      color: var(--puresv-text-muted);
      white-space: nowrap;
    }

    tbody th,
    tbody td {
      padding: var(--puresv-space-3) var(--puresv-space-4);
      border-bottom: 1px solid var(--puresv-border);
      vertical-align: top;
      font-weight: var(--puresv-weight-normal);
    }

    tbody tr:last-child th,
    tbody tr:last-child td {
      border-bottom: 0;
    }

    tbody th code {
      color: var(--puresv-text);
      font-weight: var(--puresv-weight-semibold);
    }

    td code {
      color: var(--puresv-text-muted);
    }

    td:last-child {
      min-width: 14rem;
      color: var(--puresv-text-muted);
    }

    code {
      font-family: var(--puresv-font-mono);
      font-size: 0.9em;
      white-space: nowrap;
    }
  }
</style>
