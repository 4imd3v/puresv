<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLInputAttributes, "children" | "type" | "checked"> {
		label?: string;
		value?: string;
		group?: string;
	}

	let { label, value, group = $bindable<string | undefined>(undefined), ...rest }: Props =
		$props();
</script>

<label class="radio">
	<input type="radio" bind:group {value} {...rest} />
	<span class="dot" aria-hidden="true"></span>
	{#if label}
		<span class="label">{label}</span>
	{/if}
</label>

<style>
	@layer puresv {
		.radio {
			position: relative;
			display: inline-flex;
			align-items: center;
			gap: var(--puresv-space-2);
			cursor: pointer;
			user-select: none;
		}

		/* Keep the native radio for keyboard + form behaviour, just hide it. */
		input {
			position: absolute;
			width: 1px;
			height: 1px;
			margin: 0;
			opacity: 0;
			pointer-events: none;
		}

		.dot {
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			width: 1.125rem;
			height: 1.125rem;
			border: 1px solid var(--puresv-border-strong);
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-canvas);
			transition:
				background-color var(--puresv-duration) var(--puresv-ease-out),
				border-color var(--puresv-duration) var(--puresv-ease-out);
		}

		.dot::after {
			content: "";
			width: 0.5rem;
			height: 0.5rem;
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-on-accent);
			opacity: 0;
			transform: scale(0.5);
			transition:
				opacity var(--puresv-duration) var(--puresv-ease-out),
				transform var(--puresv-duration) var(--puresv-ease-out);
		}

		@media (hover: hover) {
			.radio:hover input:not(:checked):not(:disabled) + .dot {
				border-color: var(--puresv-text-muted);
			}
		}

		input:checked + .dot {
			border-color: var(--puresv-accent);
			background-color: var(--puresv-accent);
		}

		input:checked + .dot::after {
			opacity: 1;
			transform: scale(1);
		}

		input:focus-visible + .dot {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		.radio:has(input:disabled) {
			cursor: not-allowed;
			opacity: 0.55;
		}

		.label {
			font-size: var(--puresv-text-md);
			color: var(--puresv-text);
		}
	}
</style>
