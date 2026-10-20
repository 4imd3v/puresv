<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";
	import { dismiss, pause, resume, toasts } from "../toast.svelte";

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "children"> {
		"aria-label"?: string;
	}

	let { "aria-label": label = "Notifications", class: className, ...rest }: Props = $props();
</script>

<section class={["toaster", className].filter(Boolean).join(" ")} aria-label={label} {...rest}>
	{#each toasts as item (item.id)}
		<div
			class="toast"
			data-tone={item.tone}
			role={item.tone === "danger" || item.tone === "warning" ? "alert" : "status"}
			onmouseenter={() => pause(item.id)}
			onmouseleave={() => resume(item.id)}
		>
			<span class="dot" aria-hidden="true"></span>
			<div class="content">
				<p class="title">{item.title}</p>
				{#if item.description}
					<p class="desc">{item.description}</p>
				{/if}
			</div>
			<button class="close" type="button" aria-label="Dismiss" onclick={() => dismiss(item.id)}>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<path
						d="M4 4l8 8M12 4l-8 8"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
					/>
				</svg>
			</button>
		</div>
	{/each}
</section>

<style>
	@layer puresv {
		/* Fixed to the bottom-end corner; pointer-events are off on the region so
		   it never blocks the page, and back on for each toast. */
		.toaster {
			position: fixed;
			inset-block-end: max(var(--puresv-space-4), env(safe-area-inset-bottom));
			inset-inline-end: var(--puresv-space-4);
			z-index: 40;
			display: flex;
			flex-direction: column;
			gap: var(--puresv-space-2);
			width: min(22rem, calc(100vw - 2 * var(--puresv-space-4)));
			pointer-events: none;
		}

		.toast {
			display: flex;
			align-items: flex-start;
			gap: var(--puresv-space-3);
			padding: var(--puresv-space-3) var(--puresv-space-4);
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-lg);
			background-color: var(--puresv-canvas);
			box-shadow: var(--puresv-shadow-lg);
			pointer-events: auto;
			transition:
				opacity 180ms var(--puresv-ease-out),
				transform 180ms var(--puresv-ease-out);
		}

		/* Entry only; a dismissed toast leaves immediately. Same technique as the
		   modal, and no JS transition to fight with reduced motion. */
		@starting-style {
			.toast {
				opacity: 0;
				transform: translateY(0.5rem);
			}
		}

		/* A tone dot, like Badge — no icon set to maintain. */
		.dot {
			flex-shrink: 0;
			width: 0.5rem;
			height: 0.5rem;
			margin-block-start: 0.375rem;
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-text-muted);
		}

		.toast[data-tone="info"] .dot {
			background-color: var(--puresv-accent);
		}

		.toast[data-tone="success"] .dot {
			background-color: var(--puresv-success);
		}

		.toast[data-tone="warning"] .dot {
			background-color: var(--puresv-warning);
		}

		.toast[data-tone="danger"] .dot {
			background-color: var(--puresv-danger);
		}

		.content {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: 0.125rem;
			min-width: 0;
		}

		.title {
			margin: 0;
			color: var(--puresv-text);
			font-size: var(--puresv-text-md);
			font-weight: var(--puresv-weight-semibold);
			letter-spacing: -0.01em;
			overflow-wrap: anywhere;
		}

		.desc {
			margin: 0;
			color: var(--puresv-text-muted);
			font-size: var(--puresv-text-sm);
			line-height: 1.5;
			overflow-wrap: anywhere;
		}

		.close {
			display: inline-flex;
			flex-shrink: 0;
			align-items: center;
			justify-content: center;
			width: 1.5rem;
			height: 1.5rem;
			margin-inline-end: calc(-1 * var(--puresv-space-2));
			border: 0;
			border-radius: var(--puresv-radius-sm);
			background: none;
			color: var(--puresv-text-muted);
			cursor: pointer;
			transition:
				background-color var(--puresv-duration) var(--puresv-ease-out),
				color var(--puresv-duration) var(--puresv-ease-out);
		}

		.close:hover {
			background-color: var(--puresv-surface-2);
			color: var(--puresv-text);
		}

		.close:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		.close svg {
			width: 0.875rem;
			height: 0.875rem;
		}

		@media (prefers-reduced-motion: reduce) {
			.toast,
			.close {
				transition-duration: 0.01ms;
			}
		}
	}
</style>
