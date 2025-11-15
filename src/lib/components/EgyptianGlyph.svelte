<script lang="ts">
	import {HieroglyphsFont} from "$lib/settings"
	import {settings} from "$lib/settings/store"
	import type Gardiner from "$lib/word/egyptian/gardiner"
	import {Literal2Gardiner} from "$lib/word/egyptian/gardiner/gardiner-literal"
	import {HeightOfGlyph} from "$lib/word/egyptian/glyph/height"

	const {fp = 1, g, lineHeight}: { fp?: number, g: string, lineHeight: number } = $props()
	const freeHeight = $derived(lineHeight * fp)
	const glyphProportion = $derived(HeightOfGlyph(g))
	const glyphHeight = $derived(lineHeight * glyphProportion)

	const scale = $derived(
		glyphHeight > freeHeight
			? freeHeight / glyphHeight
			: 1
	)

	function SemiessessiFromGardiner(gardiner: Gardiner): string
	{
		if (gardiner.startsWith("Aa"))
			return `J${gardiner.slice(2)}`

		return gardiner
	}

	const _gardiner = $derived(Literal2Gardiner[g]) as Gardiner | undefined
	const gardiner = $derived(_gardiner == undefined ? undefined : SemiessessiFromGardiner(_gardiner))
	const svgPath = $derived(gardiner == undefined ? undefined : `https://raw.githubusercontent.com/semiessessi/recoloured-tuxscribe-hieroglyphs/refs/heads/main/images/${gardiner}.svg`)
</script>


{#if $settings.Egyptian.HieroglyphsFont == HieroglyphsFont.NewGardiner}

	<span class=glyph style:height="{glyphHeight * scale}px">
		<span
			title={gardiner}
			style:font-size="{lineHeight * scale}px"
			style:transform="translateY(calc(-100% + {glyphHeight * scale}px))"
		>
			{g}
		</span>
	</span>

{:else if $settings.Egyptian.HieroglyphsFont == HieroglyphsFont.SemiessessiColourful}

	<img
		src={svgPath}
		alt={gardiner}
		style:height="{glyphHeight * scale}px"
	/>

{/if}

<style lang="postcss">
	@reference "tailwindcss";

	.glyph {
		@apply inline-flex relative items-start;

		& > span {
			@apply w-fit;
			line-height: 100%;
			font-family: Font_Egyptian, sans-serif;
		}
	}
</style>
