<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {_} from "$lib/i18n"
	import {preferredEgyptianTransliterationParser} from "$lib/settings/store/egyptian"
	import type {Phoneme} from "$lib/word/egyptian"
	import Important from "$lib/word/egyptian/dictionary/important"
	import {
		type Hieroglyphs,
		g,
		ExecuteHieroglyphsEditorCommand,
		type HieroglyphsEditorState, Structure, type HieroglyphsEditCommand
	} from "$lib/word/egyptian/hieroglyphs"
	import Letter2 from "$lib/word/egyptian/dictionary/letter-2"
	import Letter3 from "$lib/word/egyptian/dictionary/letter-3"
	import LetterMore from "$lib/word/egyptian/dictionary/letter-more"
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import RenderEgyptianText from "$lib/components/RenderEgyptianText.svelte"

	import Columns2 from "@lucide/svelte/icons/columns-2"
	import Rows2 from "@lucide/svelte/icons/rows-2"
	import Split from "@lucide/svelte/icons/split"
	import Blend from "@lucide/svelte/icons/blend"
	import ArrowLeft from "@lucide/svelte/icons/arrow-left"
	import ArrowRight from "@lucide/svelte/icons/arrow-right"
	import Delete from "@lucide/svelte/icons/delete"

	type OperationState = "idle" | "column" | "row"

	let {
		value = $bindable([]),
		onchange
	}: {
		value?: Hieroglyphs[]
		onchange?: (hie: Hieroglyphs[]) => void
	} = $props()

	let s: HieroglyphsEditorState = $state({cursor: value.length, content: value})
	let os: OperationState = $state("idle")
	let imeInputRaw = $state("")
	let imeInput: Phoneme[] = $state([])
	let imeInputError = $state(false)
	let imeWords: Hieroglyphs[] = $state([])

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
			Execute("column", count)
			os = "idle"
			break
		case "row":
			Execute("row", count)
			os = "idle"
			break
		}
	}

	function Execute(...command: HieroglyphsEditCommand)
	{
		s = ExecuteHieroglyphsEditorCommand(s, command)
		value = s.content
		onchange?.(s.content)
	}

	function OnImeInput()
	{
		// Insert the identity determinative: 𓏤
		if (imeInputRaw == "|")
		{
			Execute("insert", g("𓏤"))
			imeInputRaw = ""
			imeInput = []
			imeInputError = false
			return
		}

		// Join glyphs horizontally
		if (imeInputRaw.startsWith("-"))
		{
			if (imeInputRaw.length == 2)
			{
				const count = parseInt(imeInputRaw[1])

				if (! Number.isNaN(count))
				{
					Execute("row", count)
					imeInputRaw = ""
					imeInput = []
					imeInputError = false
				}
				else
					imeInputError = true
			}
			else
				imeInputError = false

			return
		}

		// Join glyphs vertically
		if (imeInputRaw.startsWith("="))
		{
			if (imeInputRaw.length == 2)
			{
				const count = parseInt(imeInputRaw[1])

				if (! Number.isNaN(count))
				{
					Execute("column", count)
					imeInputRaw = ""
					imeInput = []
					imeInputError = false
				}
				else
					imeInputError = true
			}
			else
				imeInputError = false

			return
		}

		const newImeInput = $preferredEgyptianTransliterationParser.eval(imeInputRaw)

		if (newImeInput instanceof Error)
			imeInputError = true
		else
		{
			imeInputError = false
			imeInput = newImeInput
		}
	}

	function OnImeKeyDown(e: KeyboardEvent & { currentTarget: HTMLInputElement })
	{
		const t = e.currentTarget

		// Move the cursor to the left
		if (e.code == "ArrowLeft" && t.selectionEnd == 0)
		{
			e.preventDefault()
			Execute("left")
			return
		}

		// Move the cursor to the right
		if (e.code == "ArrowRight" && t.selectionStart == t.value.length)
		{
			e.preventDefault()
			Execute("right")
			return
		}

		// Delete/split the glyph to the left of the cursor
		if (e.code == "Backspace" && t.value.length == 0)
		{
			e.preventDefault()
			Execute("backspace")
			return
		}

		// Select 1st candidate
		if (e.code == "Space")
		{
			e.preventDefault()

			if (imeWords.length > 0)
			{
				Execute("insert", imeWords[0])
				imeInputRaw = ""
				imeInput = []
				imeInputError = false
			}
		}

		// Select other candidates with numbers
		if (e.code.startsWith("Digit"))
		{
			const digit = parseInt(e.code.substring(5))

			if (! Number.isNaN(digit) && digit > 0 && digit <= imeWords.length)
			{
				e.preventDefault()
				Execute("insert", imeWords[digit - 1])
				imeInputRaw = ""
				imeInput = []
				imeInputError = false
			}
		}
	}
</script>

<div class="flex flex-col gap-2">

	<div
		class="p-2 flex flex-wrap overflow-x-auto outline-1 rounded-md egyptian-font cursor-text"
		onclick={() => Execute("jump", s.content.length)}
		style:min-height="48px"
	>
		{#each s.content as hie, i ([hie])}
			{#if i === s.cursor}
				<div class="w-0.5 mx-1.75 h-12 bg-yellow-600/50"></div>
			{:else}
				<div class="w-4 h-12"
					  onclick={e => { e.stopPropagation(); Execute("jump", i) }}></div>
			{/if}
			<div style:height="48px"
				  onclick={e => { e.stopPropagation(); Execute("jump", i) }}>
				<RenderEgyptianText {hie} lineHeight={48}/>
			</div>
		{/each}
		{#if s.content.length === s.cursor}
			<div class="w-0.5 mx-1.75 h-12 bg-yellow-600/50"></div>
		{:else}
			<div class="w-4 h-12"></div>
		{/if}
	</div>

	<div class="relative flex gap-2">

		<Input
			aria-invalid={imeInputError}
			bind:value={imeInputRaw}
			class="font-mono"
			oninput={OnImeInput}
			onkeydown={OnImeKeyDown}
			placeholder={$_.linguistics.transliteration}
		/>

		<Button
			disabled={s.cursor === 0}
			onclick={() => Execute("left")}
			size="icon" variant="outline"
		>
			<ArrowLeft/>
		</Button>

		<Button
			disabled={s.cursor === 0}
			onclick={() => Execute("backspace")}
			size="icon" variant="secondary"
		>
			<Delete/>
		</Button>

		<Button
			disabled={s.cursor === s.content.length}
			onclick={() => Execute("right")}
			size="icon" variant="outline"
		>
			<ArrowRight/>
		</Button>

	</div>

	<div class="flex flex-wrap justify-between">

		{#if imeInput.length > 0}

			<div class="flex flex-wrap gap-2">
				{#each imeWords as hie, i (hie)}
					<Button
						onclick={() => Execute("insert", hie)}
						variant="ghost"
						class="inline-flex items-center gap-4"
					>
						<code>
							{i + 1}
						</code>
						<span class="text-xl egyptian egyptian-font">
							<EgyptianText t={[hie]}/>
						</span>
					</Button>
				{/each}
			</div>

		{:else}

			<div></div>

			<div class="flex gap-2">

				<Button disabled size="icon" variant="outline">
					<Blend/>
				</Button>

				<Button
					onclick={() => Execute("split")}
					disabled={s.cursor === 0 || s.content[s.cursor - 1][0] === Structure.G}
					size="icon" variant="outline"
				>
					<Split/>
				</Button>

				<Button
					size="icon" variant={os === "row" ? "default" : "outline"}
					onclick={() => os = os === "row" ? "idle" : "row"}
				>
					<Columns2/>
				</Button>

				<Button
					size="icon" variant={os === "column" ? "default" : "outline"}
					onclick={() => os = os === "column" ? "idle" : "column"}
				>
					<Rows2/>
				</Button>

				{#each [2, 3, 4] as count}
					<Button
						class="text-lg"
						size="icon"
						variant="outline"
						disabled={os === "idle" || s.cursor < count}
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
