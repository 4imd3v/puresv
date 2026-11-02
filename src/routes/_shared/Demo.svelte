<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    label: string;
    code: string;
    preview: Snippet;
  }

  let { label, code, preview }: Props = $props();
</script>

<section class="demo">
  <h3 class="demo-label">{label}</h3>
  <div class="demo-preview">{@render preview()}</div>
  <details class="demo-code">
    <summary>Show code</summary>
    <pre><code>{code}</code></pre>
  </details>
</section>

<style>
  @layer puresv {
    .demo {
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-lg);
      background-color: var(--puresv-surface);
      overflow: clip;
    }

    .demo-label {
      margin: 0;
      padding: var(--puresv-space-3) var(--puresv-space-4);
      border-bottom: 1px solid var(--puresv-border);
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.005em;
      color: var(--puresv-text-muted);
    }

    .demo-preview {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-3);
      align-items: center;
      padding: var(--puresv-space-5) var(--puresv-space-4);
    }

    .demo-code {
      border-top: 1px solid var(--puresv-border);
      interpolate-size: allow-keywords;
    }

    /* The same grow-on-open the Accordion uses, so a disclosure behaves the
       same everywhere on the site. Older browsers keep the native snap. */
    .demo-code::details-content {
      block-size: 0;
      overflow: hidden;
      transition:
        block-size var(--puresv-duration) var(--puresv-ease-out),
        content-visibility var(--puresv-duration) allow-discrete;
    }

    .demo-code[open]::details-content {
      block-size: auto;
    }

    .demo-code summary {
      padding: var(--puresv-space-2) var(--puresv-space-4);
      font-size: var(--puresv-text-xs);
      color: var(--puresv-text-muted);
      cursor: pointer;
    }

    .demo-code summary:hover {
      color: var(--puresv-text);
    }

    .demo-code pre {
      margin: 0;
      padding: var(--puresv-space-4);
      overflow-x: auto;
      border-top: 1px solid var(--puresv-border);
      background-color: var(--puresv-canvas);
      font-family: var(--puresv-font-mono);
      font-size: var(--puresv-text-xs);
      line-height: 1.7;
      color: var(--puresv-text);
      tab-size: 2;
    }
  }
</style>
