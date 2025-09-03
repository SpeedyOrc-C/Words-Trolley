<script lang="ts">
	import type Glyph from "$lib/word/egyptian/glyph"
	import {HeightOfGlyph} from "$lib/word/egyptian/glyph/height"

	const {fp, g, lineHeight}: { fp: number, g: Glyph, lineHeight: number } = $props()
	const freeHeight = $derived(lineHeight * fp)
	const glyphProportion = $derived(HeightOfGlyph(g))
	const glyphHeight = $derived(lineHeight * glyphProportion)

	const scale = $derived(
		glyphHeight > freeHeight
			? freeHeight / glyphHeight
			: 1
	)
</script>

<div style="height: {glyphHeight * scale}px">
	<div
		class="w-fit"
		style="line-height: 100%"
		style:font-size="{lineHeight * scale}px"
		style:transform="translateY(calc(-100% + {glyphHeight * scale}px))"
	>
		{g}
	</div>
</div>
