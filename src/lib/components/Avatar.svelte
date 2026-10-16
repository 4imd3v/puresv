<script lang="ts">
	// Design tokens — imported per component so they survive tree-shaking.
	import "../theme.css";
	import type { HTMLAttributes } from "svelte/elements";

	type Size = "sm" | "md" | "lg";

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		src?: string;
		name?: string;
		size?: Size;
	}

	let { src, name, size = "md", class: className, ...rest }: Props = $props();

	let failed = $state(false);
	let initials = $derived(name ? initialsOf(name) : "");

	// Retry the image when the src changes.
	$effect(() => {
		if (src) failed = false;
	});

	// First grapheme, so emoji and combining marks survive (break-ui).
	function firstGrapheme(text: string): string {
		if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
			const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
			for (const { segment } of segmenter.segment(text)) return segment;
			return "";
		}
		return Array.from(text)[0] ?? "";
	}

	function initialsOf(value: string): string {
		const words = value.trim().split(/\s+/).filter(Boolean);
		if (words.length === 0) return "";
		if (words.length === 1) return firstGrapheme(words[0] ?? "").toUpperCase();
		return (firstGrapheme(words[0] ?? "") + firstGrapheme(words[words.length - 1] ?? "")).toUpperCase();
	}
</script>

<span class={["avatar", className].filter(Boolean).join(" ")} data-size={size} {...rest}>
	{#if src && !failed}
		<img class="img" {src} alt={name ?? ""} onerror={() => (failed = true)} />
	{:else if initials}
		<span class="initials" role="img" aria-label={name}>{initials}</span>
	{:else}
		<span class="icon" aria-hidden="true">
			<svg viewBox="0 0 16 16" fill="none">
				<circle cx="8" cy="5.5" r="2.75" stroke="currentColor" stroke-width="1.5" />
				<path
					d="M2.5 14.5c0-2.6 2.46-4.25 5.5-4.25s5.5 1.65 5.5 4.25"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
			</svg>
		</span>
	{/if}
</span>

<style>
	@layer puresv {
		.avatar {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			overflow: hidden;
			border-radius: var(--puresv-radius-full);
			background-color: var(--puresv-surface);
			color: var(--puresv-text-muted);
			font-weight: var(--puresv-weight-medium);
			user-select: none;
		}

		.avatar[data-size="sm"] {
			width: 2rem;
			height: 2rem;
			font-size: var(--puresv-text-xs);
		}

		.avatar[data-size="md"] {
			width: 2.5rem;
			height: 2.5rem;
			font-size: var(--puresv-text-sm);
		}

		.avatar[data-size="lg"] {
			width: 3.5rem;
			height: 3.5rem;
			font-size: var(--puresv-text-md);
		}

		.img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.initials {
			line-height: 1;
		}

		.icon {
			display: inline-flex;
			width: 60%;
			height: 60%;
		}

		.icon svg {
			width: 100%;
			height: 100%;
		}
	}
</style>
