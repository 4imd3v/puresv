<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
		title: string;
		description?: string;
		level?: 2 | 3 | 4;
		icon?: Snippet;
		action?: Snippet;
	}

	let {
		title,
		description,
		level = 3,
		icon,
		action,
		class: className,
		...rest
	}: Props = $props();
</script>

<div class={["empty", className].filter(Boolean).join(" ")} {...rest}>
	{#if icon}
		<span class="icon">{@render icon()}</span>
	{/if}
	<svelte:element this={`h${level}`} class="title">{title}</svelte:element>
	{#if description}
		<p class="desc">{description}</p>
	{/if}
	{#if action}
		<div class="action">{@render action()}</div>
	{/if}
</div>

<style>
	@layer puresv {
		.empty {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--puresv-space-2);
			padding: var(--puresv-space-6) var(--puresv-space-4);
			text-align: center;
		}

		/* A bordered circle keeps the empty state on-system instead of shipping
		   an illustration. */
		.icon {
			display: grid;
			place-items: center;
			width: 2.5rem;
			height: 2.5rem;
			margin-block-end: var(--puresv-space-2);
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-surface);
			color: var(--puresv-text-muted);
		}

		.icon :global(svg) {
			display: block;
			width: 1.25rem;
			height: 1.25rem;
		}

		.title {
			margin: 0;
			color: var(--puresv-text);
			font-size: var(--puresv-text-lg);
			font-weight: var(--puresv-weight-semibold);
			letter-spacing: -0.01em;
		}

		.desc {
			max-width: 28rem;
			margin: 0;
			color: var(--puresv-text-muted);
			font-size: var(--puresv-text-sm);
			line-height: 1.6;
		}

		.action {
			margin-block-start: var(--puresv-space-2);
		}
	}
</style>
