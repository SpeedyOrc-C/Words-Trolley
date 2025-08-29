<script lang="ts">
	import type Glyph from "$lib/word/egyptian/glyph"
	import {GetLineHeight, HeightOfGlyph} from "$lib/word/egyptian/glyph/height"

	const {fp, g}: { fp: number, g: Glyph } = $props()
	const lineHeight = GetLineHeight()
	const freeHeight = lineHeight * fp
	const glyphProportion = HeightOfGlyph(g)
	const glyphHeight = lineHeight * glyphProportion

	const scale = glyphHeight > freeHeight
		? freeHeight / glyphHeight
		: 1
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
