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
	let defaultRole = $derived(tone === "danger" || tone === "warning" ? "alert" : "status");
</script>

{#snippet icon()}
	{#if tone === "success"}
		<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
				clip-rule="evenodd"
			/>
		</svg>
	{:else if tone === "warning"}
		<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M8.5 3.5A1.5 1.5 0 0110 2.2l6 10.4a1.5 1.5 0 01-1.3 2.2H5.3a1.5 1.5 0 01-1.3-2.2l6-10.4a1.5 1.5 0 011.3-.7zM10 7a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 0110 7zm0 6.5a.9.9 0 100-1.8.9.9 0 000 1.8z"
				clip-rule="evenodd"
			/>
		</svg>
	{:else if tone === "danger"}
		<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.5-9.2a1 1 0 00-1.4-1.4L10 8.6 8.9 7.4a1 1 0 10-1.4 1.4L8.6 10l-1.2 1.1a1 1 0 101.4 1.4L10 11.4l1.1 1.2a1 1 0 001.4-1.4L11.4 10l1.1-1.2z"
				clip-rule="evenodd"
			/>
		</svg>
	{:else}
		<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-5.5a.9.9 0 100-1.8.9.9 0 000 1.8zM8.8 6.6a1.2 1.2 0 012.4 0v4.6a1.2 1.2 0 01-2.4 0V6.6z"
				clip-rule="evenodd"
			/>
		</svg>
	{/if}
{/snippet}

<div
	class={["alert", className].filter(Boolean).join(" ")}
	{...rest}
	role={role ?? defaultRole}
	data-tone={tone}
>
	<span class="icon">{@render icon()}</span>
	<div class="content">
		{#if title}
			<strong class="title">{title}</strong>
		{/if}
		<div class="body">{@render children()}</div>
	</div>
</div>

<style>
	@layer puresv {
		/* A tinted surface with a matching hairline border and a leading icon —
		   no harsh left stripe. The icon carries the tone, so the whole block
		   stays quiet. */
		.alert {
			display: flex;
			gap: var(--puresv-space-3);
			padding: var(--puresv-space-3) var(--puresv-space-4);
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-md);
			background-color: var(--puresv-accent-soft);
		}

		.icon {
			flex-shrink: 0;
			width: 1.125rem;
			height: 1.125rem;
			margin-block-start: 0.0625rem;
			color: var(--puresv-accent);
		}

		.icon svg {
			display: block;
			width: 100%;
			height: 100%;
		}

		.content {
			display: flex;
			flex-direction: column;
			gap: var(--puresv-space-1);
			min-width: 0;
		}

		.title {
			font-size: var(--puresv-text-md);
			font-weight: var(--puresv-weight-semibold);
			color: var(--puresv-text);
			letter-spacing: -0.01em;
		}

		.body {
			font-size: var(--puresv-text-md);
			line-height: 1.55;
			color: var(--puresv-text-muted);
		}

		.alert[data-tone="success"] {
			border-color: color-mix(in oklab, var(--puresv-success) 24%, var(--puresv-border));
			background-color: var(--puresv-success-soft);
		}

		.alert[data-tone="success"] .icon {
			color: var(--puresv-success);
		}

		.alert[data-tone="warning"] {
			border-color: color-mix(in oklab, var(--puresv-warning) 24%, var(--puresv-border));
			background-color: var(--puresv-warning-soft);
		}

		.alert[data-tone="warning"] .icon {
			color: var(--puresv-warning);
		}

		.alert[data-tone="danger"] {
			border-color: color-mix(in oklab, var(--puresv-danger) 24%, var(--puresv-border));
			background-color: var(--puresv-danger-soft);
		}

		.alert[data-tone="danger"] .icon {
			color: var(--puresv-danger);
		}
	}
</style>
