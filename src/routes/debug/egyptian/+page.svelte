<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input/index.js"
	import type {Phoneme} from "$lib/word/egyptian"
	import {SetLineHeight} from "$lib/word/egyptian/glyph/height"
	import G from "$lib/word/egyptian/glyph"
	import {g, h, type Hieroglyphics, v} from "$lib/word/egyptian/hieroglyphics"
	import Render from "./Render.svelte"
	import dictionary from "$lib/word/egyptian/dictionary"

	const lineHeight = 64
	const height = `${lineHeight}px`
	const gap = `${lineHeight * 0.1}px`

	let input: string = $state("")
	let results: Hieroglyphics[] = $state([])
	let hies = $state<Hieroglyphics[]>([])

	SetLineHeight(lineHeight)

	$effect(() =>
	{
		const chars = Array.from(input) as Phoneme[]

		if (chars.length == 0)
		{
			results = []
			return
		}

		let newResults: Hieroglyphics[] = []
		let tree = dictionary

		for (let char of chars)
		{
			if (! (char in tree))
			{
				results = []
				return
			}

			newResults = tree[char][0]
			tree = tree[char][1]
		}

		results = newResults
	})

	function onkeydown(e: KeyboardEvent)
	{
		if (e.code == "Backspace" && input == "" && hies.length > 0)
		{
			e.preventDefault()
			hies = hies.slice(0, -1)
			return
		}

		if (e.code == "Space")
		{
			e.preventDefault()

			if (results.length == 0)
				return

			hies = [...hies, results[0]]
			input = ""
			return
		}

		if (e.code.startsWith("Digit"))
		{
			e.preventDefault()

			const i = parseInt(e.code.substring(5)) - 1

			if (i < 0 || i >= results.length)
				return

			hies = [...hies, results[i]]
			input = ""
			return
		}
	}
</script>

<main class="p-4 flex flex-col gap-4">


	<div class="flex-2 p-2 rounded-md outline-1">
		<div class="egyptian egyptian-font" style:gap style:height>
			{#each hies as hie}
				<Render {hie}/>
			{/each}
		</div>
	</div>

	<code class="p-2 rounded-md outline-1">
		{JSON.stringify(hies)}
	</code>

	<Input
		bind:value={input} style="font-size: 1rem" type="text" class="font-mono" {onkeydown}
		autocapitalize="off"
		placeholder="Transliteration"
	/>

	<div class="flex gap-4">
		{#each results as hie, i (hie)}
			<div class="flex items-center gap-3">
				<Button variant="outline" onclick={() => {hies = [...hies, hie]; input = ""}}>
					{i + 1}
				</Button>
				<div class="egyptian" style:gap style:height>
					<div class="egyptian-font">
						<Render {hie}/>
					</div>
				</div>
			</div>
		{/each}
	</div>


</main>

<style>
	@reference "tailwindcss";

	.egyptian {
		@apply w-fit flex items-center flex-wrap select-none;
	}

	.egyptian-font {
		font-family: Font_Egyptian, sans-serif;
	}
</style>
