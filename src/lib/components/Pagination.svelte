<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "children"> {
		page?: number;
		pages: number;
	}

	let { page = $bindable(1), pages, class: className, ...rest }: Props = $props();

	const total = $derived(Math.max(1, Math.trunc(pages)));
	const current = $derived(Math.min(Math.max(Math.trunc(page), 1), total));

	// First, last and the current page's neighbours; null is a gap.
	const numbers = $derived.by(() => {
		const wanted = new Set([1, total, current - 1, current, current + 1]);
		const shown = [...wanted].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
		const out: (number | null)[] = [];
		shown.forEach((n, index) => {
			if (index > 0 && n - (shown[index - 1] ?? n) > 1) out.push(null);
			out.push(n);
		});
		return out;
	});

	function go(next: number) {
		page = Math.min(Math.max(next, 1), total);
	}
</script>

{#if total > 1}
	<nav class={["pagination", className].filter(Boolean).join(" ")} aria-label="Pagination" {...rest}>
		<button
			class="step"
			type="button"
			aria-label="Previous page"
			disabled={current <= 1}
			onclick={() => go(current - 1)}
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<path
					d="M10 3.5L5.5 8l4.5 4.5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>

		{#each numbers as n, index (n ?? `gap-${index}`)}
			{#if n === null}
				<span class="gap" aria-hidden="true">…</span>
			{:else}
				<button
					class="page"
					type="button"
					aria-label={`Page ${n}`}
					aria-current={n === current ? "page" : undefined}
					onclick={() => go(n)}
				>
					{n}
				</button>
			{/if}
		{/each}

		<button
			class="step"
			type="button"
			aria-label="Next page"
			disabled={current >= total}
			onclick={() => go(current + 1)}
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<path
					d="M6 3.5L10.5 8 6 12.5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</nav>
{/if}

<style>
	@layer puresv {
		.pagination {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: var(--puresv-space-1);
		}

		button {
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			min-width: var(--puresv-control-height);
			height: var(--puresv-control-height);
			padding-inline: var(--puresv-space-2);
			border: 1px solid transparent;
			border-radius: var(--puresv-radius-md);
			background: none;
			color: var(--puresv-text-muted);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-md);
			font-weight: var(--puresv-weight-medium);
			font-variant-numeric: tabular-nums;
			cursor: pointer;
			transition:
				background-color var(--puresv-duration) var(--puresv-ease-out),
				color var(--puresv-duration) var(--puresv-ease-out),
				transform var(--puresv-duration) var(--puresv-ease-out);
		}

		button:active:not(:disabled) {
			transform: scale(0.97);
		}

		@media (hover: hover) {
			button:hover:not(:disabled) {
				background-color: var(--puresv-surface-2);
				color: var(--puresv-text);
			}
		}

		button:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		/* The current page is the only ink-filled control, mirroring Button. */
		.page[aria-current="page"] {
			background-color: var(--puresv-primary);
			color: var(--puresv-on-primary);
		}

		@media (hover: hover) {
			.page[aria-current="page"]:hover {
				background-color: var(--puresv-primary-hover);
				color: var(--puresv-on-primary);
			}
		}

		.step:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}

		.step svg {
			width: 1rem;
			height: 1rem;
		}

		.gap {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			min-width: var(--puresv-space-5);
			color: var(--puresv-text-muted);
		}
	}
</style>
