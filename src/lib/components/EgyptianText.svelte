<script lang="ts">
	import type {Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
	import {onMount} from "svelte"
	import RenderEgyptianHieroglyphs from "./RenderEgyptianHieroglyphs.svelte"

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
		<RenderEgyptianHieroglyphs {hie} {lineHeight}/>
	{/each}
</span>
