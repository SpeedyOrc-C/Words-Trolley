<script lang="ts">
	import InputEgyptianTransliteration from "$lib/components/InputEgyptianTransliteration.svelte"
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {_} from "$lib/i18n"
	import type {Phoneme} from "$lib/word/egyptian"
	import Important from "$lib/word/egyptian/dictionary/important"
	import {
		type Hieroglyphs,
		g,
		ExecuteHieroglyphsEditorCommand,
		type HieroglyphsEditorState
	} from "$lib/word/egyptian/hieroglyphs"
	import Letter2 from "$lib/word/egyptian/dictionary/letter-2"
	import Letter3 from "$lib/word/egyptian/dictionary/letter-3"
	import LetterMore from "$lib/word/egyptian/dictionary/letter-more"
	import Egyptian from "../../routes/debug/egyptian/Egyptian.svelte"
	import Render from "../../routes/debug/egyptian/Render.svelte"
	import {Columns2, Rows2, Split, Blend, ArrowLeft, ArrowRight, Delete} from "@lucide/svelte"

	type OperationState = "idle" | "column" | "row"

	let s: HieroglyphsEditorState = $state({cursor: 0, content: []})
	let os: OperationState = $state("idle")
	let imeInput: Phoneme[] = $state([])
	let imeWords: Hieroglyphs[] = $state([])

	const {}: {} = $props()

	$effect(() =>
	{
		const s = imeInput.join("")

		const newWords: Hieroglyphs[] = []

		if (imeInput.length == 1)
		{
			newWords.push(g(s as any))
		}
		else if (imeInput.length == 2)
		{
			for (const [k, v] of Letter2)
				if (v == s)
					newWords.push(g(k as any))
		}
		else if (imeInput.length == 3)
		{
			for (const [k, v] of Letter3)
				if (v == s)
					newWords.push(g(k as any))
		}
		else
		{
			for (const [k, v] of LetterMore)
				if (v == s)
					newWords.push(g(k as any))
		}

		for (const [k, v] of Important)
			if (v == s)
				newWords.push(k)

		imeWords = newWords
	})

	function OnStackButtonClick(count: number)
	{
		switch (os)
		{
		case "column":
			s = ExecuteHieroglyphsEditorCommand(s, ["column", count])
			os = "idle"
			break
		case "row":
			s = ExecuteHieroglyphsEditorCommand(s, ["row", count])
			os = "idle"
			break
		}
	}
</script>

<div class="flex flex-col gap-2">

	<div
		class="p-2 flex flex-wrap overflow-x-auto outline-1 rounded-md egyptian-font cursor-text"
		onclick={() => s = ExecuteHieroglyphsEditorCommand(s, ["jump", s.content.length])}
		style:min-height="48px"
	>
		{#each s.content as hie, i ([hie])}
			{#if i === s.cursor}
				<div class="w-0.5 mx-1.75 h-12 bg-yellow-600/50"></div>
			{:else}
				<div class="w-4 h-12"
					  onclick={e => { e.stopPropagation(); s = ExecuteHieroglyphsEditorCommand(s, ["jump", i]) }}></div>
			{/if}
			<div style:height="48px"
				  onclick={e => { e.stopPropagation(); s = ExecuteHieroglyphsEditorCommand(s, ["jump", i]) }}>
				<Render {hie} lineHeight={48}/>
			</div>
		{/each}
		{#if s.content.length === s.cursor}
			<div class="w-0.5 mx-1.75 h-12 bg-yellow-600/50"></div>
		{:else}
			<div class="w-4 h-12"></div>
		{/if}
	</div>

	<div class="relative flex gap-2">
		<InputEgyptianTransliteration
			OnCommand={c => s = ExecuteHieroglyphsEditorCommand(s, c)}
			OnSelect={i => { if (i <= imeWords.length) s = ExecuteHieroglyphsEditorCommand(s, ["insert", imeWords[i-1]]) }}
			allowCommands
			bind:value={imeInput}
			placeholder={$_.linguistics.transliteration}
		/>
		<Button
			onclick={() => s = ExecuteHieroglyphsEditorCommand(s, ["left"])}
			size="icon" variant="outline"
		>
			<ArrowLeft/>
		</Button>
		<Button
			onclick={() => s = ExecuteHieroglyphsEditorCommand(s, ["backspace"])}
			size="icon" variant="secondary"
		>
			<Delete/>
		</Button>
		<Button
			onclick={() => s = ExecuteHieroglyphsEditorCommand(s, ["right"])}
			size="icon" variant="outline"
		>
			<ArrowRight/>
		</Button>
	</div>

	<div class="flex flex-wrap justify-between">

		{#if imeWords.length > 0}

			<div class="flex flex-wrap gap-2">
				{#each imeWords as hie, i (hie)}
					<Button
						onclick={() => s = ExecuteHieroglyphsEditorCommand(s, ["insert", hie])}
						variant="ghost"
						class="inline-flex items-center gap-4"
					>
						<code>
							{i + 1}
						</code>
						<span class="text-xl egyptian egyptian-font">
							<Egyptian t={[hie]}/>
						</span>
					</Button>
				{/each}
			</div>

		{:else}

			<div class="flex gap-2">

			</div>

			<div class="flex gap-2">

				<Button disabled size="icon" variant="outline">
					<Blend/>
				</Button>

				<Button
					onclick={() => s = ExecuteHieroglyphsEditorCommand(s, ["split"])}
					size="icon" variant="outline"
				>
					<Split/>
				</Button>

				<Button
					size="icon" variant={os === "column" ? "default" : "outline"}
					onclick={() => os = os === "column" ? "idle" : "column"}
				>
					<Columns2/>
				</Button>

				<Button
					size="icon" variant={os === "row" ? "default" : "outline"}
					onclick={() => os = os === "row" ? "idle" : "row"}
				>
					<Rows2/>
				</Button>

				{#each [2, 3, 4] as count}
					<Button
						class="text-lg"
						size="icon"
						variant="outline"
						disabled={os === "idle"}
						onclick={() => OnStackButtonClick(count)}
					>
						{count}
					</Button>
				{/each}

			</div>

		{/if}

	</div>

</div>

<style>
	@reference "tailwindcss";

	.egyptian {
		@apply w-fit flex items-center flex-wrap select-none;
	}

	.egyptian-font {
		font-family: Font_Egyptian, sans-serif;
	}
</style>
