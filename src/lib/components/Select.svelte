<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import Field from "./Field.svelte";
	import type { Snippet } from "svelte";
	import type { HTMLSelectAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLSelectAttributes, "children"> {
		label?: string;
		error?: string;
		children: Snippet;
	}

	// Bound as "options": the Field snippet below IS the children prop, and a
	// local binding of that name would shadow the prop it renders (infinite
	// recursion on SSR).
	let {
		label,
		error,
		children: options,
		"aria-describedby": describedBy,
		...rest
	}: Props = $props();
</script>

<Field {label} {error}>
	{#snippet children(errorId)}
		<span class="control">
			<select
				{...rest}
				aria-invalid={error ? true : undefined}
				aria-describedby={[describedBy, errorId].filter(Boolean).join(" ") || undefined}
			>
				{@render options()}
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
	{/snippet}
</Field>

<style>
	@layer puresv {
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

		select[aria-invalid="true"] {
			border-color: var(--puresv-danger);
		}

		select[aria-invalid="true"]:focus-visible {
			border-color: var(--puresv-danger);
			box-shadow: var(--puresv-focus-shadow-danger);
		}
	}
</style>
