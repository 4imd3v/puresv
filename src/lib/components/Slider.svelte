<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLInputAttributes, "type" | "value"> {
		label?: string;
		value?: number;
	}

	let {
		label,
		value = $bindable(0),
		min = 0,
		max = 100,
		class: className,
		...rest
	}: Props = $props();

	const lo = $derived(Number(min));
	const hi = $derived(Number(max));
	// The fill is painted by a gradient, so the value only needs to reach CSS.
	const percent = $derived(
		hi > lo ? Math.min(100, Math.max(0, ((value - lo) / (hi - lo)) * 100)) : 0,
	);
</script>

<div class={["field", className].filter(Boolean).join(" ")}>
	<label>
		{#if label}
			<span class="label">{label}</span>
		{/if}
		<input
			type="range"
			{min}
			{max}
			bind:value
			{...rest}
			style={`--puresv-slider-fill: ${percent}%`}
		/>
	</label>
</div>

<style>
	@layer puresv {
		.field {
			display: flex;
			flex-direction: column;
			gap: var(--puresv-space-2);
			min-width: 0;
		}

		label {
			display: flex;
			flex-direction: column;
			gap: var(--puresv-space-2);
			min-width: 0;
		}

		.label {
			font-size: var(--puresv-text-md);
			font-weight: var(--puresv-weight-medium);
			color: var(--puresv-text);
		}

		/* The input is 24px tall so it is comfortable to hit; the 4px track is a
		   centred background gradient whose split point comes from the value. */
		input {
			appearance: none;
			width: 100%;
			height: 1.5rem;
			margin: 0;
			border: 0;
			border-radius: var(--puresv-radius-full);
			background-image: linear-gradient(
				to right,
				var(--puresv-accent) var(--puresv-slider-fill, 0%),
				var(--puresv-fill-muted) var(--puresv-slider-fill, 0%)
			);
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100% 0.25rem;
			cursor: pointer;
			-webkit-tap-highlight-color: transparent;
		}

		input::-webkit-slider-runnable-track {
			height: 0.25rem;
			background: transparent;
		}

		input::-moz-range-track {
			height: 0.25rem;
			background: transparent;
		}

		/* A physical knob, matching the switch: white, hairline border, soft edge. */
		input::-webkit-slider-thumb {
			-webkit-appearance: none;
			width: 1rem;
			height: 1rem;
			margin-top: -0.375rem;
			border: 1px solid var(--puresv-border-strong);
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-knob);
			box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
		}

		input::-moz-range-thumb {
			width: 1rem;
			height: 1rem;
			border: 1px solid var(--puresv-border-strong);
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-knob);
			box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
		}

		/* The native ring would sit around the whole 24px box; put the crisp
		   ring on the knob instead, where the eye already is. */
		input:focus-visible {
			outline: none;
		}

		input:focus-visible::-webkit-slider-thumb {
			box-shadow: var(--puresv-focus-shadow);
		}

		input:focus-visible::-moz-range-thumb {
			box-shadow: var(--puresv-focus-shadow);
		}

		input:disabled {
			opacity: 0.55;
			cursor: not-allowed;
		}
	}
</style>
