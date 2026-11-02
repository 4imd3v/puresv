<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLInputAttributes, "children" | "type"> {
		label?: string;
		indeterminate?: boolean;
	}

	let {
		label,
		checked = $bindable(false),
		indeterminate = $bindable(false),
		...rest
	}: Props = $props();

	let input = $state<HTMLInputElement | null>(null);

	// The native property cannot be set from markup, and the browser clears it on
	// activation, so mirror it both ways.
	$effect(() => {
		if (!input) return;
		input.indeterminate = indeterminate;
		function onChange() {
			if (indeterminate) indeterminate = false;
		}
		input.addEventListener("change", onChange);
		return () => input.removeEventListener("change", onChange);
	});
</script>

<label class="checkbox" data-indeterminate={indeterminate || undefined}>
	<input type="checkbox" bind:this={input} bind:checked {...rest} />
	<span class="box" aria-hidden="true">
		{#if indeterminate}
			<svg viewBox="0 0 16 16" fill="none">
				<path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		{:else}
			<svg viewBox="0 0 16 16" fill="none">
				<path
					d="M3.5 8.5l3 3 6-7"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		{/if}
	</span>
	{#if label}
		<span class="label">{label}</span>
	{/if}
</label>

<style>
	@layer puresv {
		.checkbox {
			position: relative;
			display: inline-flex;
			align-items: center;
			gap: var(--puresv-space-2);
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

		.box {
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			width: 1.125rem;
			height: 1.125rem;
			border: 1px solid var(--puresv-border-strong);
			border-radius: var(--puresv-radius-sm);
			background-color: var(--puresv-canvas);
			color: var(--puresv-on-accent);
			transition:
				background-color var(--puresv-duration) var(--puresv-ease-out),
				border-color var(--puresv-duration) var(--puresv-ease-out);
		}

		.box svg {
			width: 0.875rem;
			height: 0.875rem;
			opacity: 0;
			transform: scale(0.6);
			transition:
				opacity var(--puresv-duration) var(--puresv-ease-out),
				transform var(--puresv-duration) var(--puresv-ease-out);
		}

		@media (hover: hover) {
			.checkbox:hover input:not(:checked):not(:disabled) + .box {
				border-color: var(--puresv-text-muted);
			}
		}

		input:checked + .box,
		.checkbox[data-indeterminate] .box {
			background-color: var(--puresv-accent);
			border-color: var(--puresv-accent);
		}

		input:checked + .box svg,
		.checkbox[data-indeterminate] .box svg {
			opacity: 1;
			transform: scale(1);
		}

		input:focus-visible + .box {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		.checkbox:has(input:disabled) {
			cursor: not-allowed;
			opacity: 0.55;
		}

		.label {
			font-size: var(--puresv-text-md);
			color: var(--puresv-text);
		}
	}
</style>
