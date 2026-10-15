<script lang="ts">
  import { Button } from "#lib";
  import { Demo } from "../../_shared/index";
  import { DocPage } from "../../_shared/index";

  const variants = ["solid", "soft", "outline", "ghost", "link"] as const;
  const sizes = ["sm", "md", "lg"] as const;

  const variantCode = variants.map((v) => `<Button variant="${v}">${v}</Button>`).join("\n");
  const sizeCode = sizes.map((s) => `<Button size="${s}">${s}</Button>`).join("\n");
  const stateCode = `<Button disabled>Disabled</Button>\n<Button type="submit">Submit</Button>`;

  const props = [
    {
      name: "variant",
      type: '"solid" | "soft" | "outline" | "ghost" | "link"',
      default: '"solid"',
      description:
        "Visual weight. solid is the primary action, soft is a tinted secondary, outline and ghost are quieter, link is text only.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Height and horizontal padding: 2rem, 2.5rem, 3rem.",
    },
  ];
</script>

<DocPage title="Button" rows={props}>
  {#snippet lede()}
    Triggers an action. Five variants across three sizes, each with hover, press
    and focus-visible states.
  {/snippet}

  {#snippet demos()}
    <Demo label="Variants" code={variantCode}>
      {#snippet preview()}
        {#each variants as variant (variant)}
          <Button {variant}>{variant}</Button>
        {/each}
      {/snippet}
    </Demo>

    <Demo label="Sizes" code={sizeCode}>
      {#snippet preview()}
        {#each sizes as size (size)}
          <Button {size}>{size}</Button>
        {/each}
      {/snippet}
    </Demo>

    <Demo label="States" code={stateCode}>
      {#snippet preview()}
        <Button disabled>Disabled</Button>
        <Button type="submit">Submit</Button>
        <Button variant="outline" disabled>Disabled</Button>
      {/snippet}
    </Demo>
  {/snippet}

  {#snippet note()}
    Any other attribute — <code>type</code>, <code>disabled</code>,
    <code>aria-*</code>, <code>onclick</code> — is spread onto the
    <code>&lt;button&gt;</code> element.
  {/snippet}
</DocPage>
