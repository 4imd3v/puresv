<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Placement = "top" | "bottom";

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
		label: string;
		placement?: Placement;
		/** Receives the descriptor props for the trigger element. */
		trigger: Snippet<[{ "aria-describedby": string }]>;
	}

	let { label, placement = "top", trigger, class: className, ...rest }: Props = $props();

	const uid = $props.id();
	const tooltipId = `${uid}-tooltip`;
</script>

<span class={["tooltip", className].filter(Boolean).join(" ")} data-placement={placement} {...rest}>
	{@render trigger({ "aria-describedby": tooltipId })}
	<span class="bubble" role="tooltip" id={tooltipId}>{label}</span>
</span>

<style>
	@layer puresv {
		.tooltip {
			position: relative;
			display: inline-flex;
		}

		/* Inverse of the page — the same ink surface as a solid Button, so the
		   tooltip reads as chrome rather than another card. */
		.bubble {
			position: absolute;
			left: 50%;
			z-index: 30;
			width: max-content;
			max-width: 16rem;
			padding: 0.25rem var(--puresv-space-2);
			border-radius: var(--puresv-radius-md);
			background-color: var(--puresv-primary);
			box-shadow: var(--puresv-shadow-md);
			color: var(--puresv-on-primary);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-xs);
			font-weight: var(--puresv-weight-medium);
			line-height: 1.4;
			text-align: center;
			pointer-events: none;
			opacity: 0;
			visibility: hidden;
			transition:
				opacity 120ms var(--puresv-ease-out),
				transform 120ms var(--puresv-ease-out),
				visibility 120ms;
		}

		.tooltip[data-placement="top"] .bubble {
			bottom: calc(100% + 0.375rem);
			transform: translateX(-50%) translateY(0.125rem);
		}

		.tooltip[data-placement="bottom"] .bubble {
			top: calc(100% + 0.375rem);
			transform: translateX(-50%) translateY(-0.125rem);
		}

		/* The arrow inherits the bubble surface, so it follows the theme. */
		.bubble::after {
			content: "";
			position: absolute;
			left: 50%;
			width: 0.375rem;
			height: 0.375rem;
			background-color: inherit;
			transform: translateX(-50%) rotate(45deg);
		}

		[data-placement="top"] .bubble::after {
			bottom: -0.1875rem;
		}

		[data-placement="bottom"] .bubble::after {
			top: -0.1875rem;
		}

		/* Hover for pointers, focus-within for the keyboard. */
		.tooltip:hover .bubble,
		.tooltip:focus-within .bubble {
			opacity: 1;
			visibility: visible;
			transform: translateX(-50%) translateY(0);
		}

		@media (prefers-reduced-motion: reduce) {
			.bubble {
				transition-duration: 0.01ms;
			}
		}
	}
</style>
