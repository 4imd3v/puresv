<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "children"> {
		children: Snippet;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<kbd class={["kbd", className].filter(Boolean).join(" ")} {...rest}>
	{@render children()}
</kbd>

<style>
	@layer puresv {
		/* A physical key: a surface, a hairline, and a slightly heavier bottom
		   edge so it reads as raised without a shadow. */
		.kbd {
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			min-width: 1.5rem;
			height: 1.5rem;
			padding-inline: 0.375rem;
			border: 1px solid var(--puresv-border);
			border-bottom-color: var(--puresv-border-strong);
			border-radius: var(--puresv-radius-sm);
			background-color: var(--puresv-surface);
			color: var(--puresv-text);
			font-family: var(--puresv-font-mono);
			font-size: var(--puresv-text-xs);
			font-weight: var(--puresv-weight-medium);
			line-height: 1;
			white-space: nowrap;
		}
	}
</style>
