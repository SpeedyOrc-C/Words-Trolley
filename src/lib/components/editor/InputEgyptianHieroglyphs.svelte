<script lang="ts" module>
	const joinCounts = [2, 3, 4] as const
</script>

<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {_} from "$lib/i18n"
	import {preferredEgyptianTransliterationParser} from "$lib/settings/store/egyptian"
	import {CandidatesFromPhonemes} from "$lib/word/egyptian/dictionary"
	import {CandidatesFromXiaoheKmt} from "$lib/word/egyptian/dictionary/xiaohe-kmt"
	import {
		type Hieroglyphs, g, Structure,
		ExecuteHieroglyphsEditorCommand,
		type HieroglyphsEditorState,
		type HieroglyphsEditCommand
	} from "$lib/word/egyptian/hieroglyphs"
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
		onchange,
		hideCursor = false,
		hideInputBorder = false,
		hideControls = false,
		color = "inherit",
		height = 48,
	}: {
		value?: Hieroglyphs[]
		onchange?: (hie: Hieroglyphs[]) => void
		hideCursor?: boolean
		hideInputBorder?: boolean
		hideControls?: boolean
		color?: string
		height?: number
	} = $props()

	let s: HieroglyphsEditorState = $state({cursor: value.length, content: value})
	let os: OperationState = $state("idle")
	let imeInputRaw = $state("")
	let imeInputError = $state(false)
	let imeWords: Hieroglyphs[] = $state([])

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
					imeInputError = false
				}
				else
					imeInputError = true
			}
			else
				imeInputError = false

			return
		}

		// Query determinatives
		// TODO: Add an English input scheme
		if (imeInputRaw.startsWith(" "))
		{
			const input = imeInputRaw.substring(1, imeInputRaw.length).trim()
			imeWords = CandidatesFromXiaoheKmt(input)
			imeInputError = false
			return
		}

		const newImeInput = $preferredEgyptianTransliterationParser.eval(imeInputRaw)

		if (newImeInput instanceof Error)
			imeInputError = true
		else
		{
			imeInputError = false
			imeWords = CandidatesFromPhonemes(newImeInput)
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
		if (e.code == "Space" && imeWords.length > 0)
		{
			e.preventDefault()

			Execute("insert", imeWords[0])
			imeInputRaw = ""
			imeWords = []
			imeInputError = false
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
				imeWords = []
				imeInputError = false
			}
		}
	}
</script>

<div class="flex flex-col gap-1">

	<div
		class="p-2 flex flex-wrap overflow-x-auto rounded-md cursor-text"
		class:outline-1={!hideInputBorder}
		style:color
		style:gap="{height / 3}px"
	>
		{#each s.content as hie, i ([hie])}
			<div class="relative" style:height="{height}px">
				<RenderEgyptianText {hie} lineHeight={height}/>
				{#if !hideCursor && i === 0 && 0 === s.cursor}
					<div class="cursor left-0"></div>
				{/if}
				{#if !hideCursor && i === s.cursor - 1}
					<div class="cursor right-0"></div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="relative flex gap-1" class:hidden={hideControls}>

		<Input
			aria-invalid={imeInputError}
			autocapitalize="off"
			autocomplete="off"
			autocorrect="off"
			bind:value={imeInputRaw}
			class="font-mono"
			name={$_.editor.hieroglyphs_editor.ime_buffer}
			oninput={OnImeInput}
			onkeydown={OnImeKeyDown}
			placeholder={$_.linguistics.transliteration}
			spellcheck="false"
		/>

		<Button
			disabled={s.cursor === 0}
			onclick={() => Execute("left")}
			size="icon" title={$_.editor.hieroglyphs_editor.move_cursor_left}
			variant="outline"
		>
			<ArrowLeft/>
		</Button>

		<Button
			disabled={s.cursor === 0}
			onclick={() => Execute("backspace")}
			size="icon" title={$_.editor.hieroglyphs_editor.backspace}
			variant="secondary"
		>
			<Delete/>
		</Button>

		<Button
			disabled={s.cursor === s.content.length}
			onclick={() => Execute("right")}
			size="icon" title={$_.editor.hieroglyphs_editor.move_cursor_right}
			variant="outline"
		>
			<ArrowRight/>
		</Button>

	</div>

	<div class="flex flex-wrap justify-between" class:hidden={hideControls}>

		{#if imeWords.length > 0}

			<div class="flex flex-wrap gap-1">
				{#each imeWords as hie, i (hie)}
					<Button
						onclick={() => Execute("insert", hie)}
						variant="ghost"
						class="inline-flex items-center gap-4"
					>
						<code>
							{i + 1}
						</code>
						<span class="text-xl egyptian">
							<EgyptianText t={[hie]}/>
						</span>
					</Button>
				{/each}
			</div>

		{:else}

			<div></div>

			<div class="flex gap-1">

				<Button disabled size="icon" variant="outline" title={$_.editor.hieroglyphs_editor.make_ligature}>
					<Blend/>
				</Button>

				<Button
					onclick={() => Execute("split")}
					disabled={s.cursor === 0 || s.content[s.cursor - 1][0] === Structure.G}
					size="icon" variant="outline"
					title={$_.editor.hieroglyphs_editor.ungroup}
				>
					<Split/>
				</Button>

				<Button
					size="icon" variant={os === "row" ? "default" : "outline"}
					onclick={() => os = os === "row" ? "idle" : "row"}
					title={$_.editor.hieroglyphs_editor.join_horizontally}
				>
					<Columns2/>
				</Button>

				<Button
					size="icon" variant={os === "column" ? "default" : "outline"}
					onclick={() => os = os === "column" ? "idle" : "column"}
					title={$_.editor.hieroglyphs_editor.join_vertically}
				>
					<Rows2/>
				</Button>

				{#each joinCounts as count}
					<Button
						class="text-lg"
						size="icon"
						variant="outline"
						disabled={os === "idle" || s.cursor < count}
						onclick={() => OnStackButtonClick(count)}
						title={$_.editor.hieroglyphs_editor[`join_${count}`]}
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

	.cursor {
		@apply absolute top-0 h-full w-0.5 bg-yellow-500;
		animation: blink 1s step-start 0s infinite;
	}

	@keyframes blink {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
