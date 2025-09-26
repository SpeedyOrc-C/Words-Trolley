<script lang="ts" module>
	const joinCounts = [2, 3, 4] as const
</script>

<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"

	import {_} from "$lib/i18n/store"
	import {preferredEgyptianTransliterationParser} from "$lib/settings/store/egyptian"
	import {CandidatesFromPhonemes} from "$lib/word/egyptian/dictionary"
	import {CandidatesFromNumber} from "$lib/word/egyptian/dictionary/numbers"
	import {CandidatesFromXiaoheKmt} from "$lib/word/egyptian/dictionary/xiaohe-kmt"
	import {
		type Hieroglyphs, g, Structure,
		ExecuteHieroglyphsEditorCommand,
		type HieroglyphsEditorState,
		type HieroglyphsEditCommand, DumpHieroglyphs
	} from "$lib/word/egyptian/hieroglyphs"
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import RenderEgyptianHieroglyphs from "$lib/components/RenderEgyptianHieroglyphs.svelte"
	import {pHieroglyphs} from "$lib/word/egyptian/hieroglyphs/parser"
	import {toast} from "svelte-sonner"

	import Columns2 from "@lucide/svelte/icons/columns-2"
	import Rows2 from "@lucide/svelte/icons/rows-2"
	import Split from "@lucide/svelte/icons/split"
	import Blend from "@lucide/svelte/icons/blend"
	import ArrowLeft from "@lucide/svelte/icons/arrow-left"
	import ArrowRight from "@lucide/svelte/icons/arrow-right"
	import Delete from "@lucide/svelte/icons/delete"
	import Copy from "@lucide/svelte/icons/copy"
	import ClipboardPaste from "@lucide/svelte/icons/clipboard-paste"

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
	let imeInput = $state("")
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
		try
		{
			s = ExecuteHieroglyphsEditorCommand(s, command)
			value = s.content
			onchange?.(s.content)
		}
		catch (e)
		{}
	}

	function OnImeInput()
	{
		// Insert the identity determinative: 𓏤
		if (imeInput == "|")
		{
			Execute("insert", g("𓏤"))
			imeInput = ""
			imeInputError = false
			return
		}

		// Overlap 2 glyphs
		if (imeInput == "&")
		{
			Execute("overlap")
			imeInput = ""
			imeInputError = false
			return
		}

		// Join glyphs horizontally
		if (imeInput.startsWith("-"))
		{
			if (imeInput.length == 2)
			{
				const count = parseInt(imeInput[1])

				if (! Number.isNaN(count))
				{
					Execute("row", count)
					imeInput = ""
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
		if (imeInput.startsWith("="))
		{
			if (imeInput.length == 2)
			{
				const count = parseInt(imeInput[1])

				if (! Number.isNaN(count))
				{
					Execute("column", count)
					imeInput = ""
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
		if (imeInput.startsWith(" "))
		{
			const input = imeInput.substring(1, imeInput.length).trim()
			imeWords = CandidatesFromXiaoheKmt(input)
			imeInputError = false
			return
		}

		// Query numerical glyphs
		if (imeInput.startsWith("#"))
		{
			const input = imeInput.substring(1, imeInput.length).trim()
			const number = parseInt(input)

			if (Number.isNaN(number))
			{
				imeWords = []
				return
			}

			imeWords = CandidatesFromNumber(number)
			imeInputError = false
			return
		}

		const newImeInput = $preferredEgyptianTransliterationParser.eval(imeInput)

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
			imeInput = ""
			imeWords = []
			imeInputError = false
		}

		// Select other candidates with numbers
		if (e.code.startsWith("Digit") && ! imeInput.startsWith("#"))
		{
			const digit = parseInt(e.code.substring(5))

			if (! Number.isNaN(digit) && digit > 0 && digit <= imeWords.length)
			{
				e.preventDefault()
				Execute("insert", imeWords[digit - 1])
				imeInput = ""
				imeWords = []
				imeInputError = false
			}
		}
	}

	async function PasteRawHieroglyphs()
	{
		const text = await navigator.clipboard.readText()
		const value = pHieroglyphs.eval(text)

		if (value instanceof Error)
		{
			toast.error($_.editor.hieroglyphs_editor.syntax_error)
			return
		}

		Execute("replace", value)
		toast.success($_.pasted)
	}
</script>

<div class="flex flex-col gap-1">

	<div
		class="p-2 flex flex-wrap rounded-md"
		class:outline-1={!hideInputBorder}
		style:color
		style:gap="{height / 3}px"
	>
		{#if s.content.length === 0}
			<div class="relative" style:height="{height}px">
				<div class="cursor bg-accent-foreground left-0" class:hideCursor></div>
			</div>
		{/if}
		{#each s.content as hie, i ([hie])}
			<div class="relative" style:height="{height}px">
				<RenderEgyptianHieroglyphs {hie} lineHeight={height}/>
				{#if !hideCursor && i === 0 && 0 === s.cursor}
					<div class="cursor bg-accent-foreground left-0" class:hideCursor></div>
				{/if}
				{#if !hideCursor && i === s.cursor - 1}
					<div class="cursor bg-accent-foreground translate-x-[200%] right-0" class:hideCursor></div>
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
			bind:value={imeInput}
			class="font-mono"
			name={$_.editor.hieroglyphs_editor.ime_buffer}
			oninput={OnImeInput}
			onkeydown={OnImeKeyDown}
			placeholder={$_.linguistics.transliteration}
			spellcheck="false"
		/>

		<Button
			disabled={value.length === 0}
			onclick={() => navigator.clipboard.writeText(DumpHieroglyphs(value))}
			size="icon" title={$_.copy}
			variant="outline"
		>
			<Copy/>
		</Button>

		<Button
			onclick={PasteRawHieroglyphs}
			size="icon" title={$_.paste}
			variant="outline"
		>
			<ClipboardPaste/>
		</Button>

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

				<Button
					onclick={() => Execute("overlap")}
					disabled={s.cursor < 2}
					size="icon" variant="outline"
					title={$_.editor.hieroglyphs_editor.make_ligature}
				>
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
		@apply absolute top-0 h-full w-0.5;
		animation: blink 1s step-start 0s infinite;

		&.hideCursor {
			@apply opacity-0;
			animation: none;
		}
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
