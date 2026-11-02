<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "children"> {
		header?: Snippet;
		footer?: Snippet;
		href?: string;
		children: Snippet;
	}

	let { header, footer, href, children, ...rest }: Props = $props();
</script>

{#snippet card()}
	{#if header}
		<header>{@render header()}</header>
	{/if}
	<div data-part="body">{@render children()}</div>
	{#if footer}
		<footer>{@render footer()}</footer>
	{/if}
{/snippet}

{#if href}
	<a {href} {...rest} data-card>{@render card()}</a>
{:else}
	<div {...rest} data-card>{@render card()}</div>
{/if}

<style>
	@layer puresv {
		/* A card is defined by its border and a hairline top highlight — not a
		   fuzzy drop shadow. Canvas background keeps it crisp against the page. */
		[data-card] {
			display: flex;
			flex-direction: column;
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-lg);
			background-color: var(--puresv-canvas);
			box-shadow: inset 0 1px 0 var(--puresv-inset-hl);
		}

		/* An href turns the whole card into a link, so it reads as interactive. */
		a {
			color: inherit;
			text-decoration: none;
			transition:
				border-color var(--puresv-duration) var(--puresv-ease-out),
				background-color var(--puresv-duration) var(--puresv-ease-out);
		}

		@media (hover: hover) {
			a:hover {
				border-color: var(--puresv-border-strong);
			}
		}

		a:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		header,
		footer {
			padding: var(--puresv-space-4);
		}

		header {
			border-bottom: 1px solid var(--puresv-border);
			font-size: var(--puresv-text-lg);
			font-weight: var(--puresv-weight-semibold);
			letter-spacing: -0.01em;
		}

		footer {
			border-top: 1px solid var(--puresv-border);
			color: var(--puresv-text-muted);
			font-size: var(--puresv-text-sm);
		}

		[data-part="body"] {
			padding: var(--puresv-space-4);
		}
	}
</style>
