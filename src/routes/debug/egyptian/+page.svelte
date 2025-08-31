<script lang="ts" module>
	type RangeSelectionState
		= { s: "idle" }
		| { s: "drag-start", start: number }
		| { s: "dragging", start: number, end: number }

	type Operation = "horizontal" | "vertical" | "flatten"
</script>

<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input/index.js"
	import type {Phoneme} from "$lib/word/egyptian"
	import {SetLineHeight} from "$lib/word/egyptian/glyph/height"
	import G from "$lib/word/egyptian/glyph"
	import {Decompose, g, h, type Hieroglyphics, Structure, v} from "$lib/word/egyptian/hieroglyphics"
	import Render from "./Render.svelte"
	import dictionary from "$lib/word/egyptian/dictionary"
	import {Columns2, Rows2, Split} from "@lucide/svelte"
	import {_} from "$lib/i18n"

	const lineHeight = 96
	const height = `${lineHeight}px`
	const gap = `${lineHeight * 0.3}px`

	let input: string = $state("")
	let results: Hieroglyphics[] = $state([])
	let hies = $state<Hieroglyphics[]>([])
	let rangeSelection = $state<RangeSelectionState>({s: "idle"})
	let operation = $state<Operation>("vertical")

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

	function MouseDown(i: number)
	{
		switch (rangeSelection.s)
		{
		case "idle":
			if (operation == "flatten" && hies[i][0] != Structure.G)
			{
				const before = hies.slice(0, i)
				const selected = hies[i]
				const after = hies.slice(i + 1)
				hies = [...before, ...Decompose(selected), ...after]
			}
			else
				rangeSelection = {s: "drag-start", start: i}
			break
		}
	}

	function MouseOver(i: number)
	{
		switch (rangeSelection.s)
		{
		case "drag-start":
			if (i != rangeSelection.start)
				rangeSelection = {s: "dragging", start: rangeSelection.start, end: i}
			break
		case "dragging":
			if (i != rangeSelection.end)
				rangeSelection = {s: "dragging", start: rangeSelection.start, end: i}
			break
		}
	}

	function MouseUp()
	{
		switch (rangeSelection.s)
		{
		case "dragging":
		{
			const start = Math.min(rangeSelection.start, rangeSelection.end)
			const end = Math.max(rangeSelection.start, rangeSelection.end)

			rangeSelection = {s: "idle"}

			if (start < 0 || end >= hies.length || start == end)
				return

			const before = hies.slice(0, start)
			const selected = hies.slice(start, end + 1)
			const after = hies.slice(end + 1)

			if (operation == "horizontal")
				hies = [...before, h(...selected), ...after]
			else if (operation == "vertical")
				hies = [...before, v(...selected), ...after]
			break
		}
		default:
			rangeSelection = {s: "idle"}
			break
		}
	}

	function ShouldHighlight(i: number)
	{
		switch (rangeSelection.s)
		{
		case "idle":
			return false
		case "drag-start":
			return i == rangeSelection.start
		case "dragging":
			return (i >= Math.min(rangeSelection.start, rangeSelection.end)
				&& i <= Math.max(rangeSelection.start, rangeSelection.end))
		}
	}
</script>

<svelte:body onmouseup={MouseUp}/>

<main class="p-4 flex flex-col gap-4">

	<div class="flex-2 p-2 rounded-md outline-1">
		<div class="egyptian egyptian-font" style:gap style:min-height={height}>
			{#each hies as hie, i (hie)}
				<div
					class="outline-yellow-500"
					class:outline-4={ShouldHighlight(i)}
					onmousedown={() => MouseDown(i)}
					onmouseover={() => MouseOver(i)}
					onmouseup={MouseUp}
				>
					<Render {hie}/>
				</div>
			{/each}
		</div>
	</div>

	<code class="p-2 rounded-md outline-1 text-xs">
		{JSON.stringify(hies)}
	</code>

	<div class="flex justify-between">
		<div class="flex gap-4">
			<Button onclick={() => operation = "horizontal"}
					  variant={operation === "horizontal" ? "default" : "outline"}>
				<Columns2/>
				{$_.stack.horizontal}
			</Button>
			<Button onclick={() => operation = "vertical"}
					  variant={operation === "vertical" ? "default" : "outline"}>
				<Rows2/>
				{$_.stack.vertical}
			</Button>
			<Button onclick={() => operation = "flatten"}
					  variant={operation === "flatten" ? "destructive" : "outline"}>
				<Split/>
				{$_.stack.split}
			</Button>
		</div>
		<div>
			<Button variant="secondary" onclick={() => hies = [...hies, g(G.D_identity)]}>
				{$_.egyptian.identity}
			</Button>
		</div>
	</div>

	<Input
		autocapitalize="off" autocomplete="off" autocorrect="off" bind:value={input} class="font-mono"
		{onkeydown}
		placeholder={$_.linguistics.transliteration}
		style="font-size: 3rem"
		type="text"
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
