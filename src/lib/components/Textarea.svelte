<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	interface Props extends HTMLTextareaAttributes {
		label?: string;
		error?: string;
	}

	let { label, error, ...rest }: Props = $props();
</script>

<div class="field" data-error={error || undefined}>
	<label>
		{#if label}
			<span class="label">{label}</span>
		{/if}
		<textarea {...rest} aria-invalid={error ? true : undefined}></textarea>
	</label>
	{#if error}
		<span class="error">{error}</span>
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
			box-shadow: 0 0 0 2px var(--puresv-canvas), 0 0 0 4px var(--puresv-accent-ring);
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
			box-shadow: 0 0 0 2px var(--puresv-canvas), 0 0 0 4px var(--puresv-danger-ring);
		}

		.error {
			font-size: var(--puresv-text-sm);
			color: var(--puresv-danger);
		}
	}
</style>
