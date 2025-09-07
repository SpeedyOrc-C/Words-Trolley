<script lang="ts" module>
	import {HeightOfGlyph} from "$lib/word/egyptian/glyph/height"
	import {type Hieroglyphs, Structure} from "$lib/word/egyptian/hieroglyphs"

	const verticalGap = 0.05
	const horizontalGap = 0.1
	const squashThreshold = 0.2

	function PessimisticHeight([structure, arg]: Hieroglyphs): number
	{
		switch (structure)
		{
		case Structure.G:
			return HeightOfGlyph(arg)
		case Structure.V:
			return arg.map(PessimisticHeight).reduce((a, b) => a + b, 0)
				+ verticalGap * (arg.length - 1)
		case Structure.H:
			return Math.max(...arg.map(PessimisticHeight))
		}
	}

	function CutVerticalHeights(heights: number[], max: number): number[]
	{
		const totalHeight = heights.reduce((a, b) => a + b, 0) + verticalGap * (heights.length - 1)
		const excess = totalHeight - max

		if (excess <= 0)
			return heights

		const cuttableHeights = heights.filter(h => h > squashThreshold)
		const cuttableTotal = cuttableHeights.reduce((a, b) => a + b, 0)
		const cuttableScale = 1 - excess / cuttableTotal

		return heights.map(h => h > squashThreshold ? h * cuttableScale : h)
	}
</script>

<script lang="ts">
	import EgyptianGlyph from "./EgyptianGlyph.svelte"
	import Render from "./RenderEgyptianText.svelte"

	const {fp = 1, hie, lineHeight}: { fp?: number, hie: Hieroglyphs, lineHeight: number } = $props()

	const freeHeight = $derived(lineHeight * fp)
	const height = $derived(`${freeHeight}px`)

	const [struct, arg] = hie
</script>

{#if struct === Structure.G}

	<div class="g" style:height>
		<EgyptianGlyph g={arg} {fp} {lineHeight}/>
	</div>

{:else if struct === Structure.V}

	{@const pessimisticHeights = arg.map(PessimisticHeight)}
	{@const adjustedHeights = CutVerticalHeights(pessimisticHeights, fp)}

	<div class="v" style:height>
		{#each arg as hie, i}
			<Render hie={hie} fp={adjustedHeights[i]} {lineHeight}/>
		{/each}
	</div>

{:else if struct === Structure.H}

	<div class="h" style:height style:gap="{lineHeight * horizontalGap}px">
		{#each arg as hie}
			<Render hie={hie} fp={fp} {lineHeight}/>
		{/each}
	</div>

{/if}

<style>
	@reference "tailwindcss";

	.g {
		@apply flex items-center;
	}

	.v {
		@apply flex flex-col items-center justify-between;
	}

	.h {
		@apply flex items-center justify-around;
	}
</style>
