<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import Field from "./Field.svelte";
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends HTMLInputAttributes {
		label?: string;
		error?: string;
	}

	let { label, error, "aria-describedby": describedBy, ...rest }: Props = $props();
</script>

<Field {label} {error}>
	{#snippet children(errorId)}
		<input
			{...rest}
			aria-invalid={error ? true : undefined}
			aria-describedby={[describedBy, errorId].filter(Boolean).join(" ") || undefined}
		/>
	{/snippet}
</Field>

<style>
	@layer puresv {
		input {
			box-sizing: border-box;
			min-width: 0;
			height: var(--puresv-control-height);
			padding-inline: var(--puresv-space-3);
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-md);
			background-color: var(--puresv-canvas);
			color: var(--puresv-text);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-md);
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

		/* Crisp double-ring focus: a canvas gap, then the accent ring. Reads as
		   precise rather than a soft colored glow. */
		input:focus-visible {
			outline: none;
			border-color: var(--puresv-accent);
			box-shadow: var(--puresv-focus-shadow);
		}

		input:disabled {
			opacity: 0.55;
			cursor: not-allowed;
			background-color: var(--puresv-surface);
		}

		/* The invalid state hangs off the control itself, so it works no matter
		   which component renders the field wrapper. */
		input[aria-invalid="true"] {
			border-color: var(--puresv-danger);
		}

		input[aria-invalid="true"]:focus-visible {
			border-color: var(--puresv-danger);
			box-shadow: var(--puresv-focus-shadow-danger);
		}
	}
</style>
