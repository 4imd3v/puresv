<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";

	interface Item {
		term: string;
		description: string;
	}

	interface Props extends HTMLAttributes<HTMLDListElement> {
		items: Item[];
	}

	let { items, class: className, ...rest }: Props = $props();
</script>

<dl class={["description-list", className].filter(Boolean).join(" ")} {...rest}>
	{#each items as item, index (index)}
		<div class="row">
			<dt>{item.term}</dt>
			<dd>{item.description}</dd>
		</div>
	{/each}
</dl>

<style>
	@layer puresv {
		.description-list {
			margin: 0;
		}

		.row {
			display: grid;
			grid-template-columns: 12rem minmax(0, 1fr);
			gap: var(--puresv-space-4);
			padding-block: var(--puresv-space-3);
		}

		.row + .row {
			border-top: 1px solid var(--puresv-border);
		}

		.row:first-child {
			padding-block-start: 0;
		}

		.row:last-child {
			padding-block-end: 0;
		}

		dt {
			color: var(--puresv-text-muted);
			font-size: var(--puresv-text-sm);
		}

		dd {
			margin: 0;
			color: var(--puresv-text);
			font-size: var(--puresv-text-sm);
			overflow-wrap: anywhere;
		}

		@media (width < 32rem) {
			.row {
				grid-template-columns: minmax(0, 1fr);
				gap: var(--puresv-space-1);
			}
		}
	}
</style>
