<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import { tick } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Option {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
		options: Option[];
		value?: string;
	}

	let { options, value = $bindable(options[0]?.value ?? ""), ...rest }: Props = $props();

	let group = $state<HTMLDivElement | null>(null);

	function enabledIndexes() {
		return options.map((option, index) => (option.disabled ? -1 : index)).filter((i) => i !== -1);
	}

	async function onKeydown(event: KeyboardEvent) {
		const indexes = enabledIndexes();
		if (indexes.length === 0) return;
		const position = options.findIndex((option) => option.value === value);
		const at = Math.max(0, indexes.indexOf(position));
		let next: number;
		if (event.key === "ArrowRight" || event.key === "ArrowDown") next = indexes[(at + 1) % indexes.length];
		else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
			next = indexes[(at - 1 + indexes.length) % indexes.length];
		else if (event.key === "Home") next = indexes[0];
		else if (event.key === "End") next = indexes[indexes.length - 1];
		else return;
		event.preventDefault();
		const option = options[next ?? 0];
		if (!option) return;
		value = option.value;
		await tick();
		group?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus();
	}
</script>

<div class="segmented" role="radiogroup" bind:this={group} {...rest}>
	{#each options as option (option.value)}
		<button
			type="button"
			role="radio"
			aria-checked={value === option.value}
			tabindex={value === option.value ? 0 : -1}
			disabled={option.disabled}
			onclick={() => (value = option.value)}
			onkeydown={onKeydown}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	@layer puresv {
		/* A track with a single ink-filled selected segment — the same weight as
		   a solid Button, so "selected" always looks the same across the library. */
		.segmented {
			box-sizing: border-box;
			display: inline-flex;
			gap: 2px;
			height: var(--puresv-control-height);
			padding: 2px;
			border: 1px solid var(--puresv-border);
			border-radius: var(--puresv-radius-md);
			background-color: var(--puresv-surface);
		}

		button {
			height: 100%;
			padding-inline: var(--puresv-space-3);
			border: 0;
			border-radius: var(--puresv-radius-sm);
			background: none;
			color: var(--puresv-text-muted);
			font-family: var(--puresv-font);
			font-size: var(--puresv-text-md);
			font-weight: var(--puresv-weight-medium);
			line-height: 1;
			white-space: nowrap;
			cursor: pointer;
			transition:
				background-color var(--puresv-duration) var(--puresv-ease-out),
				color var(--puresv-duration) var(--puresv-ease-out);
		}

		button:hover:not(:disabled):not([aria-checked="true"]) {
			background-color: var(--puresv-surface-2);
			color: var(--puresv-text);
		}

		button[aria-checked="true"] {
			background-color: var(--puresv-primary);
			color: var(--puresv-on-primary);
		}

		button:focus-visible {
			outline: 2px solid var(--puresv-ring);
			outline-offset: -2px;
		}

		button:disabled {
			opacity: 0.45;
			cursor: not-allowed;
		}

		@media (prefers-reduced-motion: reduce) {
			button {
				transition-duration: 0.01ms;
			}
		}
	}
</style>
