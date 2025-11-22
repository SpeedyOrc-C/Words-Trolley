<script lang="ts" module>
	import {HeightOfGlyph} from "$lib/word/egyptian/glyph/height"
	import {WidthOfGlyph} from "$lib/word/egyptian/glyph/width"
	import {type Hieroglyphs, Structure} from "$lib/word/egyptian/hieroglyphs"

	const verticalGap = 0.05
	const horizontalGap = 0.1
	const cartoucheStrokeSize = 0.05
	const cartoucheVerticalPadding = 0.1
	const cartoucheHorizontalPadding = 0.3
	const cartoucheOverallVerticalSize = cartoucheStrokeSize + cartoucheVerticalPadding
	const cartoucheOverallHorizontalSize = cartoucheStrokeSize + cartoucheHorizontalPadding

	function PessimisticHeight([structure, arg]: Hieroglyphs): number
	{
		switch (structure)
		{
		case Structure.Glyph:
			return HeightOfGlyph(arg)
		case Structure.Vertical:
			return arg.map(PessimisticHeight).reduce((a, b) => a + b, 0)
				+ verticalGap * (arg.length - 1)
		case Structure.Horizontal:
			return Math.max(...arg.map(PessimisticHeight))
		case Structure.Cartouche:
			return 1
		case Structure.Ligature:
			// TODO)) Make it more accurate
			return PessimisticHeight(arg[0])
		}
	}

	function PessimisticWidth([structure, arg]: Hieroglyphs): number
	{
		switch (structure)
		{
		case Structure.Glyph:
			return WidthOfGlyph(arg)
		case Structure.Vertical:
			return Math.max(...arg.map(PessimisticWidth))
		case Structure.Horizontal:
			return arg.map(PessimisticWidth).reduce((a, b) => a + b, 0)
				+ horizontalGap * (arg.length - 1)
		case Structure.Cartouche:
			return PessimisticWidth(arg) + cartoucheOverallHorizontalSize * 2
		case Structure.Ligature:
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

{#if struct == Structure.Glyph}

	<span class="g" style:height>
		<EgyptianGlyph g={arg} {fp} {lineHeight}/>
	</span>

{:else if struct == Structure.Vertical}

	{@const pessimisticHeights = arg.map(PessimisticHeight)}
	{@const pessimisticWidth = Math.max(...arg.map(PessimisticWidth))}
	{@const scale = CutVerticalHeights(pessimisticHeights, fp)}
	{@const adjustedHeights = pessimisticHeights.map(h => h * scale)}

	<span class="v" style:height>
		{#each arg as _hie, i}
			<Render hie={_hie} fp={adjustedHeights[i]} {lineHeight} parentWidth={scale * pessimisticWidth}/>
		{/each}
	</span>

{:else if struct == Structure.Horizontal}

	{@const minWidth = parentWidth == undefined ? 0 : lineHeight * parentWidth}
	{@const gap = lineHeight * horizontalGap}

	<span class="h" style:height style:min-width="{minWidth}px" style:gap="{gap}px">
		{#each arg as hie}
			<Render hie={hie} fp={fp} {lineHeight}/>
		{/each}
	</span>

{:else if struct == Structure.Ligature}

	{@const [[t1, a1], [t2, a2]] = arg}

	{#snippet IncorrectLigature()}
		{@const gap = lineHeight * horizontalGap}
		<span class="h text-red-400" style:height style:gap="{gap}px">
			{#each arg as hie}
				<Render hie={hie} fp={fp} {lineHeight}/>
			{/each}
		</span>
	{/snippet}

	{#if t1 == Structure.Glyph && t2 == Structure.Glyph}

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

{:else if struct == Structure.Cartouche}

	{@const borderWidth = lineHeight * fp * cartoucheStrokeSize}
	{@const padding = `${(lineHeight * fp * cartoucheVerticalPadding)}px ${(lineHeight * fp * cartoucheHorizontalPadding)}px`}

	<span
		class="c border-foreground"
		style:border-width="{borderWidth}px"
		style:--border-width="{borderWidth}px"
		style:padding
	>
		<Render hie={arg} {fp} lineHeight={lineHeight * (1 - cartoucheOverallVerticalSize * 2)}/>
	</span>

{/if}

<style lang="postcss">
	@reference "tailwindcss";

	.g {
		@apply inline-flex relative items-center;
	}

	.c {
		@apply inline-flex relative items-center;
		border-radius: 100vh;
		&::after {
			@apply absolute right-0 rounded;
			background-color: var(--color-foreground);
			width: var(--border-width);
			height: calc(100% + var(--border-width));
			transform: translateX(100%);
			content: " ";
		}
	}

	.v {
		@apply inline-flex flex-col items-center justify-between;
	}

	.h {
		@apply inline-flex items-center justify-between;
	}
</style>
