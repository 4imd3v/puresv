<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Variant = "solid" | "soft" | "outline" | "ghost" | "link";
	type Size = "sm" | "md" | "lg";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		variant?: Variant;
		size?: Size;
		children: import("svelte").Snippet;
	}

	let { variant = "solid", size = "md", children, ...rest }: Props = $props();
</script>

<button {...rest} data-variant={variant} data-size={size}>
	{@render children()}
</button>

<style>
	@layer puresv {
		button {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: var(--puresv-space-2);
			border: 1px solid transparent;
			border-radius: var(--puresv-radius-md);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-sm);
			font-weight: 550;
			line-height: 1;
			letter-spacing: -0.01em;
			white-space: nowrap;
			cursor: pointer;
			user-select: none;
			touch-action: manipulation;
			-webkit-tap-highlight-color: transparent;
			transition:
				background-color var(--puresv-duration) var(--puresv-ease-out),
				border-color var(--puresv-duration) var(--puresv-ease-out),
				color var(--puresv-duration) var(--puresv-ease-out),
				box-shadow var(--puresv-duration) var(--puresv-ease-out),
				transform var(--puresv-duration) var(--puresv-ease-out);
		}

		/* Sizes */
		button[data-size="sm"] {
			height: 2rem;
			padding-inline: var(--puresv-space-3);
		}

		button[data-size="md"] {
			height: 2.5rem;
			padding-inline: var(--puresv-space-4);
		}

		button[data-size="lg"] {
			height: 3rem;
			padding-inline: var(--puresv-space-5);
			font-size: var(--puresv-text-md);
		}

		/* Solid — the primary action. Lifts on hover, presses down on click. */
		button[data-variant="solid"] {
			background-color: var(--puresv-accent);
			color: var(--puresv-on-accent);
			box-shadow: var(--puresv-shadow-accent);
		}

		button[data-variant="solid"]:hover:not(:disabled) {
			background-color: var(--puresv-accent-hover);
			box-shadow: var(--puresv-shadow-accent-hover);
			transform: translateY(-1px);
		}

		button[data-variant="solid"]:active:not(:disabled) {
			transform: translateY(0) scale(0.985);
			box-shadow: var(--puresv-shadow-accent);
		}

		/* Soft — tinted, for the common action next to a solid one. */
		button[data-variant="soft"] {
			background-color: var(--puresv-accent-soft);
			color: var(--puresv-accent);
		}

		button[data-variant="soft"]:hover:not(:disabled) {
			background-color: var(--puresv-accent-soft-hover);
		}

		button[data-variant="soft"]:active:not(:disabled) {
			transform: scale(0.985);
		}

		/* Outline — quiet but present. */
		button[data-variant="outline"] {
			border-color: var(--puresv-border);
			background-color: transparent;
			color: var(--puresv-text);
		}

		button[data-variant="outline"]:hover:not(:disabled) {
			border-color: var(--puresv-border-strong);
			background-color: var(--puresv-surface);
		}

		button[data-variant="outline"]:active:not(:disabled) {
			transform: scale(0.985);
		}

		/* Ghost — for toolbars and dense rows. */
		button[data-variant="ghost"] {
			background-color: transparent;
			color: var(--puresv-text);
		}

		button[data-variant="ghost"]:hover:not(:disabled) {
			background-color: var(--puresv-surface);
		}

		button[data-variant="ghost"]:active:not(:disabled) {
			transform: scale(0.985);
		}

		/* Link — text only. Declared after the size rules so it can shed them. */
		button[data-variant="link"] {
			height: auto;
			padding-inline: 0;
			border: 0;
			background: none;
			color: var(--puresv-accent);
			text-decoration: underline;
			text-decoration-color: var(--puresv-accent-ring);
			text-decoration-thickness: 1px;
			text-underline-offset: 0.25em;
		}

		button[data-variant="link"]:hover:not(:disabled) {
			text-decoration-color: currentColor;
		}

		/* States shared by every variant. */
		button:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		button:disabled {
			opacity: 0.55;
			box-shadow: none;
			cursor: not-allowed;
			transform: none;
		}

		@media (prefers-reduced-motion: reduce) {
			button {
				transition-duration: 0.01ms;
			}

			button:active:not(:disabled) {
				transform: none;
			}
		}
	}
</style>
