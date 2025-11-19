<script lang="ts" module>
	import {HeightOfGlyph} from "$lib/word/egyptian/glyph/height"
	import {WidthOfGlyph} from "$lib/word/egyptian/glyph/width"
	import {type Hieroglyphs, Structure} from "$lib/word/egyptian/hieroglyphs"

	const verticalGap = 0.05
	const horizontalGap = 0.1

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
			// TODO)) Make it more accurate
			return PessimisticHeight(arg[0])
		}
	}

	function PessimisticWidth([structure, arg]: Hieroglyphs): number
	{
		switch (structure)
		{
		case Structure.G:
			return WidthOfGlyph(arg)
		case Structure.V:
			return Math.max(...arg.map(PessimisticWidth))
		case Structure.H:
			return arg.map(PessimisticWidth).reduce((a, b) => a + b, 0)
				+ horizontalGap * (arg.length - 1)
		case Structure.L:
			// TODO)) Make it more accurate
			return PessimisticWidth(arg[0])
		}
	}

	function CutVerticalHeights(heights: number[], max: number): number
	{
		const totalHeight = heights.reduce((a, b) => a + b, 0) + verticalGap * (heights.length - 1)
		const excess = totalHeight - max

		if (excess <= 0)
			return 1

		const total = heights.reduce((a, b) => a + b, 0)
		const scale = 1 - excess / total

		return scale
	}
</script>

<script lang="ts">
	import EgyptianGlyph from "./EgyptianGlyph.svelte"
	import Render from "./RenderEgyptianHieroglyphs.svelte"

	const {fp = 1, hie, parentWidth, lineHeight}: {
		fp?: number,
		hie: Hieroglyphs,
		parentWidth?: number,
		lineHeight: number,
	} = $props()

	const freeHeight = $derived(lineHeight * fp)
	const height = $derived(`${freeHeight}px`)

	const [struct, arg] = $derived(hie)
</script>

{#if struct == Structure.G}

	<span class="g" style:height>
		<EgyptianGlyph g={arg} {fp} {lineHeight}/>
	</span>

{:else if struct == Structure.V}

	{@const pessimisticHeights = arg.map(PessimisticHeight)}
	{@const pessimisticWidth = Math.max(...arg.map(PessimisticWidth))}
	{@const scale = CutVerticalHeights(pessimisticHeights, fp)}
	{@const adjustedHeights = pessimisticHeights.map(h => h * scale)}

	<span class="v" style:height>
		{#each arg as _hie, i}
			<Render hie={_hie} fp={adjustedHeights[i]} {lineHeight} parentWidth={scale * pessimisticWidth}/>
		{/each}
	</span>

{:else if struct == Structure.H}

	{@const minWidth = parentWidth == undefined ? 0 : lineHeight * parentWidth}
	{@const gap = lineHeight * horizontalGap}

	<span class="h" style:height style:min-width="{minWidth}px" style:gap="{gap}px">
		{#each arg as hie}
			<Render hie={hie} fp={fp} {lineHeight}/>
		{/each}
	</span>

{:else if struct == Structure.L}

	{@const [[t1, a1], [t2, a2]] = arg}

	{#snippet IncorrectLigature()}
		{@const gap = lineHeight * horizontalGap}
		<span class="h text-red-400" style:height style:gap="{gap}px">
			{#each arg as hie}
				<Render hie={hie} fp={fp} {lineHeight}/>
			{/each}
		</span>
	{/snippet}

	{#if t1 == Structure.G && t2 == Structure.G}

		{#if a1 == "𓆓" && a2 == "𓋴"}

			<span class="g" style:height>
				<EgyptianGlyph g=𓆓𓐳𓋴 {fp} {lineHeight}/>
			</span>

		{:else if a1 == "𓆓" && a2 == "𓂧"}

			<span class="g" style:height>
				<EgyptianGlyph g=𓆓𓐳𓂧 {fp} {lineHeight}/>
			</span>

		{:else if a1 == "𓅱" && a2 == "𓏏"}

			<span class="g" style:height>
				<EgyptianGlyph g=𓅱𓐴𓏏 {fp} {lineHeight}/>
			</span>

		{:else if a1 == "𓏏" && a2 == "𓅱"}

			<span class="g" style:height>
				<EgyptianGlyph g=𓅱𓐳𓏏 {fp} {lineHeight}/>
			</span>

		{:else}
			{@render IncorrectLigature()}
		{/if}

	{:else}
		{@render IncorrectLigature()}
	{/if}

{/if}

<style lang="postcss">
	@reference "tailwindcss";

	.g {
		@apply inline-flex relative items-center;
	}

	.v {
		@apply inline-flex flex-col items-center justify-between;
	}

	.h {
		@apply inline-flex items-center justify-between;
	}
</style>
