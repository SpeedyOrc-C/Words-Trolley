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
		case Structure.L:
			// TODO: Make it more accurate
			return PessimisticHeight(arg[0])
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
	import Render from "./RenderEgyptianHieroglyphs.svelte"

	const {fp = 1, hie, lineHeight}: { fp?: number, hie: Hieroglyphs, lineHeight: number } = $props()

	const freeHeight = $derived(lineHeight * fp)
	const height = $derived(`${freeHeight}px`)

	const [struct, arg] = $derived(hie)
</script>

{#if struct === Structure.G}

	<span class="g" style:height>
		<EgyptianGlyph g={arg} {fp} {lineHeight}/>
	</span>

{:else if struct === Structure.V}

	{@const pessimisticHeights = arg.map(PessimisticHeight)}
	{@const adjustedHeights = CutVerticalHeights(pessimisticHeights, fp)}

	<span class="v" style:height>
		{#each arg as hie, i}
			<Render hie={hie} fp={adjustedHeights[i]} {lineHeight}/>
		{/each}
	</span>

{:else if struct === Structure.H}

	<span class="h" style:height style:gap="{lineHeight * horizontalGap}px">
		{#each arg as hie}
			<Render hie={hie} fp={fp} {lineHeight}/>
		{/each}
	</span>

{:else if struct === Structure.L}

	{@const [[t1, a1], [t2, a2]] = arg}

	{#if t1 === Structure.G && t2 === Structure.G}
		{#if a1 === "𓆓" && a2 === "𓋴"}
			<span class="relative inline-flex justify-between" style:height>
				<EgyptianGlyph g="𓆓" fp={fp * 0.7} {lineHeight}/>
				<span class="absolute bottom-0 left-[50%] translate-x-[-50%]">
					<EgyptianGlyph g="𓋴" fp={fp * 0.7} {lineHeight}/>
				</span>
			</span>
		{:else if a1 === "𓆓" && a2 === "𓂧"}
			<div class="g" style:height>
				<EgyptianGlyph g="𓆓" {fp} {lineHeight}/>
				<span class="absolute left-0 translate-x-[20%] translate-y-[50%]">
					<EgyptianGlyph g="𓂧" fp={fp * 0.2} {lineHeight}/>
				</span>
			</div>
		{/if}
	{/if}

{/if}

<style lang="postcss">
	@reference "tailwindcss";

	.g {
		@apply inline-flex items-center;
	}

	.v {
		@apply inline-flex flex-col items-center justify-between;
	}

	.h {
		@apply inline-flex items-center justify-around;
	}
</style>
