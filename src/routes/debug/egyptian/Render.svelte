<script lang="ts" module>
	import {HeightOfGlyph} from "$lib/word/egyptian/glyph/height"

	const verticalGap = 0.05
	const horizontalGap = 0.1
	const squashThreshold = 0.25

	function PessimisticHeight([structure, arg]: Hieroglyphics): number
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
	import {type Hieroglyphics, Structure} from "$lib/word/egyptian/hieroglyphics"
	import Glyph from "./Glyph.svelte"
	import {GetLineHeight} from "$lib/word/egyptian/glyph/height"
	import Render from "./Render.svelte"

	const {fp = 1, hie}: { fp?: number, hie: Hieroglyphics } = $props()
	const lineHeight = GetLineHeight()
	const freeHeight = lineHeight * fp
	const [struct, arg] = hie
	const height = `${freeHeight}px`
</script>

{#if struct === Structure.G}

	<div class="g" style:height>
		<Glyph g={arg} {fp}/>
	</div>

{:else if struct === Structure.V}

	{@const pessimisticHeights = arg.map(PessimisticHeight)}
	{@const adjustedHeights = CutVerticalHeights(pessimisticHeights, fp)}

	<div class="v" style:height>
		{#each arg as hie, i}
			<Render hie={hie} fp={adjustedHeights[i]}/>
		{/each}
	</div>

{:else if struct === Structure.H}

	<div class="h" style:height style:gap="{lineHeight * horizontalGap}px">
		{#each arg as hie}
			<Render hie={hie} fp={fp}/>
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
