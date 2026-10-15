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
      font-size: var(--puresv-text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
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
