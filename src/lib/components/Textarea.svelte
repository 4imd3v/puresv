<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import Field from "./Field.svelte";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	interface Props extends HTMLTextareaAttributes {
		label?: string;
		error?: string;
	}

	let { label, error, "aria-describedby": describedBy, ...rest }: Props = $props();
</script>

<Field {label} {error}>
	{#snippet children(errorId)}
		<textarea
			{...rest}
			aria-invalid={error ? true : undefined}
			aria-describedby={[describedBy, errorId].filter(Boolean).join(" ") || undefined}
		></textarea>
	{/snippet}
</Field>

<style>
	@layer puresv {
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

		textarea[aria-invalid="true"] {
			border-color: var(--puresv-danger);
		}

		textarea[aria-invalid="true"]:focus-visible {
			border-color: var(--puresv-danger);
			box-shadow: var(--puresv-focus-shadow-danger);
		}
	}
</style>
