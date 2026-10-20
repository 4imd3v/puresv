<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import { tick } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Side = "top" | "bottom";
	type Align = "start" | "center" | "end";

	interface TriggerProps {
		onclick: (event: MouseEvent) => void;
		onkeydown: (event: KeyboardEvent) => void;
		"aria-expanded": boolean;
		"aria-controls": string;
	}

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
		open?: boolean;
		side?: Side;
		align?: Align;
		/** Accessible name for the panel. */
		label?: string;
		trigger: Snippet<[TriggerProps]>;
		children: Snippet;
	}

	let {
		open = $bindable(false),
		side = "bottom",
		align = "start",
		label = "Popover",
		trigger,
		children,
		class: className,
		...rest
	}: Props = $props();

	const uid = $props.id();
	const panelId = `${uid}-popover`;
	const gap = 8;
	const margin = 8;

	let anchor = $state<HTMLSpanElement | null>(null);
	let panel = $state<HTMLDivElement | null>(null);
	let left = $state(0);
	let top = $state(0);
	let ready = $state(false);

	// Fixed positioning needs coordinates, but it also escapes overflow-hidden
	// ancestors, which is why the panel is not absolutely positioned.
	function position() {
		if (!anchor || !panel) return;
		const a = anchor.getBoundingClientRect();
		const p = panel.getBoundingClientRect();
		let x =
			align === "start"
				? a.left
				: align === "end"
					? a.right - p.width
					: a.left + a.width / 2 - p.width / 2;
		const y = side === "bottom" ? a.bottom + gap : a.top - p.height - gap;
		x = Math.min(Math.max(margin, x), Math.max(margin, window.innerWidth - p.width - margin));
		left = x;
		top = Math.min(
			Math.max(margin, y),
			Math.max(margin, window.innerHeight - p.height - margin),
		);
		ready = true;
	}

	function triggerElement() {
		return anchor?.querySelector<HTMLElement>("[aria-controls]") ?? null;
	}

	async function show() {
		open = true;
		ready = false;
		await tick();
		position();
		panel?.focus();
	}

	function hide(focusTrigger = true) {
		open = false;
		ready = false;
		if (focusTrigger) triggerElement()?.focus();
	}

	function onTriggerClick() {
		if (open) hide();
		else show();
	}

	function onTriggerKeydown(event: KeyboardEvent) {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			show();
		} else if (event.key === "Escape" && open) {
			event.preventDefault();
			hide();
		}
	}

	function onPanelKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			event.preventDefault();
			hide();
		}
	}

	// Track the anchor while open, and dismiss on an outside press.
	$effect(() => {
		if (!open) return;
		// Also positions when the consumer opens it through bind:open.
		position();
		function onPointerDown(event: PointerEvent) {
			const target = event.target as Node;
			if (!anchor?.contains(target) && !panel?.contains(target)) hide(false);
		}
		window.addEventListener("scroll", position, true);
		window.addEventListener("resize", position);
		document.addEventListener("pointerdown", onPointerDown);
		return () => {
			window.removeEventListener("scroll", position, true);
			window.removeEventListener("resize", position);
			document.removeEventListener("pointerdown", onPointerDown);
		};
	});
</script>

<span class={["popover", className].filter(Boolean).join(" ")} bind:this={anchor} {...rest}>
	{@render trigger({
		onclick: onTriggerClick,
		onkeydown: onTriggerKeydown,
		"aria-expanded": open,
		"aria-controls": panelId,
	})}

	{#if open}
		<div
			class="panel"
			id={panelId}
			role="dialog"
			aria-label={label}
			tabindex={-1}
			data-side={side}
			data-align={align}
			data-ready={ready || undefined}
			bind:this={panel}
			style:left={`${left}px`}
			style:top={`${top}px`}
			onkeydown={onPanelKeydown}
		>
			{@render children()}
		</div>
	{/if}
</span>

<style>
	@layer puresv {
		.popover {
			display: inline-flex;
		}

		.panel {
			position: fixed;
			z-index: 30;
			width: max-content;
			max-width: min(22rem, calc(100vw - 2rem));
			padding: var(--puresv-space-4);
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-md);
			background-color: var(--puresv-canvas);
			box-shadow: var(--puresv-shadow-lg);
			color: var(--puresv-text);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-sm);
			line-height: 1.6;
			opacity: 0;
			transition: opacity var(--puresv-duration) var(--puresv-ease-out);
		}

		.panel[data-ready] {
			opacity: 1;
		}

		.panel:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: 2px;
		}

		@media (prefers-reduced-motion: reduce) {
			.panel {
				transition-duration: 0.01ms;
			}
		}
	}
</style>
