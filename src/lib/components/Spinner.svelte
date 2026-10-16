<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";

	type Size = "sm" | "md" | "lg";

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		size?: Size;
		label?: string;
	}

	let { size = "md", label = "Loading", ...rest }: Props = $props();
</script>

<span class="spinner" data-size={size} role="status" aria-label={label} {...rest}></span>

<style>
	@layer puresv {
		.spinner {
			display: inline-block;
			box-sizing: border-box;
			border: 2px solid var(--puresv-accent-soft);
			border-top-color: var(--puresv-accent);
			border-radius: var(--puresv-radius-full);
			animation: puresv-spin 0.6s linear infinite;
		}

		.spinner[data-size="sm"] {
			width: 1rem;
			height: 1rem;
		}

		.spinner[data-size="md"] {
			width: 1.5rem;
			height: 1.5rem;
		}

		.spinner[data-size="lg"] {
			width: 2rem;
			height: 2rem;
			border-width: 3px;
		}

		@keyframes puresv-spin {
			to {
				transform: rotate(360deg);
			}
		}

		/* A spinner is essential feedback, so keep it moving but slow it down. */
		@media (prefers-reduced-motion: reduce) {
			.spinner {
				animation-duration: 1.5s;
			}
		}
	}
</style>
