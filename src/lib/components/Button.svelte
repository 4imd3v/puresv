<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	type Variant = "solid" | "soft" | "outline" | "ghost" | "link";
	type Size = "sm" | "md" | "lg";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		variant?: Variant;
		size?: Size;
		/** Renders an <a> instead of a <button>. */
		href?: string;
		children: Snippet;
	}

	let { variant = "solid", size = "md", href, class: className, children, ...rest }: Props =
		$props();

	// An anchor takes the same presentational props; the cast only satisfies the
	// element-specific typing of the spread.
	const linkProps = $derived(rest as unknown as HTMLAnchorAttributes);
	const classes = $derived(["button", className].filter(Boolean).join(" "));
</script>

{#snippet content()}
	{@render children()}
{/snippet}

{#if href}
	<a {href} {...linkProps} class={classes} data-variant={variant} data-size={size}>
		{@render content()}
	</a>
{:else}
	<button {...rest} class={classes} data-variant={variant} data-size={size}>
		{@render content()}
	</button>
{/if}

<style>
	@layer puresv {
		.button {
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: var(--puresv-space-2);
			border: 1px solid transparent;
			border-radius: var(--puresv-radius-md);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-md);
			font-weight: var(--puresv-weight-medium);
			line-height: 1;
			letter-spacing: -0.01em;
			text-decoration: none;
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
		.button[data-size="sm"] {
			height: 2rem;
			padding-inline: var(--puresv-space-3);
		}

		/* md matches --puresv-control-height, so it sits flush beside a field. */
		.button[data-size="md"] {
			height: var(--puresv-control-height);
			padding-inline: var(--puresv-space-4);
		}

		.button[data-size="lg"] {
			height: 3rem;
			padding-inline: var(--puresv-space-5);
			font-size: var(--puresv-text-lg);
		}

		/* Solid — the primary action. A near-black fill, quiet hover, and a
		   quick press-scale for tactile feedback. No lift, no colored glow. */
		.button[data-variant="solid"] {
			background-color: var(--puresv-primary);
			color: var(--puresv-on-primary);
		}

		.button[data-variant="solid"]:active:not(:disabled) {
			transform: scale(0.97);
		}

		/* Soft — tinted, for the common action next to a solid one. The text uses
		   the deeper accent-hover blue so it clears WCAG AA on the tint. */
		.button[data-variant="soft"] {
			background-color: var(--puresv-accent-soft);
			color: var(--puresv-accent-hover);
		}

		.button[data-variant="soft"]:active:not(:disabled) {
			transform: scale(0.97);
		}

		/* Outline — quiet but present. */
		.button[data-variant="outline"] {
			border-color: var(--puresv-border);
			background-color: transparent;
			color: var(--puresv-text);
		}

		.button[data-variant="outline"]:active:not(:disabled) {
			transform: scale(0.97);
		}

		/* Ghost — for toolbars and dense rows. */
		.button[data-variant="ghost"] {
			background-color: transparent;
			color: var(--puresv-text);
		}

		.button[data-variant="ghost"]:active:not(:disabled) {
			transform: scale(0.97);
		}

		/* Link — text only. Declared after the size rules so it can shed them. */
		.button[data-variant="link"] {
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

		/* Hover is pointer-only: on touch it fires and then sticks after the tap. */
		@media (hover: hover) {
			.button[data-variant="solid"]:hover:not(:disabled) {
				background-color: var(--puresv-primary-hover);
			}

			.button[data-variant="soft"]:hover:not(:disabled) {
				background-color: var(--puresv-accent-soft-hover);
			}

			.button[data-variant="outline"]:hover:not(:disabled) {
				border-color: var(--puresv-border-strong);
				background-color: var(--puresv-surface);
			}

			.button[data-variant="ghost"]:hover:not(:disabled) {
				background-color: var(--puresv-surface-2);
			}

			.button[data-variant="link"]:hover:not(:disabled) {
				text-decoration-color: currentColor;
			}
		}

		/* States shared by every variant. */
		.button:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		.button:disabled,
		.button[aria-disabled="true"] {
			opacity: 0.55;
			box-shadow: none;
			cursor: not-allowed;
			transform: none;
		}
	}
</style>
