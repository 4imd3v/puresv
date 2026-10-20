<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";

	type Tone = "positive" | "negative" | "neutral";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		label: string;
		value: string;
		delta?: string;
		tone?: Tone;
	}

	let { label, value, delta, tone = "neutral", class: className, ...rest }: Props = $props();
</script>

<div class={["stat", className].filter(Boolean).join(" ")} {...rest}>
	<p class="label">{label}</p>
	<p class="value">{value}</p>
	{#if delta}
		<p class="delta" data-tone={tone}>{delta}</p>
	{/if}
</div>

<style>
	@layer puresv {
		.stat {
			display: flex;
			flex-direction: column;
			gap: var(--puresv-space-1);
			min-width: 0;
		}

		.label {
			margin: 0;
			color: var(--puresv-text-muted);
			font-size: var(--puresv-text-xs);
			font-weight: var(--puresv-weight-semibold);
			text-transform: uppercase;
			letter-spacing: 0.08em;
		}

		.value {
			margin: 0;
			color: var(--puresv-text);
			font-size: 1.75rem;
			font-weight: var(--puresv-weight-semibold);
			line-height: 1.1;
			letter-spacing: -0.03em;
			font-variant-numeric: tabular-nums;
		}

		.delta {
			margin: 0;
			color: var(--puresv-text-muted);
			font-size: var(--puresv-text-sm);
			font-weight: var(--puresv-weight-medium);
		}

		.delta[data-tone="positive"] {
			color: var(--puresv-success-text);
		}

		.delta[data-tone="negative"] {
			color: var(--puresv-danger-text);
		}
	}
</style>
