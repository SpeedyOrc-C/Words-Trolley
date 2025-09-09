<script lang="ts">
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

	const gardiner = Literal2Gardiner[g]
	const svgPath = `https://raw.githubusercontent.com/semiessessi/recoloured-tuxscribe-hieroglyphs/refs/heads/main/images/${gardiner}.svg`
</script>

<div class="glyph" style="height: {glyphHeight * scale}px">
	<div
		class="w-fit"
		style="line-height: 100%"
		style:font-size="{lineHeight * scale}px"
		style:transform="translateY(calc(-100% + {glyphHeight * scale}px))"
	>
		{g}
	</div>
<!-- TODO: Add colourful glyphs	-->
<!--	<img src={svgPath} alt="Symbol {gardiner}"/>-->
</div>

<style>
	.glyph {
		font-family: Font_Egyptian, sans-serif;
	}

	img {
		height: 100%;
	}
</style>
