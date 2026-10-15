<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
		tone?: Tone;
		children: Snippet;
	}

	let { tone = "neutral", children, ...rest }: Props = $props();
</script>

<span {...rest} data-tone={tone}>{@render children()}</span>

<style>
	@layer puresv {
		span {
			display: inline-flex;
			align-items: center;
			padding-block: var(--puresv-space-1);
			padding-inline: var(--puresv-space-2);
			border-radius: var(--puresv-radius-full);
			font-size: var(--puresv-text-xs);
			font-weight: 600;
			line-height: 1.4;
		}

		span[data-tone="neutral"] {
			background-color: var(--puresv-surface);
			color: var(--puresv-text-muted);
		}

		span[data-tone="accent"] {
			background-color: var(--puresv-accent);
			color: var(--puresv-on-accent);
		}

		span[data-tone="success"] {
			background-color: var(--puresv-success);
			color: var(--puresv-canvas);
		}

		span[data-tone="warning"] {
			background-color: var(--puresv-warning);
			color: var(--puresv-canvas);
		}

		span[data-tone="danger"] {
			background-color: var(--puresv-danger);
			color: var(--puresv-canvas);
		}
	}
</style>
