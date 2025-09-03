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
		console.log(lineHeight)
	})
</script>

<span bind:this={root} class="root inline-flex flex-wrap align-text-bottom egyptian-font select-none" style:gap="{lineHeight*0.2}px">
	{#each t as hie}
		<Render {hie} {lineHeight}/>
	{/each}
</span>

<style>
	@reference "tailwindcss";

	.egyptian-font {
		font-family: Font_Egyptian, sans-serif;
	}
</style>
