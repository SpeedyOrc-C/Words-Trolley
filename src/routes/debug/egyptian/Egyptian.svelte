<script lang="ts">
	import type {Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
	import {onMount} from "svelte"
	import Render from "./Render.svelte"

	const {t}: { t: Hieroglyphs[] } = $props()

	let lineHeight = $state(16)

	let root: HTMLElement

	onMount(() =>
	{
		lineHeight = parseFloat(getComputedStyle(root).fontSize) * 1.2
	})
</script>

<span
	bind:this={root}
	class="inline-flex flex-wrap align-text-bottom select-none overflow-hidden"
	style:gap="{lineHeight * 0.2}px"
>
	{#each t as hie}
		<Render {hie} {lineHeight}/>
	{/each}
</span>

<style>
	@reference "tailwindcss";

	span {
		font-family: Font_Egyptian, sans-serif;
	}
</style>
