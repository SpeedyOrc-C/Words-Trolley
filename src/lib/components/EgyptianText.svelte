<script lang="ts">
	import type {Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
	import {onMount} from "svelte"
	import RenderEgyptianHieroglyphs from "./RenderEgyptianHieroglyphs.svelte"
	import type {Readable} from "svelte/store"

	const {t, updateSignal}: {
		t: readonly Hieroglyphs[]
		updateSignal?: Readable<unknown>
	} = $props()

	let lineHeight = $state(16)

	let root: HTMLElement

	onMount(() =>
	{
		lineHeight = parseFloat(getComputedStyle(root).fontSize)

		const unsubscribeUpdateSignal = updateSignal?.subscribe(() =>
		{
			lineHeight = parseFloat(getComputedStyle(root).fontSize)
		})

		return () =>
		{
			unsubscribeUpdateSignal?.()
		}
	})
</script>

<span
	bind:this={root}
	class="p-px inline-flex flex-wrap align-text-bottom overflow-hidden"
	style:gap="{lineHeight * 0.1}px"
	lang="egy"
>
	{#each t as hie}
		<RenderEgyptianHieroglyphs {hie} {lineHeight}/>
	{/each}
</span>
