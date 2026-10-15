<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Variant = "solid" | "outline" | "ghost";
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
			font-weight: 550;
			line-height: 1;
			white-space: nowrap;
			cursor: pointer;
			transition:
				background-color var(--puresv-duration) ease,
				border-color var(--puresv-duration) ease,
				color var(--puresv-duration) ease;
		}

		button[data-size="sm"] {
			height: 2rem;
			padding-inline: var(--puresv-space-3);
			font-size: var(--puresv-text-sm);
		}

		button[data-size="md"] {
			height: 2.5rem;
			padding-inline: var(--puresv-space-4);
			font-size: var(--puresv-text-sm);
		}

		button[data-size="lg"] {
			height: 3rem;
			padding-inline: var(--puresv-space-5);
			font-size: var(--puresv-text-md);
		}

		button[data-variant="solid"] {
			background-color: var(--puresv-accent);
			color: var(--puresv-on-accent);
		}

		button[data-variant="solid"]:hover:not(:disabled) {
			background-color: var(--puresv-accent-hover);
		}

		button[data-variant="outline"] {
			border-color: var(--puresv-border);
			background-color: transparent;
			color: var(--puresv-text);
		}

		button[data-variant="outline"]:hover:not(:disabled) {
			background-color: var(--puresv-surface);
		}

		button[data-variant="ghost"] {
			background-color: transparent;
			color: var(--puresv-text);
		}

		button[data-variant="ghost"]:hover:not(:disabled) {
			background-color: var(--puresv-surface);
		}

		button:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		button:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		@media (prefers-reduced-motion: reduce) {
			button {
				transition-duration: 0.01ms;
			}
		}
	}
</style>
