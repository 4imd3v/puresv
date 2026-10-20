<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLAttributes<HTMLDialogElement>, "children"> {
		open?: boolean;
		title?: string;
		children: Snippet;
	}

	let {
		open = $bindable(false),
		title,
		class: className,
		"aria-labelledby": labelledBy,
		children,
		...rest
	}: Props = $props();

	// Link the heading to the dialog so screen readers announce it on open.
	const uid = $props.id();
	const titleId = `${uid}-title`;
	const labelledByValue = $derived(title ? titleId : labelledBy);

	let dialog = $state<HTMLDialogElement | null>(null);

	// Drive the native dialog from the bound open state.
	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open && typeof dialog.showModal === "function") dialog.showModal();
		else if (!open && dialog.open && typeof dialog.close === "function") dialog.close();
	});

	// Escape and the close button both fire close; keep the prop in sync.
	function onClose() {
		open = false;
	}

	// A click that lands on the dialog itself (not the panel) is a backdrop click.
	function onBackdropClick(event: MouseEvent) {
		if (event.target === dialog) open = false;
	}
</script>

<dialog
	bind:this={dialog}
	class={["modal", className].filter(Boolean).join(" ")}
	{...rest}
	aria-labelledby={labelledByValue}
	onclose={onClose}
	onclick={onBackdropClick}
>
	<div class="panel">
		<header class="head">
			{#if title}<h2 class="title" id={titleId}>{title}</h2>{/if}
			<button class="close" type="button" aria-label="Close" onclick={() => (open = false)}>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
				</svg>
			</button>
		</header>
		<div class="body">{@render children()}</div>
	</div>
</dialog>

<style>
	@layer puresv {
		.modal {
			max-width: min(32rem, calc(100% - 2 * var(--puresv-space-6)));
			max-height: calc(100% - 2 * var(--puresv-space-6));
			padding: 0;
			border: 0;
			color: var(--puresv-text);
			background: none;
			opacity: 0;
			transform: scale(0.96);
			transition:
				opacity 200ms var(--puresv-ease-out),
				transform 200ms var(--puresv-ease-out),
				display 200ms allow-discrete,
				overlay 200ms allow-discrete;
		}

		.modal[open] {
			opacity: 1;
			transform: scale(1);
		}

		@starting-style {
			.modal[open] {
				opacity: 0;
				transform: scale(0.96);
			}
		}

		.modal::backdrop {
			background-color: var(--puresv-scrim);
			backdrop-filter: blur(2px);
			opacity: 1;
			transition:
				opacity 200ms var(--puresv-ease-out),
				display 200ms allow-discrete,
				overlay 200ms allow-discrete;
		}

		@starting-style {
			.modal::backdrop {
				opacity: 0;
			}
		}

		/* The dialog caps the height, so the panel inherits it and the body
		   scrolls instead of overflowing the viewport. */
		.panel {
			display: flex;
			flex-direction: column;
			max-height: inherit;
			overflow: hidden;
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-lg);
			background-color: var(--puresv-canvas);
			box-shadow: var(--puresv-shadow-lg);
		}

		.head {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: var(--puresv-space-4);
			padding: var(--puresv-space-4);
			border-bottom: 1px solid var(--puresv-border);
		}

		.title {
			margin: 0;
			font-size: var(--puresv-text-lg);
			font-weight: var(--puresv-weight-semibold);
			letter-spacing: -0.01em;
		}

		.close {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			width: 2rem;
			height: 2rem;
			margin-inline-start: auto;
			border: 0;
			border-radius: var(--puresv-radius-md);
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
			width: 1rem;
			height: 1rem;
		}

		.body {
			min-height: 0;
			padding: var(--puresv-space-4);
			overflow-y: auto;
			font-size: var(--puresv-text-sm);
			line-height: 1.6;
		}

		@media (prefers-reduced-motion: reduce) {
			.modal,
			.modal::backdrop {
				transition-duration: 0.01ms;
			}
		}
	}
</style>
