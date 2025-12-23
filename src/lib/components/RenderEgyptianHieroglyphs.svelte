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

	const allowedLigatures = new Set([
		"𓅧𓈎",
		"𓆓𓋴", "𓆓𓂧",
		"𓅱𓏏", "𓏏𓅱", "𓏏𓅱𓏏",
		"𓅐𓏏",
		"𓅭𓇳",
	])

	//H2𓆳V2𓏏𓊗V2𓎆𓏽V2𓐍𓂋H2𓍛V2𓏤𓈖H2V2𓇓𓏏V2𓆤𓏏CH3𓇳𓆣𓂓H2𓋹𓆖H2𓇋V2𓄪𓐍H2𓊹𓏏H3𓇋𓍘𓇌L𓆓𓂧𓆑H2𓇋𓅱V2H2𓄙𓅓𓈖H3𓎿V2𓊃𓏏𓀁V2𓐍𓂋H2𓇓V2𓏏𓈖H2𓋴𓉼V2H2𓄣𓏤𓂋H4𓇋V2𓏏𓆑𓀀V3𓏤𓏤𓏤H2V2𓆣𓂋𓅱H2V3𓂋𓄂𓏏𓀀H2𓇋𓅱H2V3𓋭𓈖𓈖𓀀H2𓍛V2𓏤𓆑H3V2𓐍𓏏𓅓𓋩𓉼𓅓𓎛𓎿V4𓊃𓏠𓈖𓈓𓃂H2𓏇𓇋H2𓀻𓋴𓇓V3𓏏𓈖𓎟

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
			if (arg[0][0] == Structure.Glyph && arg[1][0] == Structure.Glyph)
				return HeightOfGlyph(arg[0][1] + arg[1][1])
			throw PessimisticHeight(arg[0])
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
			if (arg[0][0] == Structure.Glyph && arg[1][0] == Structure.Glyph)
				return WidthOfGlyph(arg[0][1] + arg[1][1])
			throw PessimisticWidth(arg[0])
		}
	}

	function ScaleSegments(xs: number[], max: number, gap: number): number
	{
		const xsSum = xs.reduce((a, b) => a + b, 0)

		const sum = xsSum + gap * (xs.length - 1)
		const excess = sum - max

		if (excess <= 0)
			return 1

		const scale = 1 - excess / xsSum

		return scale
	}
</script>

<script lang="ts">
	import EgyptianGlyph from "./EgyptianGlyph.svelte"
	import Render from "./RenderEgyptianHieroglyphs.svelte"

	// [ERROR] V3𓏠𓈖H3𓏌𓏌𓏌𓋴V2𓈖H2𓃀𓇋𓏜V3H2𓐍𓏏𓏛𓏥

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

	const [struct, arg] = $derived(hie)
</script>

{#if struct == Structure.Glyph}

	<span class="g" style:height>
		<EgyptianGlyph g={arg} {fpx} {fpy} {lineHeight}/>
	</span>

{:else if struct == Structure.Vertical}

	{@const pessimisticHeights = arg.map(PessimisticHeight)}
	{@const pessimisticWidth = Math.max(...arg.map(PessimisticWidth))}
	{@const scale = ScaleSegments(pessimisticHeights, fpy, verticalGap)}
	{@const adjustedHeights = pessimisticHeights.map(h => h * scale)}

	<span class="v" style:height>
		{#each arg as hie, i}
			<Render {hie} fpx={1.2} fpy={adjustedHeights[i]} {lineHeight} parentWidth={scale * Math.min(1, pessimisticWidth)}/>
		{/each}
	</span>

{:else if struct == Structure.Horizontal}

	{@const pessimisticWidths = arg.map(PessimisticWidth)}
	{@const scale = ScaleSegments(pessimisticWidths, fpx, horizontalGap)}
	{@const adjustedWidths = pessimisticWidths.map(w => w * scale)}
	{@const minWidth = parentWidth == undefined ? 0 : lineHeight * parentWidth}
	{@const gap = lineHeight * horizontalGap}

	<span class="h" style:height="{heightPx * scale}px" style:min-width="{minWidth}px" style:gap="{gap}px">
		{#each arg as hie, i}
			<Render {hie} fpx={adjustedWidths[i]} fpy={fpy * scale} {lineHeight}/>
		{/each}
	</span>

{:else if struct == Structure.Ligature}

	{#snippet IncorrectLigature()}
		{@const gap = lineHeight * horizontalGap}
		<span class="h text-red-400" style:height style:gap="{gap}px">
			{#each arg as hie}
				<Render hie={hie} {fpx} {fpy} {lineHeight}/>
			{/each}
		</span>
	{/snippet}

	{@const ligature = arg.map(([_, g]) => g).join("")}

	{#if allowedLigatures.has(ligature)}
		<span class="g" style:height>
			<EgyptianGlyph g={ligature} {fpx} {fpy} {lineHeight}/>
		</span>
	{:else}
		{@render IncorrectLigature()}
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
		<Render hie={arg} {fpx} {fpy} lineHeight={lineHeight * (1 - cartoucheOverallVerticalSize * 2)}/>
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
