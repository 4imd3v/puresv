<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Tone = "info" | "success" | "warning" | "danger";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
		tone?: Tone;
		title?: string;
		children: Snippet;
	}

	let { tone = "info", title, role, class: className, children, ...rest }: Props = $props();

	// Warnings and errors interrupt, so they announce; the rest are passive status.
	const defaultRole = tone === "danger" || tone === "warning" ? "alert" : "status";
</script>

<div class={["alert", className].filter(Boolean).join(" ")} {...rest} role={role ?? defaultRole} data-tone={tone}>
	{#if title}
		<strong class="title">{title}</strong>
	{/if}
	<div class="body">{@render children()}</div>
</div>

<style>
	@layer puresv {
		.alert {
			display: flex;
			flex-direction: column;
			gap: var(--puresv-space-1);
			padding: var(--puresv-space-4);
			border: 1px solid var(--puresv-border);
			border-inline-start: 3px solid var(--puresv-accent);
			border-radius: var(--puresv-radius-md);
			background-color: var(--puresv-accent-soft);
		}

		.title {
			font-size: var(--puresv-text-sm);
			font-weight: 600;
			color: var(--puresv-accent);
		}

		.body {
			font-size: var(--puresv-text-sm);
			line-height: 1.6;
			color: var(--puresv-text);
		}

		.alert[data-tone="success"] {
			border-inline-start-color: var(--puresv-success);
			background-color: var(--puresv-success-soft);
		}

		.alert[data-tone="success"] .title {
			color: var(--puresv-success);
		}

		.alert[data-tone="warning"] {
			border-inline-start-color: var(--puresv-warning);
			background-color: var(--puresv-warning-soft);
		}

		.alert[data-tone="warning"] .title {
			color: var(--puresv-warning);
		}

		.alert[data-tone="danger"] {
			border-inline-start-color: var(--puresv-danger);
			background-color: var(--puresv-danger-soft);
		}

		.alert[data-tone="danger"] .title {
			color: var(--puresv-danger);
		}
	}
</style>
