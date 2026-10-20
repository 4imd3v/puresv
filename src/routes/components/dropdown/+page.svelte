<script lang="ts">
  import { Button, Dropdown } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const items = [
    { id: "profile", label: "Profile" },
    { id: "settings", label: "Settings" },
    { id: "billing", label: "Billing", disabled: true },
    { id: "signout", label: "Sign out" },
  ];

  let selected = $state("—");

  const code = `<Dropdown {items} label="Account" onSelect={(id) => (selected = id)}>
  {#snippet trigger(attrs)}
    <Button {...attrs} variant="outline">Account</Button>
  {/snippet}
</Dropdown>`;

  const endCode = `<Dropdown {items} align="end" label="Actions">
  {#snippet trigger(attrs)}
    <Button {...attrs} variant="ghost">Actions</Button>
  {/snippet}
</Dropdown>`;

  const props = [
    {
      name: "items",
      type: "{ id: string; label: string; href?: string; disabled?: boolean }[]",
      default: "—",
      description: "Menu entries. An href renders a link, otherwise a button.",
    },
    {
      name: "trigger",
      type: "Snippet<[TriggerProps]>",
      default: "—",
      description:
        "Renders the trigger. Spread the props onto a focusable element; they wire the click, keys, aria-haspopup and aria-expanded.",
    },
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Whether the menu is open. Bind it with bind:open.",
    },
    {
      name: "align",
      type: '"start" | "end"',
      default: '"start"',
      description: "Which edge of the trigger the menu lines up with.",
    },
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Accessible name for the menu.",
    },
    {
      name: "onSelect",
      type: "(id: string) => void",
      default: "—",
      description: "Called with the item id before the menu closes.",
    },
  ];
</script>

<DocPage title="Dropdown" rows={props}>
  {#snippet lede()}
    A menu anchored to a trigger. Opens on click or ArrowDown, moves with the
    arrow keys, and closes on Escape, a selection, or a click outside.
  {/snippet}

  {#snippet demos()}
    <Demo label="Basic" code={code}>
      {#snippet preview()}
        <div class="dropdown-demo">
          <Dropdown {items} label="Account" onSelect={(id) => (selected = id)}>
            {#snippet trigger(attrs)}
              <Button {...attrs} variant="outline">Account</Button>
            {/snippet}
          </Dropdown>
          <p class="readout">Selected: {selected}</p>
        </div>
      {/snippet}
    </Demo>

    <Demo label="End aligned" code={endCode}>
      {#snippet preview()}
        <div class="dropdown-demo">
          <Dropdown {items} align="end" label="Actions">
            {#snippet trigger(attrs)}
              <Button {...attrs} variant="ghost">Actions</Button>
            {/snippet}
          </Dropdown>
        </div>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    The trigger snippet supplies <code>onclick</code>, <code>onkeydown</code>,
    <code>aria-haspopup</code> and <code>aria-expanded</code>, so a Button works
    unchanged. The menu is absolutely positioned — avoid an
    <code>overflow: hidden</code> ancestor. Items with <code>href</code> render
    links and close on click.
  {/snippet}
</DocPage>

<style>
  @layer puresv {
    /* Reserve room under the trigger so the open menu is not clipped by the
       demo frame. */
    .dropdown-demo {
      display: flex;
      align-items: flex-start;
      gap: var(--puresv-space-4);
      min-height: 11rem;
    }

    .readout {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }
  }
</style>
