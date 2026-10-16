<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
		tone?: Tone;
		dot?: boolean;
		children: Snippet;
	}

	let { tone = "neutral", dot = false, children, ...rest }: Props = $props();
</script>

<span {...rest} data-tone={tone}>
	{#if dot}<span class="dot" aria-hidden="true"></span>{/if}
	{@render children()}
</span>

<style>
	@layer puresv {
		span[data-tone] {
			display: inline-flex;
			align-items: center;
			gap: var(--puresv-space-2);
			padding-block: var(--puresv-space-1);
			padding-inline: var(--puresv-space-2);
			border: 1px solid color-mix(in oklab, currentColor 22%, transparent);
			border-radius: var(--puresv-radius-full);
			font-size: var(--puresv-text-xs);
			font-weight: var(--puresv-weight-medium);
			line-height: 1.4;
			letter-spacing: -0.005em;
		}

		.dot {
			flex-shrink: 0;
			width: 0.5em;
			height: 0.5em;
			border-radius: var(--puresv-radius-full);
			background-color: currentColor;
		}

		span[data-tone="neutral"] {
			border-color: var(--puresv-border);
			background-color: var(--puresv-surface);
			color: var(--puresv-text-muted);
		}

		span[data-tone="accent"] {
			background-color: var(--puresv-accent-soft);
			color: var(--puresv-accent);
		}

		span[data-tone="success"] {
			background-color: var(--puresv-success-soft);
			color: var(--puresv-success);
		}

		span[data-tone="warning"] {
			background-color: var(--puresv-warning-soft);
			color: var(--puresv-warning);
		}

		span[data-tone="danger"] {
			background-color: var(--puresv-danger-soft);
			color: var(--puresv-danger);
		}
	}
</style>
