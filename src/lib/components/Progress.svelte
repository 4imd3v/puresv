<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		value?: number;
		max?: number;
		label?: string;
	}

	let { value = 0, max = 100, label, class: className, ...rest }: Props = $props();

	let clamped = $derived(Math.min(Math.max(value, 0), max));
	let fraction = $derived(max > 0 ? clamped / max : 0);
</script>

<div
	class={["progress", className].filter(Boolean).join(" ")}
	role="progressbar"
	aria-valuenow={clamped}
	aria-valuemin={0}
	aria-valuemax={max}
	aria-label={label}
	{...rest}
>
	<div class="fill" style:transform={"scaleX(" + fraction + ")"}></div>
</div>

<style>
	@layer puresv {
		.progress {
			width: 100%;
			height: 0.5rem;
			overflow: hidden;
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-surface);
		}

		/* Rectangular fill scaled on the compositor; the track's radius clips it to a pill. */
		.fill {
			width: 100%;
			height: 100%;
			background-color: var(--puresv-accent);
			transform-origin: left center;
			transition: transform var(--puresv-duration) var(--puresv-ease-out);
		}

		@media (prefers-reduced-motion: reduce) {
			.fill {
				transition-duration: 0.01ms;
			}
		}
	}
</style>
