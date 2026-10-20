<script lang="ts">
  import { Card } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const bodyCode = `<Card>\n  Just the body slot.\n</Card>`;

  const fullCode = `<Card>\n  {#snippet header()}\n    Monthly report\n  {/snippet}\n\n  <p>Body content.</p>\n\n  {#snippet footer()}\n    Updated 2 minutes ago\n  {/snippet}\n</Card>`;

  const linkCode = `<Card href="/components/button">\n  {#snippet header()}\n    Button\n  {/snippet}\n  <p>An href turns the whole card into a link.</p>\n</Card>`;

  const props = [
    {
      name: "header",
      type: "Snippet",
      default: "—",
      description: "Optional snippet rendered above the body, separated by a border.",
    },
    {
      name: "footer",
      type: "Snippet",
      default: "—",
      description: "Optional snippet rendered below the body, in muted text.",
    },
    {
      name: "children",
      type: "Snippet",
      default: "—",
      description: "The card body.",
    },
    {
      name: "href",
      type: "string",
      default: "—",
      description: "Renders an <a> root, so the whole card is clickable.",
    },
  ];
</script>

<DocPage title="Card" rows={props}>
  {#snippet lede()}
    A bordered surface with a hairline top highlight — no drop shadow. Wrap
    content in optional <code>header</code> and <code>footer</code> snippets
    around the default body slot.
  {/snippet}

  {#snippet demos()}
    <Demo label="Body only" code={bodyCode}>
      {#snippet preview()}
        <Card>
          <p>Every slot is optional — a card with only a body still works.</p>
        </Card>
      {/snippet}
    </Demo>

    <Demo label="As a link" code={linkCode}>
      {#snippet preview()}
        <Card href="/components/button">
          {#snippet header()}
            Button
          {/snippet}
          <p>An <code>href</code> turns the whole card into a link.</p>
        </Card>
      {/snippet}
    </Demo>

    <Demo label="Header and footer" code={fullCode}>
      {#snippet preview()}
        <Card>
          {#snippet header()}
            Monthly report
          {/snippet}
          <p>
            Revenue is up 12% on last month, driven mostly by the new pricing
            tier.
          </p>
          {#snippet footer()}
            Updated 2 minutes ago
          {/snippet}
        </Card>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Any other attribute is spread onto the root element — a
    <code>&lt;div&gt;</code>, or an <code>&lt;a&gt;</code> when
    <code>href</code> is set — so <code>class</code>, <code>id</code> and
    <code>style</code> all work as expected.
  {/snippet}
</DocPage>
