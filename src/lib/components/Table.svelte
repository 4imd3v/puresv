<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLAttributes<HTMLTableElement>, "children"> {
		caption?: string;
		children: Snippet;
	}

	let { caption, class: className, children, ...rest }: Props = $props();
</script>

<div class={["table", className].filter(Boolean).join(" ")}>
	<table {...rest}>
		{#if caption}
			<caption>{caption}</caption>
		{/if}
		{@render children()}
	</table>
</div>

<style>
	@layer puresv {
		/* A scroll container so a wide table never breaks the page layout. */
		.table {
			width: 100%;
			overflow-x: auto;
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-lg);
			background-color: var(--puresv-canvas);
		}

		/* The rows are consumer markup, so the element styles are global but
		   scoped under .table — they cannot leak into the rest of the app. */
		.table :global(table) {
			width: 100%;
			border-collapse: collapse;
			font-size: var(--puresv-text-sm);
			text-align: left;
		}

		.table :global(caption) {
			padding: var(--puresv-space-3) var(--puresv-space-4);
			border-bottom: 1px solid var(--puresv-border);
			color: var(--puresv-text);
			font-size: var(--puresv-text-sm);
			font-weight: var(--puresv-weight-medium);
			text-align: left;
		}

		.table :global(thead th) {
			padding: var(--puresv-space-2) var(--puresv-space-4);
			border-bottom: 1px solid var(--puresv-border);
			background-color: var(--puresv-surface);
			color: var(--puresv-text-muted);
			font-size: var(--puresv-text-sm);
			font-weight: var(--puresv-weight-semibold);
			white-space: nowrap;
		}

		.table :global(tbody th),
		.table :global(tbody td) {
			padding: var(--puresv-space-3) var(--puresv-space-4);
			border-bottom: 1px solid var(--puresv-border);
			color: var(--puresv-text);
			vertical-align: middle;
		}

		.table :global(tbody th) {
			font-weight: var(--puresv-weight-medium);
		}

		.table :global(tbody tr:last-child > *) {
			border-bottom: 0;
		}

		.table :global(tbody tr) {
			transition: background-color var(--puresv-duration) var(--puresv-ease-out);
		}

		@media (hover: hover) {
			.table :global(tbody tr:hover) {
				background-color: var(--puresv-surface);
			}
		}
	}
</style>
