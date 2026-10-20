<script lang="ts">
  import { Badge, Table } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const code = `<Table caption="Team">
  <thead>
    <tr><th scope="col">Name</th><th scope="col">Role</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Ada Lovelace</th><td>Engineer</td></tr>
  </tbody>
</Table>`;

  const props = [
    {
      name: "caption",
      type: "string",
      default: "—",
      description: "Optional caption above the header row.",
    },
    {
      name: "children",
      type: "Snippet",
      default: "—",
      description: "The thead and tbody rows, using normal table markup.",
    },
  ];
</script>

<DocPage title="Table" rows={props}>
  {#snippet lede()}
    A bordered, horizontally scrollable shell around a native table. Write
    normal <code>thead</code>/<code>tbody</code> markup; the cells are styled for
    you.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <Table caption="Team">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Ada Lovelace</th>
              <td>Engineer</td>
              <td><Badge tone="success" dot>active</Badge></td>
            </tr>
            <tr>
              <th scope="row">Grace Hopper</th>
              <td>Compiler team</td>
              <td><Badge tone="neutral" dot>away</Badge></td>
            </tr>
          </tbody>
        </Table>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Other attributes are spread onto the <code>&lt;table&gt;</code>, while
    <code>class</code> goes on the scroll wrapper. Cell styles are scoped under
    <code>.table</code>, so they cannot leak into the rest of your app.
  {/snippet}
</DocPage>
