<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
		label?: string;
		value?: number;
		max?: number;
		readonly?: boolean;
	}

	let {
		label = "Rating",
		value = $bindable(0),
		max = 5,
		readonly = false,
		class: className,
		...rest
	}: Props = $props();

	const stars = $derived(Array.from({ length: Math.max(1, Math.trunc(max)) }, (_, i) => i + 1));
	// Hovering previews the score without committing it.
	let hover = $state(0);
	const filled = $derived(hover || value);

	// Touch fires mouseenter and leaves the preview stuck on the tapped star.
	const canHover = () =>
		typeof window === "undefined" || window.matchMedia("(hover: hover)").matches;

	function preview(star: number, on: boolean) {
		if (readonly || !canHover()) return;
		hover = on ? star : 0;
	}
</script>

<div
	class={["rating", className].filter(Boolean).join(" ")}
	role="radiogroup"
	aria-label={label}
	data-readonly={readonly || undefined}
	{...rest}
>
	{#each stars as star (star)}
		<label
			class="star"
			data-filled={star <= filled || undefined}
			onmouseenter={() => preview(star, true)}
			onmouseleave={() => preview(star, false)}
		>
			<input
				type="radio"
				bind:group={value}
				value={star}
				disabled={readonly}
				aria-label={`${star} star${star === 1 ? "" : "s"}`}
				onfocus={() => preview(star, true)}
				onblur={() => preview(star, false)}
			/>
			<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path
					d="M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L2.2 7.7l5.4-.8L10 2z"
				/>
			</svg>
		</label>
	{/each}
</div>

<style>
	@layer puresv {
		.rating {
			display: inline-flex;
			gap: 2px;
		}

		.star {
			position: relative;
			display: inline-flex;
			color: var(--puresv-border-strong);
			cursor: pointer;
			transition: color var(--puresv-duration) var(--puresv-ease-out);
		}

		.star[data-filled] {
			color: var(--puresv-primary);
		}

		.rating[data-readonly] .star {
			cursor: default;
		}

		/* Keep the native radio for keyboard and form semantics. */
		input {
			position: absolute;
			width: 1px;
			height: 1px;
			margin: 0;
			opacity: 0;
			pointer-events: none;
		}

		svg {
			display: block;
			width: 1.125rem;
			height: 1.125rem;
		}

		input:focus-visible + svg {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
			border-radius: var(--puresv-radius-sm);
		}
	}
</style>
