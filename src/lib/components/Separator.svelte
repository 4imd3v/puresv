<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		orientation?: "horizontal" | "vertical";
		label?: string;
	}

	let { orientation = "horizontal", label, class: className, ...rest }: Props = $props();
</script>

<div
	class={["separator", label && "labeled", className].filter(Boolean).join(" ")}
	data-orientation={orientation}
	role="separator"
	aria-orientation={orientation}
	{...rest}
>
	{#if label}
		<span class="line"></span>
		<span class="label">{label}</span>
		<span class="line"></span>
	{/if}
</div>

<style>
	@layer puresv {
		.separator {
			flex-shrink: 0;
			border: 0;
			background-color: var(--puresv-border);
		}

		.separator[data-orientation="horizontal"] {
			width: 100%;
			height: 1px;
		}

		.separator[data-orientation="vertical"] {
			width: 1px;
			align-self: stretch;
		}

		.separator.labeled {
			display: flex;
			align-items: center;
			gap: var(--puresv-space-3);
			width: 100%;
			height: auto;
			background: none;
		}

		.separator.labeled .line {
			flex: 1;
			height: 1px;
			background-color: var(--puresv-border);
		}

		.separator.labeled .label {
			font-size: var(--puresv-text-xs);
			font-weight: 500;
			color: var(--puresv-text-muted);
			white-space: nowrap;
		}
	}
</style>
