<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
		header?: Snippet;
		footer?: Snippet;
		children: Snippet;
	}

	let { header, footer, children, ...rest }: Props = $props();
</script>

<div {...rest}>
	{#if header}
		<header>{@render header()}</header>
	{/if}
	<div data-part="body">{@render children()}</div>
	{#if footer}
		<footer>{@render footer()}</footer>
	{/if}
</div>

<style>
	@layer puresv {
		div {
			display: flex;
			flex-direction: column;
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-lg);
			background-color: var(--puresv-surface);
			box-shadow: var(--puresv-shadow-sm);
		}

		header,
		footer {
			padding: var(--puresv-space-4);
		}

		header {
			border-bottom: 1px solid var(--puresv-border);
			font-size: var(--puresv-text-lg);
			font-weight: 600;
		}

		footer {
			border-top: 1px solid var(--puresv-border);
			color: var(--puresv-text-muted);
			font-size: var(--puresv-text-sm);
		}

		[data-part="body"] {
			padding: var(--puresv-space-4);
		}
	}
</style>
