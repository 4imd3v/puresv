<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";
	import Avatar from "./Avatar.svelte";

	type Size = "sm" | "md" | "lg";

	interface Item {
		src?: string;
		name?: string;
	}

	interface Props extends HTMLAttributes<HTMLDivElement> {
		items: Item[];
		max?: number;
		size?: Size;
	}

	let { items, max = 4, size = "md", class: className, ...rest }: Props = $props();

	// A negative or zero max still shows the overflow chip for every item.
	const shown = $derived(items.slice(0, Math.max(0, Math.trunc(max))));
	const hidden = $derived(Math.max(0, items.length - shown.length));
</script>

<div class={["avatar-group", className].filter(Boolean).join(" ")} {...rest}>
	{#each shown as item, index (index)}
		<span class="item">
			<Avatar src={item.src} name={item.name} {size} />
		</span>
	{/each}
	{#if hidden > 0}
		<span class="item">
			<span class="more" data-size={size}>+{hidden}</span>
		</span>
	{/if}
</div>

<style>
	@layer puresv {
		.avatar-group {
			display: inline-flex;
			align-items: center;
		}

		/* Each avatar carries a canvas ring, so overlapping stays legible; later
		   items paint above earlier ones. */
		.item {
			display: inline-flex;
			border-radius: var(--puresv-radius-full);
			box-shadow: 0 0 0 2px var(--puresv-canvas);
		}

		.item + .item {
			margin-inline-start: -0.5rem;
		}

		.more {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-surface-2);
			color: var(--puresv-text-muted);
			font-weight: var(--puresv-weight-medium);
			letter-spacing: -0.01em;
			user-select: none;
		}

		.more[data-size="sm"] {
			width: 2rem;
			height: 2rem;
			font-size: var(--puresv-text-xs);
		}

		.more[data-size="md"] {
			width: 2.5rem;
			height: 2.5rem;
			font-size: var(--puresv-text-sm);
		}

		.more[data-size="lg"] {
			width: 3.5rem;
			height: 3.5rem;
			font-size: var(--puresv-text-md);
		}
	}
</style>
