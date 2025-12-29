<script lang="ts">
	import {Button, buttonVariants} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {ButtonGroup} from "$lib/components/ui/button-group"
	import * as TT from "$lib/components/ui/tooltip"
	import * as DM from "$lib/components/ui/dropdown-menu"
	import * as Kbd from "$lib/components/ui/kbd"

	import {_} from "$lib/i18n/store"
	import {preferredEgyptianTransliterationParserForEdit, preferredSentenceTransliterationDumperForEdit} from "$lib/settings/store/egyptian"
	import {CandidatesFromPhonemes, type EgyptianWordCandidate} from "$lib/word/egyptian/dictionary"
	import {CandidatesFromNumber} from "$lib/word/egyptian/dictionary/numbers"
	import {CandidatesFromXiaoheKmt} from "$lib/word/egyptian/dictionary/xiaohe-kmt"
	import {
		type Hieroglyphs, g, h, v, c,
		type HieroglyphsEditorState,
		type EgyptianEditCmd, DumpHieroglyphs,
		EgyptianEditCmdKind,
		ExecuteHieroglyphsEditCommand,
		HieroglyphsEditCommandNoSideEffect,
		Structure
	} from "$lib/word/egyptian/hieroglyphs"
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import RenderEgyptianHieroglyphs from "$lib/components/RenderEgyptianHieroglyphs.svelte"
	import {pHieroglyphs} from "$lib/word/egyptian/hieroglyphs/parser"
	import {ToJSesh} from "$lib/word/egyptian/hieroglyphs/jsesh"
	import {toast} from "svelte-sonner"

	import Columns2 from "@lucide/svelte/icons/columns-2"
	import Rows2 from "@lucide/svelte/icons/rows-2"
	import Blend from "@lucide/svelte/icons/blend"
	import ArrowLeft from "@lucide/svelte/icons/arrow-left"
	import ArrowRight from "@lucide/svelte/icons/arrow-right"
	import Delete from "@lucide/svelte/icons/delete"
	import Copy from "@lucide/svelte/icons/copy"
	import ClipboardPaste from "@lucide/svelte/icons/clipboard-paste"
	import Ellipsis from "@lucide/svelte/icons/ellipsis"
	import Check from "@lucide/svelte/icons/check"
	import {settings} from "$lib/settings/store"
	import {QuickSymbols} from "$lib/word/egyptian/IME"

	const nameLabel: Hieroglyphs[] = [c(h(v(g("𓂋"), g("𓈖")), g("𓀀")))]

	let {
		value = $bindable([]),
		editing = $bindable(false),
		onchange,
		InsertSymbolAtCursor = $bindable(() => {}),
		hideCursor = false,
		hideInputBorder = false,
		hideControls = false,
		color = "inherit",
		height = 48,
	}: {
		value?: Hieroglyphs[]
		editing?: boolean
		onchange?: (hie: Hieroglyphs[]) => void
		InsertSymbolAtCursor?: (symbol: Hieroglyphs) => void
		hideCursor?: boolean
		hideInputBorder?: boolean
		hideControls?: boolean
		color?: string
		height?: number
	} = $props()

	let s: HieroglyphsEditorState = $state({cursor: value.length, content: value})
	let imeInput = $state("")
	let imeInputError = $state(false)
	let imeWords: EgyptianWordCandidate[] = $state([])

	const cartoucheDisabled = $derived(s.cursor == 0)
	const rowDisabled = $derived(s.cursor < 2)
	const columnDisabled = $derived(s.cursor < 2)

	const overlapDisabled = $derived(
		s.cursor < 2 ||
		!(s.content[s.cursor - 1][0] == Structure.Glyph || s.content[s.cursor - 1][0] == Structure.Ligature) ||
		!(s.content[s.cursor - 2][0] == Structure.Glyph || s.content[s.cursor - 2][0] == Structure.Ligature)
	)

	function Execute(...command: EgyptianEditCmd)
	{
		try
		{
			s = ExecuteHieroglyphsEditCommand(s, command)

			if (HieroglyphsEditCommandNoSideEffect(command))
				return

			value = s.content
		}
		catch (e)
		{}
	}

	function OnImeInput()
	{
		if (imeInput.length == 1)
			for (const quickSymbol in QuickSymbols)
				if (imeInput == quickSymbol)
				{
					_InsertSymbolAtCursor(g(QuickSymbols[quickSymbol]))
					imeInput = ""
					imeWords = []
					imeInputError = false
					return
				}

		if (imeInput.startsWith(")"))
		{
			if (imeInput == ")|")
			{
				Execute(EgyptianEditCmdKind.Cartouche)
				imeInput = ""
				imeInputError = false
				return
			}
			return
		}

		if (imeInput == ";")
		{
			Execute(EgyptianEditCmdKind.DuplicateLast)
			imeInput = ""
			imeInputError = false
			return
		}

		if (imeInput == "\\")
		{
			Execute(EgyptianEditCmdKind.Overlap)
			imeInput = ""
			imeInputError = false
			return
		}

		if (imeInput == "-")
		{
			Execute(EgyptianEditCmdKind.Row)
			imeInput = ""
			imeInputError = false
			return
		}

		if (imeInput == "=")
		{
			Execute(EgyptianEditCmdKind.Column)
			imeInput = ""
			imeInputError = false
			return
		}

		if (imeInput == "[" && s.cursor > 0)
		{
			Execute(EgyptianEditCmdKind.DuplicateLast)
			Execute(EgyptianEditCmdKind.Row)
			imeInput = ""
			imeWords = []
			imeInputError = false
			return
		}

		if (imeInput == "]" && s.cursor > 0)
		{
			Execute(EgyptianEditCmdKind.DuplicateLast)
			Execute(EgyptianEditCmdKind.Column)
			imeInput = ""
			imeWords = []
			imeInputError = false
			return
		}

		if (imeInput.endsWith("\\") && imeWords.length > 0)
		{
			Execute(EgyptianEditCmdKind.Insert, imeWords[0].Word)
			Execute(EgyptianEditCmdKind.Overlap)
			imeInput = ""
			imeWords = []
			imeInputError = false
			return
		}

		if (imeInput.endsWith(";") && imeWords.length > 0)
		{
			Execute(EgyptianEditCmdKind.Insert, imeWords[0].Word)
			Execute(EgyptianEditCmdKind.DuplicateLast)
			imeInput = ""
			imeWords = []
			imeInputError = false
			return
		}

		if (imeInput.endsWith("-") && imeWords.length > 0)
		{
			Execute(EgyptianEditCmdKind.Insert, imeWords[0].Word)
			Execute(EgyptianEditCmdKind.Row)
			imeInput = ""
			imeWords = []
			imeInputError = false
			return
		}

		if (imeInput.endsWith("=") && imeWords.length > 0)
		{
			Execute(EgyptianEditCmdKind.Insert, imeWords[0].Word)
			Execute(EgyptianEditCmdKind.Column)
			imeInput = ""
			imeWords = []
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

		const newImeInput = $preferredEgyptianTransliterationParserForEdit.eval(imeInput)

		if (newImeInput instanceof Error)
			imeInputError = true
		else
		{
			imeInputError = false
			imeWords = CandidatesFromPhonemes(newImeInput, $settings.Egyptian.FuzzySZ)
		}
	}

	function OnImeKeyDown(e: KeyboardEvent & { currentTarget: HTMLInputElement })
	{
		const t = e.currentTarget

		if (e.code == "Enter")
		{
			editing = false
			onchange?.(s.content)
			return
		}

		// Move the cursor to the left
		if (e.code == "ArrowLeft" && t.selectionEnd == 0)
		{
			e.preventDefault()
			Execute(EgyptianEditCmdKind.Left)
			return
		}

		// Move the cursor to the right
		if (e.code == "ArrowRight" && t.selectionStart == t.value.length)
		{
			e.preventDefault()
			Execute(EgyptianEditCmdKind.Right)
			return
		}

		// Delete/split the glyph to the left of the cursor
		if (e.code == "Backspace" && t.value.length == 0)
		{
			e.preventDefault()
			Execute(EgyptianEditCmdKind.Backspace)
			return
		}

		// Select 1st candidate
		if (e.code == "Space" && imeWords.length > 0)
		{
			e.preventDefault()

			Execute(EgyptianEditCmdKind.Insert, imeWords[0].Word)
			imeInput = ""
			imeWords = []
			imeInputError = false
			return
		}

		// Select other candidates with numbers
		if (e.code.startsWith("Digit") && ! imeInput.startsWith("#"))
		{
			const digit = parseInt(e.code.substring(5))

			if (! Number.isNaN(digit) && digit > 0 && digit <= imeWords.length)
			{
				e.preventDefault()
				_InsertSymbolAtCursor(imeWords[digit - 1].Word)
				imeInput = ""
				imeWords = []
				imeInputError = false
			}
		}
	}

	function OnClickImeWord(hie: Hieroglyphs)
	{
		Execute(EgyptianEditCmdKind.Insert, hie)
		imeInput = ""
		imeWords = []
		imeInputError = false
	}

	function _InsertSymbolAtCursor(symbol: Hieroglyphs)
	{
		Execute(EgyptianEditCmdKind.Insert, symbol)
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

		Execute(EgyptianEditCmdKind.Replace, value)
		toast.success($_.pasted)
	}

	InsertSymbolAtCursor = _InsertSymbolAtCursor
</script>

<div
	class="flex flex-col gap-1"
	style:--height-10="{height * 0.1}px"
	style:--height="{height}px"
>

	{#if editing}

		<div
			class="p-2 inline-flex flex-wrap rounded-md overflow-clip"
			class:outline-1={!hideInputBorder}
			style:color
			style:gap="{height * 0.1}px 0"
		>
			{#if s.content.length == 0}
				<span class="relative" style:height="{height}px">
					<span class="cursor left-0" class:hideCursor></span>
				</span>
			{/if}
			{#each s.content as hie, i ([hie])}
				<span class="word">
					{#if i > 0}
						<span class="word-sep">
							{#if (i == s.cursor - 1 || i == s.cursor - 2)}
								<span></span>
							{/if}
						</span>
					{/if}
					<RenderEgyptianHieroglyphs {hie} lineHeight={height}/>
					{#if i == 0 && 0 == s.cursor}
						<span class="cursor left-0" class:hideCursor></span>
					{/if}
					{#if i == s.cursor - 1}
						<span class="cursor translate-x-[200%] right-0" class:hideCursor></span>
					{/if}
				</span>
			{/each}
		</div>

	{:else}

		<!-- TODO)) Magic number 0.1  -->
		<div
			class="inline-flex flex-wrap overflow-hidden p-px"
			style:color
			style:min-height="{height}px"
			style:gap="{height * 0.1}px"
			onclick={() => {editing = true}}
			onkeydown={e => { if (e.code == "Enter" || e.code == "Space") editing = true}}
			tabindex=0
			role="textbox"
		>
			{#each s.content as hie ([hie])}
				<span class="relative inline-flex" style:height="{height}px">
					<RenderEgyptianHieroglyphs {hie} lineHeight={height}/>
				</span>
			{/each}
		</div>

	{/if}

	<div class="relative flex gap-1" class:hidden={hideControls || !editing}>

		<Input
			aria-invalid={imeInputError}
			autocapitalize="off"
			autocomplete="off"
			autocorrect="off"
			bind:value={imeInput}
			oninput={OnImeInput}
			onkeydown={OnImeKeyDown}
			placeholder={$_.linguistics.transliteration}
			spellcheck="false"
		/>

		<Button
			onclick={() => {editing = false; onchange?.(s.content)}}
			size="icon"
			type="submit"
		>
			<Check/>
		</Button>

		<DM.Root>
			<DM.Trigger>
				{#snippet child({props})}
					<Button {...props} size="icon" variant="outline" title={$_.more}>
						<Ellipsis />
					</Button>
				{/snippet}
			</DM.Trigger>
			<DM.Content>
				<DM.Item
					disabled={value.length === 0}
					onclick={() => navigator.clipboard.writeText(DumpHieroglyphs(value))}
				>
					<Copy/>
					{$_.copy}
				</DM.Item>
				<DM.Item onclick={PasteRawHieroglyphs}>
					<ClipboardPaste/>
					{$_.paste}
				</DM.Item>
				<DM.Separator/>
				<DM.Group>
					<DM.Label>
						JSesh
					</DM.Label>
				</DM.Group>
				<DM.Item onclick={() => navigator.clipboard.writeText(ToJSesh(value))} >
					<Copy/>
					{$_.copy}
				</DM.Item>
			</DM.Content>
		</DM.Root>

		<ButtonGroup>

			<Button
				disabled={s.cursor === 0}
				onclick={() => Execute(EgyptianEditCmdKind.Left)}
				size="icon" title={$_.editor.hieroglyphs_editor.move_cursor_left}
				variant="outline"
			>
				<ArrowLeft/>
			</Button>

			<Button
				disabled={s.cursor === 0}
				onclick={() => Execute(EgyptianEditCmdKind.Backspace)}
				size="icon" title={$_.editor.hieroglyphs_editor.backspace}
				variant="outline"
			>
				<Delete/>
			</Button>

			<Button
				disabled={s.cursor === s.content.length}
				onclick={() => Execute(EgyptianEditCmdKind.Right)}
				size="icon" title={$_.editor.hieroglyphs_editor.move_cursor_right}
				variant="outline"
			>
				<ArrowRight/>
			</Button>

		</ButtonGroup>

	</div>

	<div class="flex flex-wrap justify-between" class:hidden={hideControls || !editing}>

		{#if imeWords.length > 0}

			<div class="flex flex-wrap">
				{#each imeWords as hie, i (hie)}
					<Button
						onclick={() => OnClickImeWord(hie.Word)}
						variant="ghost"
						class="inline-flex items-center"
					>
						<code class="text-orange-700 dark:text-orange-300">{i + 1}</code>
						<span class="text-xl egyptian">
							<EgyptianText t={[hie.Word]}/>
						</span>
						{#if hie.Tail != undefined}
							<span class="text-foreground/50">
								{$preferredSentenceTransliterationDumperForEdit(hie.Tail)}
							</span>
						{/if}
					</Button>
				{/each}
			</div>

		{:else}

			<div></div>

			<div class="flex gap-1">

				<ButtonGroup>

					<TT.Provider>
						<TT.Root>
							<TT.Trigger
								onclick={() => Execute(EgyptianEditCmdKind.Cartouche)}
								disabled={cartoucheDisabled}
								title={$_.editor.hieroglyphs_editor.add_cartouche}
								class={buttonVariants({variant: "outline"})}
							>
								<EgyptianText t={nameLabel}/>
								<Kbd.Root>)|</Kbd.Root>
							</TT.Trigger>
							<TT.Content>
								{$_.editor.hieroglyphs_editor.add_cartouche}
							</TT.Content>
						</TT.Root>
					</TT.Provider>

					<TT.Provider>
						<TT.Root>
							<TT.Trigger
								onclick={() => Execute(EgyptianEditCmdKind.Overlap)}
								disabled={overlapDisabled}
								title={$_.editor.hieroglyphs_editor.make_ligature}
								class={buttonVariants({variant: "outline"})}
							>
								<Blend/>
								<Kbd.Root>\</Kbd.Root>
							</TT.Trigger>
							<TT.Content>
								{$_.editor.hieroglyphs_editor.make_ligature}
							</TT.Content>
						</TT.Root>
					</TT.Provider>

					<TT.Provider>
						<TT.Root>
							<TT.Trigger
								onclick={() => Execute(EgyptianEditCmdKind.Row)}
								disabled={rowDisabled}
								title={$_.editor.hieroglyphs_editor.join_horizontally}
								class={buttonVariants({variant: "outline"})}
							>
								<Columns2/>
								<Kbd.Root>-</Kbd.Root>
							</TT.Trigger>
							<TT.Content>
								{$_.editor.hieroglyphs_editor.join_horizontally}
							</TT.Content>
						</TT.Root>
					</TT.Provider>

					<TT.Provider>
						<TT.Root>
							<TT.Trigger
								onclick={() => Execute(EgyptianEditCmdKind.Column)}
								disabled={columnDisabled}
								title={$_.editor.hieroglyphs_editor.join_vertically}
								class={buttonVariants({variant: "outline"})}
							>
								<Rows2/>
								<Kbd.Root>=</Kbd.Root>
							</TT.Trigger>
							<TT.Content>
								{$_.editor.hieroglyphs_editor.join_vertically}
							</TT.Content>
						</TT.Root>
					</TT.Provider>

				</ButtonGroup>

			</div>

		{/if}

	</div>

</div>

<style lang="postcss">
	@reference "tailwindcss";

	.egyptian {
		@apply w-fit flex items-center flex-wrap select-none;
	}

	.word {
		@apply relative inline-flex items-center;
		height: var(--height);
	}

	.word-sep {
		@apply inline-flex items-center justify-around h-full;
		width: var(--height-10);

		& span {
			@apply h-full bg-yellow-700/50 dark:bg-yellow-500/50;
			width: 1px;
		}
	}

	.cursor {
		@apply absolute top-0 h-full w-0.5 rounded;
		backdrop-filter: invert(100%);
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
