<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLInputAttributes, "children" | "type"> {
		label?: string;
	}

	let { label, checked = $bindable(false), ...rest }: Props = $props();
</script>

<label class="switch">
	<input type="checkbox" role="switch" bind:checked {...rest} />
	<span class="track" aria-hidden="true"><span class="knob"></span></span>
	{#if label}
		<span class="label">{label}</span>
	{/if}
</label>

<style>
	@layer puresv {
		.switch {
			position: relative;
			display: inline-flex;
			align-items: center;
			gap: var(--puresv-space-3);
			cursor: pointer;
			user-select: none;
		}

		/* Keep the native checkbox for keyboard + form behaviour, just hide it. */
		input {
			position: absolute;
			width: 1px;
			height: 1px;
			margin: 0;
			opacity: 0;
			pointer-events: none;
		}

		.track {
			position: relative;
			flex-shrink: 0;
			width: 2.5rem;
			height: 1.375rem;
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-border-strong);
			box-shadow: inset 0 1px 1px rgb(0 0 0 / 0.06);
			transition: background-color var(--puresv-duration) var(--puresv-ease-out);
		}

		@media (hover: hover) {
			.switch:hover input:not(:checked):not(:disabled) + .track {
				background-color: color-mix(in oklab, var(--puresv-border-strong) 78%, var(--puresv-text));
			}
		}

		.knob {
			position: absolute;
			top: 2px;
			left: 2px;
			width: 1.125rem;
			height: 1.125rem;
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-knob);
			box-shadow: 0 1px 2px rgb(0 0 0 / 0.2), 0 0 0 0.5px rgb(0 0 0 / 0.04);
			transition: transform var(--puresv-duration) var(--puresv-ease-out);
		}

		input:checked + .track {
			background-color: var(--puresv-accent);
		}

		input:checked + .track .knob {
			transform: translateX(1.125rem);
		}

		input:focus-visible + .track {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		.switch:has(input:disabled) {
			cursor: not-allowed;
			opacity: 0.55;
		}

		.label {
			font-size: var(--puresv-text-md);
			color: var(--puresv-text);
		}
	}
</style>
