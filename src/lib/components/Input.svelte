<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends HTMLInputAttributes {
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
		<input {...rest} aria-invalid={error ? true : undefined} />
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
			font-size: var(--puresv-text-sm);
			font-weight: 550;
			color: var(--puresv-text);
		}

		input {
			min-width: 0;
			height: 2.5rem;
			padding-inline: var(--puresv-space-3);
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-md);
			background-color: var(--puresv-canvas);
			color: var(--puresv-text);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-sm);
			transition:
				border-color var(--puresv-duration) var(--puresv-ease-out),
				box-shadow var(--puresv-duration) var(--puresv-ease-out);
		}

		input::placeholder {
			color: var(--puresv-text-muted);
		}

		input:hover:not(:disabled) {
			border-color: var(--puresv-border-strong);
		}

		input:focus-visible {
			outline: none;
			border-color: var(--puresv-accent);
			box-shadow: 0 0 0 3px var(--puresv-accent-ring);
		}

		input:disabled {
			opacity: 0.55;
			cursor: not-allowed;
			background-color: var(--puresv-surface);
		}

		.field[data-error] input {
			border-color: var(--puresv-danger);
		}

		.field[data-error] input:focus-visible {
			border-color: var(--puresv-danger);
			box-shadow: 0 0 0 3px var(--puresv-danger-ring);
		}

		.error {
			font-size: var(--puresv-text-sm);
			color: var(--puresv-danger);
		}
	}
</style>
