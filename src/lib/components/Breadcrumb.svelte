<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";

	interface Item {
		label: string;
		href?: string;
	}

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "children"> {
		items: Item[];
	}

	let { items, "aria-label": label = "Breadcrumb", class: className, ...rest }: Props = $props();
</script>

<nav class={["breadcrumb", className].filter(Boolean).join(" ")} aria-label={label} {...rest}>
	<ol>
		{#each items as item, index (index)}
			<li>
				{#if item.href && index < items.length - 1}
					<a href={item.href}>{item.label}</a>
				{:else}
					<span aria-current={index === items.length - 1 ? "page" : undefined}>
						{item.label}
					</span>
				{/if}
				{#if index < items.length - 1}
					<svg class="sep" viewBox="0 0 16 16" fill="none" aria-hidden="true">
						<path
							d="M6 3.5l4.5 4.5L6 12.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	@layer puresv {
		.breadcrumb ol {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: var(--puresv-space-2);
			margin: 0;
			padding: 0;
			list-style: none;
			font-size: var(--puresv-text-sm);
			line-height: 1.4;
		}

		li {
			display: inline-flex;
			align-items: center;
			gap: var(--puresv-space-2);
			min-width: 0;
		}

		a {
			border-radius: var(--puresv-radius-sm);
			color: var(--puresv-text-muted);
			text-decoration: none;
			transition: color var(--puresv-duration) var(--puresv-ease-out);
		}

		@media (hover: hover) {
			a:hover {
				color: var(--puresv-text);
			}
		}

		a:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		/* The current page is the only item with full-strength text. */
		span[aria-current="page"] {
			color: var(--puresv-text);
			font-weight: var(--puresv-weight-medium);
		}

		span {
			overflow: hidden;
			color: var(--puresv-text-muted);
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.sep {
			flex-shrink: 0;
			width: 0.75rem;
			height: 0.75rem;
			color: var(--puresv-border-strong);
		}
	}
</style>
