<script lang="ts" module>
	import {HeightOfGlyph} from "$lib/word/egyptian/hieroglyphs/glyph/height"
	import {WidthOfGlyph} from "$lib/word/egyptian/hieroglyphs/glyph/width"
	import {h, type Hieroglyphs, Structure} from "$lib/word/egyptian/hieroglyphs"
	import L from "lodash"

	const verticalGap = 0.05
	const horizontalGap = 0.1
	const cartoucheStrokeSize = 0.05
	const cartoucheVerticalPadding = 0.1
	const cartoucheHorizontalPadding = 0.3
	const cartoucheOverallVerticalSize = cartoucheStrokeSize + cartoucheVerticalPadding
	const cartoucheOverallHorizontalSize = cartoucheStrokeSize + cartoucheHorizontalPadding

	const allowedLigatures = new Set([
		"𓅧𓈎",
		"𓆓𓋴", "𓆓𓂧",
		"𓅱𓏏", "𓏏𓅱", "𓏏𓅱𓏏",
		"𓅐𓏏", "𓄝𓏏",
		"𓅭𓇳",
	])

	function PessimisticHeight([structure, arg]: Hieroglyphs): number
	function NaiveHeightOf([structure, arg]: Hieroglyphs): number
	{
		switch (structure)
		{
		case Structure.Glyph:
			return HeightOfGlyph(arg)
		case Structure.Vertical:
			return L.sum(arg.map(NaiveHeightOf)) + verticalGap * (arg.length - 1)
		case Structure.Horizontal:
			return L.max(arg.map(NaiveHeightOf))!
		case Structure.Cartouche:
			return 1
		case Structure.Ligature:
			if (arg[0][0] == Structure.Glyph && arg[1][0] == Structure.Glyph)
				return HeightOfGlyph(arg[0][1] + arg[1][1])
			throw NaiveHeightOf(arg[0])
		}
	}

	function NaiveWidthOf([structure, arg]: Hieroglyphs): number
	{
		switch (structure)
		{
		case Structure.Glyph:
			return WidthOfGlyph(arg)
		case Structure.Vertical:
			return Math.max(...arg.map(NaiveWidthOf))
		case Structure.Horizontal:
			return arg.map(NaiveWidthOf).reduce((a, b) => a + b, 0)
				+ horizontalGap * (arg.length - 1)
		case Structure.Cartouche:
			return NaiveWidthOf(arg) + cartoucheOverallHorizontalSize * 2
		case Structure.Ligature:
			if (arg[0][0] == Structure.Glyph && arg[1][0] == Structure.Glyph)
				return WidthOfGlyph(arg[0][1] + arg[1][1])
			throw NaiveWidthOf(arg[0])
		}
	}

	function ScaleSegments(xs: number[], max: number, gap: number): number
	{
		const xsSum = L.sum(xs)
		const sum = xsSum + max * gap * (xs.length - 1)
		const excess = sum - max

		if (excess <= 0)
			return 1

		return 1 - excess / xsSum
	}
</script>

<script lang="ts">
	import EgyptianGlyph from "./EgyptianGlyph.svelte"
	import Self from "./EgyptianHieroglyphs.svelte"

	const {
		hie,
		fpx = Number.MAX_SAFE_INTEGER,
		fpy = 1,
		parentWidth,
		lineHeight,
	}: {
		hie: Hieroglyphs,
		fpx?: number,
		fpy?: number,
		parentWidth?: number,
		lineHeight: number,
	} = $props()

	const heightPx = $derived(lineHeight * fpy)
	const height = $derived(`${heightPx}px`)
	const gap = $derived(`${lineHeight * horizontalGap}px`)

	const [struct, arg] = $derived(hie)
</script>

{#if struct == Structure.Glyph}

	<span class="g" style:height>
		<EgyptianGlyph g={arg} {fpx} {fpy} {lineHeight}/>
	</span>

{:else if struct == Structure.Vertical}

	{@const naiveHeights = arg.map(NaiveHeightOf)}
	{@const naiveWidths = L.max(arg.map(NaiveWidthOf))!}
	{@const scale = ScaleSegments(naiveHeights, fpy, verticalGap)}
	{@const adjustedHeights = naiveHeights.map(h => h * scale)}

	<span class="v" style:height>
		{#each arg as hie, i}
			<Self {hie} {fpx} fpy={adjustedHeights[i]} {lineHeight} parentWidth={scale * Math.min(1, naiveWidths)}/>
		{/each}
	</span>

{:else if struct == Structure.Horizontal}

	{@const naiveWidths = arg.map(NaiveWidthOf)}
	{@const scale = ScaleSegments(naiveWidths, fpx, horizontalGap)}
	{@const adjustedWidths = naiveWidths.map(w => w * scale)}
	{@const minWidth = parentWidth == undefined ? 0 : lineHeight * parentWidth}

	<span class="h" style:height="{heightPx * scale}px" style:min-width="{minWidth}px" style:gap>
		{#each arg as hie, i}
			<Self {hie} fpx={adjustedWidths[i]} fpy={fpy * scale} {lineHeight}/>
		{/each}
	</span>

{:else if struct == Structure.Ligature}

	{@const ligature = arg.map(([_, g]) => g).join("")}

	{#if allowedLigatures.has(ligature)}
		<span class="g" style:height>
			<EgyptianGlyph g={ligature} {fpx} {fpy} {lineHeight}/>
		</span>
	{:else}
		<Self hie={h(...arg)} {fpx} {fpy} {lineHeight} />
	{/if}

{:else if struct == Structure.Cartouche}

	{@const borderWidth = lineHeight * fpy * cartoucheStrokeSize}
	{@const padding = `${(lineHeight * fpy * cartoucheVerticalPadding)}px ${(lineHeight * fpy * cartoucheHorizontalPadding)}px`}

	<span
		class="c border-foreground"
		style:border-width="{borderWidth}px"
		style:--border-width="{borderWidth}px"
		style:padding
	>
		<Self hie={arg} {fpx} {fpy} lineHeight={lineHeight * (1 - cartoucheOverallVerticalSize * 2)}/>
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
		@apply inline-flex items-center justify-center;
	}
</style>
