<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Item {
		id: string;
		title: string;
		content: string | Snippet;
	}

	interface Props extends HTMLAttributes<HTMLDivElement> {
		items: Item[];
	}

	let { items, class: className, ...rest }: Props = $props();
</script>

<div class={["accordion", className].filter(Boolean).join(" ")} {...rest}>
	{#each items as item (item.id)}
		<details class="item">
			<summary class="summary">
				<span class="title">{item.title}</span>
				<svg class="chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<path
						d="M4 6l4 4 4-4"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</summary>
			<div class="content">
				{#if typeof item.content === "string"}
					{item.content}
				{:else}
					{@render item.content()}
				{/if}
			</div>
		</details>
	{/each}
</div>

<style>
	@layer puresv {
		.accordion {
			display: flex;
			flex-direction: column;
			overflow: hidden;
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-lg);
			background-color: var(--puresv-canvas);
		}

		.item + .item {
			border-top: 1px solid var(--puresv-border);
		}

		/* The panel grows on the same clock as the chevron instead of snapping
		   open. Browsers without ::details-content keep the native instant open. */
		.item {
			interpolate-size: allow-keywords;
		}

		.item::details-content {
			block-size: 0;
			overflow: hidden;
			transition:
				block-size var(--puresv-duration) var(--puresv-ease-out),
				content-visibility var(--puresv-duration) allow-discrete;
		}

		.item[open]::details-content {
			block-size: auto;
		}

		.summary {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: var(--puresv-space-3);
			padding: var(--puresv-space-3) var(--puresv-space-4);
			border-radius: var(--puresv-radius-sm);
			list-style: none;
			cursor: pointer;
			user-select: none;
			font-size: var(--puresv-text-md);
			font-weight: var(--puresv-weight-medium);
			color: var(--puresv-text);
			transition: background-color var(--puresv-duration) var(--puresv-ease-out);
		}

		@media (hover: hover) {
			.summary:hover {
				background-color: var(--puresv-surface-2);
			}
		}

		.summary::-webkit-details-marker {
			display: none;
		}

		.summary:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: -2px;
		}

		.chevron {
			flex-shrink: 0;
			width: 1rem;
			height: 1rem;
			color: var(--puresv-text-muted);
			transition: transform var(--puresv-duration) var(--puresv-ease-out);
		}

		.item[open] .chevron {
			transform: rotate(180deg);
		}

		.content {
			padding: 0 var(--puresv-space-4) var(--puresv-space-4);
			font-size: var(--puresv-text-sm);
			line-height: 1.6;
			color: var(--puresv-text-muted);
		}
	}
</style>
