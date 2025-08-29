<script lang="ts">
	import {SetLineHeight} from "$lib/word/egyptian/glyph/height"
	import G from "$lib/word/egyptian/glyph"
	import {g, h, v} from "$lib/word/egyptian/hieroglyphics"
	import Render from "./Render.svelte"

	const lineHeight = 96
	const height = `${lineHeight}px`
	const gap = `${lineHeight * 0.2}px`

	SetLineHeight(lineHeight)
</script>

<div
	class="mx-auto p-4 w-fit flex items-center flex-wrap select-none"
	style:gap style:height
>
	<div class="text-red-700">
		<Render hie={h(g(G.A), v(g(G.P), g(G.D)))}/>
	</div>
	<div class="text-yellow-700">
		<Render hie={h(g(G.S), v(g(G.N), h(g(G.B), g(G.I))))}/>
	</div>
	<div class="text-green-700">
		<Render hie={v(h(g(G.P), g(G.X)), g(G.R))}/>
	</div>
	<div class="text-blue-700">
		<Render hie={v(g(G.Z), g(G.K), g(G.R))}/>
	</div>
	<Render hie={h(v(g(G.R), g((G.N)), g(G.K)), v(g(G.M), g(G.T)))}/>
</div>


<style>
	:global(body) {
		font-family: Font_Egyptian, sans-serif;
	}
</style>
