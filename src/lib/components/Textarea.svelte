<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	interface Props extends HTMLTextareaAttributes {
		label?: string;
		error?: string;
	}

	let { label, error, "aria-describedby": describedBy, ...rest }: Props = $props();

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
		<textarea {...rest} aria-invalid={error ? true : undefined} aria-describedby={describedByValue}
		></textarea>
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

		textarea {
			box-sizing: border-box;
			min-width: 0;
			min-height: 5rem;
			padding: var(--puresv-space-3);
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-md);
			background-color: var(--puresv-canvas);
			color: var(--puresv-text);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-md);
			line-height: 1.6;
			resize: vertical;
			transition:
				border-color var(--puresv-duration) var(--puresv-ease-out),
				box-shadow var(--puresv-duration) var(--puresv-ease-out);
		}

		textarea::placeholder {
			color: var(--puresv-text-muted);
		}

		textarea:hover:not(:disabled) {
			border-color: var(--puresv-border-strong);
		}

		textarea:focus-visible {
			outline: none;
			border-color: var(--puresv-accent);
			box-shadow: var(--puresv-focus-shadow);
		}

		textarea:disabled {
			opacity: 0.55;
			cursor: not-allowed;
			background-color: var(--puresv-surface);
		}

		.field[data-error] textarea {
			border-color: var(--puresv-danger);
		}

		.field[data-error] textarea:focus-visible {
			border-color: var(--puresv-danger);
			box-shadow: var(--puresv-focus-shadow-danger);
		}

		.error {
			font-size: var(--puresv-text-sm);
			color: var(--puresv-danger-text);
		}
	}
</style>
