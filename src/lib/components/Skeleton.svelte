<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		width?: string;
		height?: string;
		circle?: boolean;
	}

	let { width = "100%", height = "1rem", circle = false, class: className, ...rest }: Props =
		$props();
</script>

<div
	class={["skeleton", circle && "circle", className].filter(Boolean).join(" ")}
	style:width
	style:height
	aria-hidden="true"
	{...rest}
></div>

<style>
	@layer puresv {
		.skeleton {
			border-radius: var(--puresv-radius-sm);
			background-color: var(--puresv-surface);
			animation: puresv-pulse 1.4s var(--puresv-ease) infinite;
		}

		.skeleton.circle {
			border-radius: var(--puresv-radius-full);
		}

		@keyframes puresv-pulse {
			0%,
			100% {
				opacity: 1;
			}
			50% {
				opacity: 0.5;
			}
		}

		/* A still placeholder at reduced opacity reads as "loading" without motion. */
		@media (prefers-reduced-motion: reduce) {
			.skeleton {
				animation: none;
				opacity: 0.6;
			}
		}
	}
</style>
