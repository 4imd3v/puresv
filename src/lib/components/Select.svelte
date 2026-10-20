<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLSelectAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLSelectAttributes, "children"> {
		label?: string;
		error?: string;
		children: Snippet;
	}

	let { label, error, children, "aria-describedby": describedBy, ...rest }: Props = $props();

	// Give the message an id so it is announced with the field, not just shown.
	const uid = $props.id();
	const errorId = `${uid}-error`;
	const describedByValue = $derived(
		[describedBy, error ? errorId : undefined].filter(Boolean).join(" ") || undefined,
	);
</script>

<div class="field" data-error={error || undefined}>
	<label>
		{#if label}
			<span class="label">{label}</span>
		{/if}
		<span class="control">
			<select {...rest} aria-invalid={error ? true : undefined} aria-describedby={describedByValue}>
				{@render children()}
			</select>
			<svg class="chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<path
					d="M4 6l4 4 4-4"
					stroke="currentColor"
					stroke-width="1.75"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
	</label>
	{#if error}
		<span class="error" id={errorId}>{error}</span>
	{/if}
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

		.control {
			position: relative;
			display: inline-flex;
			min-width: 0;
		}

		select {
			box-sizing: border-box;
			appearance: none;
			min-width: 0;
			width: 100%;
			height: var(--puresv-control-height);
			padding-inline: var(--puresv-space-3);
			padding-inline-end: var(--puresv-space-6);
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-md);
			background-color: var(--puresv-canvas);
			color: var(--puresv-text);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-md);
			cursor: pointer;
			transition:
				border-color var(--puresv-duration) var(--puresv-ease-out),
				box-shadow var(--puresv-duration) var(--puresv-ease-out);
		}

		.chevron {
			position: absolute;
			top: 50%;
			right: var(--puresv-space-3);
			width: 1rem;
			height: 1rem;
			color: var(--puresv-text-muted);
			transform: translateY(-50%);
			pointer-events: none;
		}

		select:hover:not(:disabled) {
			border-color: var(--puresv-border-strong);
		}

		select:focus-visible {
			outline: none;
			border-color: var(--puresv-accent);
			box-shadow: var(--puresv-focus-shadow);
		}

		select:disabled {
			opacity: 0.55;
			cursor: not-allowed;
			background-color: var(--puresv-surface);
		}

		.field[data-error] select {
			border-color: var(--puresv-danger);
		}

		.field[data-error] select:focus-visible {
			border-color: var(--puresv-danger);
			box-shadow: var(--puresv-focus-shadow-danger);
		}

		.error {
			font-size: var(--puresv-text-sm);
			color: var(--puresv-danger-text);
		}
	}
</style>
