<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import { tick } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Item {
		id: string;
		label: string;
		href?: string;
		disabled?: boolean;
	}

	interface TriggerProps {
		onclick: (event: MouseEvent) => void;
		onkeydown: (event: KeyboardEvent) => void;
		"aria-haspopup": "menu";
		"aria-expanded": boolean;
	}

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
		items: Item[];
		open?: boolean;
		align?: "start" | "end";
		/** Accessible name for the menu; the trigger is a separate element. */
		label?: string;
		onSelect?: (id: string) => void;
		trigger: Snippet<[TriggerProps]>;
	}

	let {
		items,
		open = $bindable(false),
		align = "start",
		label,
		onSelect,
		trigger,
		class: className,
		...rest
	}: Props = $props();

	let wrapper = $state<HTMLDivElement | null>(null);
	let menu = $state<HTMLDivElement | null>(null);

	function triggerElement() {
		return wrapper?.querySelector<HTMLElement>('[aria-haspopup="menu"]') ?? null;
	}

	function menuItemElements() {
		return [...(menu?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? [])];
	}

	async function openAndFocus() {
		open = true;
		await tick();
		menuItemElements()[0]?.focus();
	}

	async function close(focusTrigger = true) {
		open = false;
		if (!focusTrigger) return;
		await tick();
		triggerElement()?.focus();
	}

	function onTriggerClick() {
		if (open) close();
		else openAndFocus();
	}

	function onTriggerKeydown(event: KeyboardEvent) {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			openAndFocus();
		} else if (event.key === "Escape" && open) {
			event.preventDefault();
			close();
		}
	}

	// Move focus through the menu; Escape and Tab close it.
	function onMenuKeydown(event: KeyboardEvent) {
		const elements = menuItemElements();
		const index = elements.indexOf(document.activeElement as HTMLElement);
		if (event.key === "ArrowDown") {
			event.preventDefault();
			elements[(index + 1) % elements.length]?.focus();
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			elements[(index - 1 + elements.length) % elements.length]?.focus();
		} else if (event.key === "Home") {
			event.preventDefault();
			elements[0]?.focus();
		} else if (event.key === "End") {
			event.preventDefault();
			elements[elements.length - 1]?.focus();
		} else if (event.key === "Escape") {
			event.preventDefault();
			close();
		} else if (event.key === "Tab") {
			close();
		}
	}

	function choose(item: Item, event: MouseEvent) {
		if (item.disabled) {
			event.preventDefault();
			return;
		}
		onSelect?.(item.id);
		close();
	}

	// A pointer press anywhere else dismisses the menu.
	$effect(() => {
		if (!open) return;
		function onPointerDown(event: PointerEvent) {
			if (!wrapper?.contains(event.target as Node)) close(false);
		}
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	});
</script>

<div
	class={["dropdown", className].filter(Boolean).join(" ")}
	data-align={align}
	bind:this={wrapper}
	{...rest}
>
	{@render trigger({
		onclick: onTriggerClick,
		onkeydown: onTriggerKeydown,
		"aria-haspopup": "menu",
		"aria-expanded": open,
	})}

	{#if open}
		<div
			class="menu"
			role="menu"
			aria-label={label}
			tabindex={-1}
			bind:this={menu}
			onkeydown={onMenuKeydown}
		>
			{#each items as item (item.id)}
				{#if item.href}
					<a
						class="item"
						role="menuitem"
						href={item.href}
						tabindex={-1}
						aria-disabled={item.disabled || undefined}
						onclick={(event) => choose(item, event)}
					>
						{item.label}
					</a>
				{:else}
					<button
						class="item"
						type="button"
						role="menuitem"
						tabindex={-1}
						disabled={item.disabled}
						aria-disabled={item.disabled || undefined}
						onclick={(event) => choose(item, event)}
					>
						{item.label}
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	@layer puresv {
		.dropdown {
			position: relative;
			display: inline-flex;
		}

		.menu {
			position: absolute;
			z-index: 30;
			top: calc(100% + var(--puresv-space-1));
			display: flex;
			flex-direction: column;
			min-width: 12rem;
			max-height: 15rem;
			padding: var(--puresv-space-1);
			overflow-y: auto;
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-md);
			background-color: var(--puresv-canvas);
			box-shadow: var(--puresv-shadow-lg);
			transform-origin: top;
			transition:
				opacity var(--puresv-duration) var(--puresv-ease-out),
				transform var(--puresv-duration) var(--puresv-ease-out);
		}

		.dropdown[data-align="start"] .menu {
			inset-inline-start: 0;
		}

		.dropdown[data-align="end"] .menu {
			inset-inline-end: 0;
			transform-origin: top right;
		}

		@starting-style {
			.menu {
				opacity: 0;
				transform: translateY(-0.25rem) scale(0.98);
			}
		}

		.item {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			width: 100%;
			padding: var(--puresv-space-2) var(--puresv-space-3);
			border: 0;
			border-radius: var(--puresv-radius-sm);
			background: none;
			color: var(--puresv-text);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-md);
			font-weight: var(--puresv-weight-normal);
			line-height: 1.4;
			text-align: start;
			text-decoration: none;
			cursor: pointer;
		}

		.item:focus-visible {
			outline: none;
			background-color: var(--puresv-surface-2);
		}

		@media (hover: hover) {
			.item:hover:not(:disabled) {
				outline: none;
				background-color: var(--puresv-surface-2);
			}
		}

		/* The ring must clear 3:1, so it uses the full accent, not the soft ring. */
		.item:focus-visible {
			box-shadow: inset 0 0 0 2px var(--puresv-ring);
		}

		.item:disabled,
		.item[aria-disabled="true"] {
			opacity: 0.45;
			cursor: not-allowed;
		}
	}
</style>
