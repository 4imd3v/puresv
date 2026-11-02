<script lang="ts">
  import {
    Avatar,
    AvatarGroup,
    Badge,
    Button,
    Card,
    Progress,
    SegmentedControl,
    Stat,
    Table,
  } from "#lib";

  const ranges = [
    { value: "30d", label: "30 days" },
    { value: "90d", label: "90 days" },
    { value: "12m", label: "12 months" },
  ];
  let range = $state("30d");

  const nav = [
    { title: "Workspace", links: ["Overview", "Orders", "Customers"] },
    { title: "Catalogue", links: ["Products", "Inventory"] },
    { title: "Account", links: ["Billing", "Settings"] },
  ];
  let current = $state("Overview");

  const stats = [
    { label: "Revenue", value: "$48,120", delta: "+12.4%", tone: "positive" },
    { label: "Orders", value: "1,284", delta: "+6.1%", tone: "positive" },
    { label: "Customers", value: "892", delta: "+2.3%", tone: "positive" },
    { label: "Refunds", value: "24", delta: "+2.1%", tone: "negative" },
  ] as const;

  const orders = [
    { id: "#3210", name: "Ada Lovelace", status: "Paid", tone: "success", total: "$129.00" },
    { id: "#3209", name: "Grace Hopper", status: "Pending", tone: "warning", total: "$74.50" },
    { id: "#3208", name: "Alan Turing", status: "Paid", tone: "success", total: "$312.00" },
    { id: "#3207", name: "Barbara Liskov", status: "Refunded", tone: "neutral", total: "$48.00" },
    { id: "#3206", name: "Edsger Dijkstra", status: "Paid", tone: "success", total: "$96.00" },
  ] as const;

  const products = [
    { name: "Runner Pro", units: 412, share: 82 },
    { name: "Studio Tee", units: 287, share: 57 },
    { name: "Trail Cap", units: 194, share: 39 },
    { name: "Field Jacket", units: 138, share: 27 },
  ];

  const team = [
    "Ada Lovelace",
    "Grace Hopper",
    "Alan Turing",
    "Edsger Dijkstra",
    "Barbara Liskov",
  ].map((name) => ({ name }));
</script>

<div class="dashboard">
  <div class="layout">
    <aside class="rail">
      <p class="workspace"><span class="workspace-mark" aria-hidden="true">A</span>Acme Inc.</p>

      <nav class="nav" aria-label="Workspace">
        {#each nav as group (group.title)}
          <div>
            <p class="nav-title">{group.title}</p>
            <ul>
              {#each group.links as link (link)}
                <li>
                  <button
                    type="button"
                    class="nav-link"
                    aria-current={current === link ? "page" : undefined}
                    onclick={() => (current = link)}>{link}</button
                  >
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </nav>

      <div class="rail-user">
        <Avatar name="Ada Lovelace" size="sm" />
        <div class="rail-user-meta">
          <p class="rail-user-name">Ada Lovelace</p>
          <p class="rail-user-mail">ada@acme.com</p>
        </div>
      </div>
    </aside>

    <div class="pane">
      <header class="bar">
        <div>
          <h2>Overview</h2>
          <p>Synced 2 minutes ago</p>
        </div>
        <div class="bar-actions">
          <SegmentedControl options={ranges} bind:value={range} aria-label="Date range" />
          <Button variant="outline">Export</Button>
        </div>
      </header>

      <div class="stats">
        {#each stats as stat (stat.label)}
          <Card>
            <Stat
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              tone={stat.tone}
            />
          </Card>
        {/each}
      </div>

      <div class="split">
        <Table caption="Recent orders">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Customer</th>
              <th scope="col">Status</th>
              <th scope="col" class="num">Total</th>
            </tr>
          </thead>
          <tbody>
            {#each orders as order (order.id)}
              <tr>
                <th scope="row">{order.id}</th>
                <td>
                  <span class="customer">
                    <Avatar name={order.name} size="sm" />
                    {order.name}
                  </span>
                </td>
                <td><Badge tone={order.tone} dot>{order.status}</Badge></td>
                <td class="num">{order.total}</td>
              </tr>
            {/each}
          </tbody>
        </Table>

        <div class="column">
          <Card>
            <h3 class="card-title">Top products</h3>
            <ul class="products">
              {#each products as product (product.name)}
                <li>
                  <p class="product-row">
                    <span>{product.name}</span>
                    <span class="product-units">{product.units} sold</span>
                  </p>
                  <Progress value={product.share} label={product.name} />
                </li>
              {/each}
            </ul>
          </Card>

          <Card>
            <h3 class="card-title">Team</h3>
            <AvatarGroup items={team} max={4} />
            <p class="team-note">4 of 8 seats used</p>
          </Card>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @layer puresv {
    /* Container queries, not viewport ones: a block is previewed inside a
       frame that is narrower than the page. */
    /* The root is the query container. Its layout lives one level down, because
       @container cannot style the container element itself. */
    .dashboard {
      container-type: inline-size;
      background-color: var(--puresv-canvas);
      color: var(--puresv-text);
      font-family: var(--puresv-font);
      font-size: var(--puresv-text-md);
      text-align: start;
    }

    .layout {
      display: grid;
      grid-template-columns: 14rem minmax(0, 1fr);
    }

    .rail {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-5);
      padding: var(--puresv-space-4);
      border-inline-end: 1px solid var(--puresv-border);
      background-color: var(--puresv-surface);
    }

    .workspace {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
      margin: 0;
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .workspace-mark {
      display: grid;
      place-items: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: var(--puresv-radius-sm);
      background-color: var(--puresv-primary);
      color: var(--puresv-on-primary);
      font-size: var(--puresv-text-xs);
    }

    .nav {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-4);
    }

    .nav-title {
      margin: 0 0 var(--puresv-space-2);
      padding-inline-start: var(--puresv-space-2);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-xs);
      font-weight: var(--puresv-weight-medium);
    }

    .nav ul {
      display: flex;
      flex-direction: column;
      gap: 1px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .nav-link {
      width: 100%;
      padding: var(--puresv-space-2);
      border: 0;
      border-radius: var(--puresv-radius-md);
      background: none;
      color: var(--puresv-text-muted);
      font: inherit;
      text-align: start;
      cursor: pointer;
      transition:
        background-color var(--puresv-duration) var(--puresv-ease-out),
        color var(--puresv-duration) var(--puresv-ease-out);
    }

    .nav-link:hover {
      background-color: var(--puresv-surface-2);
      color: var(--puresv-text);
    }

    .nav-link[aria-current="page"] {
      background-color: var(--puresv-accent-soft);
      color: var(--puresv-accent-text);
      font-weight: var(--puresv-weight-medium);
    }

    .nav-link:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: 2px;
    }

    .rail-user {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
      min-width: 0;
      margin-block-start: auto;
      padding-block-start: var(--puresv-space-3);
      border-top: 1px solid var(--puresv-border);
    }

    .rail-user-meta {
      min-width: 0;
    }

    .rail-user-name,
    .rail-user-mail {
      overflow: hidden;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .rail-user-name {
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-medium);
    }

    .rail-user-mail {
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-xs);
    }

    .pane {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-5);
      min-width: 0;
      padding: var(--puresv-space-5);
    }

    .bar {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-3);
      align-items: center;
      justify-content: space-between;
    }

    .bar h2 {
      margin: 0 0 var(--puresv-space-1);
      font-size: 1.25rem;
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.02em;
    }

    .bar p {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }

    .bar-actions {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: var(--puresv-space-3);
    }

    .split {
      display: grid;
      grid-template-columns: minmax(0, 1.9fr) minmax(0, 1fr);
      gap: var(--puresv-space-4);
      align-items: start;
    }

    .column {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-4);
      min-width: 0;
    }

    .card-title {
      margin: 0 0 var(--puresv-space-3);
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .products {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .product-row {
      display: flex;
      gap: var(--puresv-space-2);
      justify-content: space-between;
      margin: 0 0 var(--puresv-space-2);
      font-size: var(--puresv-text-sm);
    }

    .product-units {
      color: var(--puresv-text-muted);
      font-variant-numeric: tabular-nums;
    }

    .team-note {
      margin: var(--puresv-space-3) 0 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }

    .customer {
      display: inline-flex;
      gap: var(--puresv-space-2);
      align-items: center;
      white-space: nowrap;
    }

    .num {
      text-align: end;
      font-variant-numeric: tabular-nums;
    }

    /* The rail collapses to nothing rather than becoming a drawer. */
    @container (width < 56rem) {
      .layout {
        grid-template-columns: minmax(0, 1fr);
      }

      .rail {
        display: none;
      }
    }

    @container (width < 44rem) {
      .stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .split {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    @container (width < 30rem) {
      .pane {
        padding: var(--puresv-space-4);
      }
    }
  }
</style>
