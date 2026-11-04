<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { Snippet } from "svelte";
	import { tick } from "svelte";

	interface Tab {
		id: string;
		label: string;
	}

	interface Props {
		tabs: Tab[];
		active?: string;
		panel: Snippet<[string]>;
	}

	let { tabs, active = $bindable(tabs[0]?.id ?? ""), panel }: Props = $props();

	// Prefix the ids so two Tabs on one page do not collide.
	const uid = $props.id();

	let tablist = $state<HTMLDivElement | null>(null);

	async function onKeydown(event: KeyboardEvent) {
		const index = tabs.findIndex((t) => t.id === active);
		let next = index;
		if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
		else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
			next = (index - 1 + tabs.length) % tabs.length;
		else if (event.key === "Home") next = 0;
		else if (event.key === "End") next = tabs.length - 1;
		else return;
		event.preventDefault();
		active = tabs[next]?.id ?? active;
		await tick();
		tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
	}
</script>

<div
	class="tabs"
	role="tablist"
	tabindex={-1}
	bind:this={tablist}
	onkeydown={onKeydown}
>
	{#each tabs as tab (tab.id)}
		<button
			type="button"
			role="tab"
			id={`${uid}-tab-${tab.id}`}
			class="tab"
			aria-selected={active === tab.id}
			aria-controls={`${uid}-panel-${tab.id}`}
			tabindex={active === tab.id ? 0 : -1}
			onclick={() => (active = tab.id)}
		>
			{tab.label}
		</button>
	{/each}
</div>

<div
	class="panel"
	role="tabpanel"
	id={`${uid}-panel-${active}`}
	aria-labelledby={`${uid}-tab-${active}`}
	tabindex={0}
>
	{#key active}
		<div class="panel-content">
			{@render panel(active)}
		</div>
	{/key}
</div>

<style>
	@layer puresv {
		.tabs {
			display: flex;
			gap: var(--puresv-space-1);
			border-bottom: 1px solid var(--puresv-border);
		}

		.tab {
			position: relative;
			padding: var(--puresv-space-2) var(--puresv-space-3);
			border: 0;
			border-radius: var(--puresv-radius-sm);
			background: none;
			color: var(--puresv-text-muted);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-md);
			font-weight: var(--puresv-weight-medium);
			letter-spacing: -0.005em;
			cursor: pointer;
			transition: color var(--puresv-duration) var(--puresv-ease-out);
		}

		@media (hover: hover) {
			.tab:hover {
				color: var(--puresv-text);
			}
		}

		.tab[aria-selected="true"] {
			color: var(--puresv-text);
		}

		/* The indicator grows out of the centre instead of popping in — cheap to
		   animate (transform only) and it makes switching tabs feel deliberate. */
		.tab::after {
			content: "";
			position: absolute;
			right: var(--puresv-space-2);
			bottom: -1px;
			left: var(--puresv-space-2);
			height: 2px;
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-text);
			transform: scaleX(0);
			transition: transform var(--puresv-duration) var(--puresv-ease-out);
		}

		.tab[aria-selected="true"]::after {
			transform: scaleX(1);
		}

		.tab:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: -2px;
		}

		.panel {
			padding-block-start: var(--puresv-space-4);
		}

		/* The incoming panel fades in; the old one is gone at once. Opacity
		   only — a panel swap is a content change, not an entrance. */
		.panel-content {
			transition: opacity var(--puresv-duration) var(--puresv-ease-out);
		}

		@starting-style {
			.panel-content {
				opacity: 0;
			}
		}

		.panel:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
			border-radius: var(--puresv-radius-sm);
		}
	}
</style>
