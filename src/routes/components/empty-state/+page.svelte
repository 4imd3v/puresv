<script lang="ts">
  import { Button, Card, EmptyState } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const code = `<EmptyState
  title="No projects yet"
  description="Create a project to start tracking work."
>
  {#snippet action()}
    <Button>New project</Button>
  {/snippet}
</EmptyState>`;

  const iconCode = `<EmptyState title="No results" description="Try a different search.">
  {#snippet icon()}
    <svg viewBox="0 0 20 20">…</svg>
  {/snippet}
</EmptyState>`;

  const props = [
    {
      name: "title",
      type: "string",
      default: "—",
      description: "The heading.",
    },
    {
      name: "description",
      type: "string",
      default: "—",
      description: "Optional supporting line.",
    },
    {
      name: "level",
      type: "2 | 3 | 4",
      default: "3",
      description: "Heading level for the title.",
    },
    {
      name: "icon",
      type: "Snippet",
      default: "—",
      description: "Optional icon, rendered inside a bordered circle.",
    },
    {
      name: "action",
      type: "Snippet",
      default: "—",
      description: "Optional call to action below the copy.",
    },
  ];
</script>

<DocPage title="EmptyState" rows={props}>
  {#snippet lede()}
    The block a surface shows when it has nothing to show: a title, a short
    explanation and one action. No illustration set to maintain.
  {/snippet}

  {#snippet demos()}
    <Demo label="With an action" code={code}>
      {#snippet preview()}
        <Card>
          <EmptyState
            title="No projects yet"
            description="Create a project to start tracking work."
          >
            {#snippet action()}
              <Button>New project</Button>
            {/snippet}
          </EmptyState>
        </Card>
      {/snippet}
    </Demo>

    <Demo label="With an icon" code={iconCode}>
      {#snippet preview()}
        <EmptyState title="No results" description="Try a different search.">
          {#snippet icon()}
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5" />
              <path d="M13 13l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          {/snippet}
        </EmptyState>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Every part except the title is optional. The heading level defaults to
    <code>h3</code> so it sits under a page or card heading; set
    <code>level</code> to match your outline.
  {/snippet}
</DocPage>
