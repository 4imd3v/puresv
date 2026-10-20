<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";

	interface Props {
		label?: string;
		error?: string;
		/** Receives the error message id (undefined when there is no error). */
		children: Snippet<[string | undefined]>;
	}

	let { label, error, children }: Props = $props();

	// The control is rendered by the parent, so it receives the id through the
	// snippet to wire aria-describedby itself.
	const uid = $props.id();
	const errorId = `${uid}-error`;
</script>

<div class="field" data-error={error || undefined}>
	<label>
		{#if label}
			<span class="label">{label}</span>
		{/if}
		{@render children(error ? errorId : undefined)}
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

		.error {
			font-size: var(--puresv-text-sm);
			color: var(--puresv-danger-text);
		}
	}
</style>
