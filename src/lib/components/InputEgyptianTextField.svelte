<script lang="ts" module>
	import {Button, buttonVariants} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {ButtonGroup} from "$lib/components/ui/button-group"
	import * as TT from "$lib/components/ui/tooltip"
	import * as DM from "$lib/components/ui/dropdown-menu"

	import {_} from "$lib/i18n/store"
	import {preferredDeterminativeScheme, preferredEgyptianTransliterationParserForEdit, preferredSentenceTransliterationDumperForEdit} from "$lib/settings/store/egyptian"
	import {CandidatesFromPhonemes, type EgyptianWordCandidate} from "$lib/word/egyptian/dictionary"
	import {CandidatesFromNumber} from "$lib/word/egyptian/dictionary/numbers"
	import { type Hieroglyphs, g, h, v, c, DumpHieroglyphs} from "$lib/word/egyptian/hieroglyphs"
	import * as IME from "$lib/word/egyptian/IME"
	import EgyptianText from "$lib/components/EgyptianText.svelte"
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
	import {CandidatesFromGardiner} from "$lib/word/egyptian/gardiner/gardiner-literal"
	import {CandidatesFromDeterminativeScheme} from "$lib/word/egyptian/IME/determinative"

	const BufferPrefix = {
		Determinative: " ",
		Gardiner: "/",
		Number: "#",
	}
</script>

<script lang="ts">
	let {
		ctx = $bindable(),
		OnSubmit
	}: {
		ctx: IME.State
		OnSubmit?: () => void
	} = $props()

	let buffer = $state("")
	let bufferError = $state(false)
	let candidates: EgyptianWordCandidate[] = $state([])

	function Execute(...command: IME.Command)
	{
		ctx = IME.Execute(ctx, command)
	}

	function OnImeInput()
	{
		if (candidates.length > 0 && buffer.length > 1)
		{
			if (buffer.endsWith(" "))
			{
				Execute(IME.CommandKind.Insert, candidates[0].Word)
				buffer = ""
				candidates = []
				bufferError = false
				return
			}

			const lastChar = buffer[buffer.length - 1]

			if (
				"0" <= lastChar && lastChar <= "9"
				&& ! buffer.startsWith(BufferPrefix.Number)
				&& ! buffer.startsWith(BufferPrefix.Gardiner)
			)
			{
				const digit = parseInt(lastChar)

				if (! Number.isNaN(digit) && digit > 0 && digit <= candidates.length)
				{
					Execute(IME.CommandKind.Insert, candidates[digit - 1].Word)
					buffer = ""
					candidates = []
					bufferError = false
					return
				}
			}
		}

		if (buffer.length == 1)
			for (const quickSymbol in QuickSymbols)
				if (buffer == quickSymbol)
				{
					Execute(IME.CommandKind.Insert, g(QuickSymbols[quickSymbol]))
					buffer = ""
					candidates = []
					bufferError = false
					return
				}

		if (buffer.startsWith(")"))
		{
			if (buffer == ")|" && IME.CanMakeCartouche(ctx))
			{
				Execute(IME.CommandKind.Cartouche)
				buffer = ""
				bufferError = false
				return
			}
			return
		}

		// FIXME))
		if (buffer == ";")
		{
			Execute(IME.CommandKind.DuplicateLast)
			buffer = ""
			bufferError = false
			return
		}

		if (buffer == "\\" && IME.CanMakeLigature(ctx))
		{
			Execute(IME.CommandKind.Ligature)
			buffer = ""
			bufferError = false
			return
		}

		if (buffer == "-" && IME.CanMakeColumnOrRow(ctx))
		{
			Execute(IME.CommandKind.Row)
			buffer = ""
			bufferError = false
			return
		}

		if (buffer == "=" && IME.CanMakeColumnOrRow(ctx))
		{
			Execute(IME.CommandKind.Column)
			buffer = ""
			bufferError = false
			return
		}

		if (buffer == "[" && ctx.cursor > 0)
		{
			Execute(IME.CommandKind.DuplicateLast)
			Execute(IME.CommandKind.Row)
			buffer = ""
			candidates = []
			bufferError = false
			return
		}

		if (buffer == "]" && ctx.cursor > 0)
		{
			Execute(IME.CommandKind.DuplicateLast)
			Execute(IME.CommandKind.Column)
			buffer = ""
			candidates = []
			bufferError = false
			return
		}

		// FIXME))
		if (buffer.endsWith("\\") && candidates.length > 0)
		{
			Execute(IME.CommandKind.Insert, candidates[0].Word)
			Execute(IME.CommandKind.Ligature)
			buffer = ""
			candidates = []
			bufferError = false
			return
		}

		// FIXME))
		if (buffer.endsWith(";") && candidates.length > 0)
		{
			Execute(IME.CommandKind.Insert, candidates[0].Word)
			Execute(IME.CommandKind.DuplicateLast)
			buffer = ""
			candidates = []
			bufferError = false
			return
		}

		// FIXME))
		if (buffer.endsWith("-") && candidates.length > 0)
		{
			Execute(IME.CommandKind.Insert, candidates[0].Word)
			Execute(IME.CommandKind.Row)
			buffer = ""
			candidates = []
			bufferError = false
			return
		}

		// FIXME))
		if (buffer.endsWith("=") && candidates.length > 0)
		{
			Execute(IME.CommandKind.Insert, candidates[0].Word)
			Execute(IME.CommandKind.Column)
			buffer = ""
			candidates = []
			bufferError = false
			return
		}

		// TODO)) Add an English input scheme
		if (buffer.startsWith(BufferPrefix.Determinative))
		{
			const input = buffer.substring(1, buffer.length).trim()
			candidates = CandidatesFromDeterminativeScheme($preferredDeterminativeScheme, input)
			bufferError = false
			return
		}

		if (buffer.startsWith(BufferPrefix.Gardiner))
		{
			const input = buffer.substring(1, buffer.length).trim()
			candidates = CandidatesFromGardiner(input)
			bufferError = false
			return
		}

		if (buffer.startsWith(BufferPrefix.Number))
		{
			const input = buffer.substring(1, buffer.length).trim()
			const number = parseInt(input)

			if (Number.isNaN(number))
			{
				candidates = []
				return
			}

			candidates = CandidatesFromNumber(number)
			bufferError = false
			return
		}

		const newImeInput = $preferredEgyptianTransliterationParserForEdit.eval(buffer)

		if (newImeInput instanceof Error)
			bufferError = true
		else
		{
			bufferError = false
			candidates = CandidatesFromPhonemes(newImeInput, $settings.Egyptian.FuzzySZ)
		}
	}

	function OnImeKeyDown(e: KeyboardEvent & { currentTarget: HTMLInputElement })
	{
		const c = e.code

		if (c == "Enter")
		{
			OnSubmit?.()
			return
		}

		if (c == "ArrowLeft" && IME.CanMoveLeft(ctx))
		{
			e.preventDefault()
			Execute(IME.CommandKind.Left)
			return
		}

		if (c == "ArrowRight" && IME.CanMoveRight(ctx))
		{
			e.preventDefault()
			Execute(IME.CommandKind.Right)
			return
		}

		if (c == "Backspace" && IME.CanBackspace(ctx))
		{
			e.preventDefault()
			Execute(IME.CommandKind.Backspace)
			return
		}
	}

	function OnClickImeWord(hie: Hieroglyphs)
	{
		Execute(IME.CommandKind.Insert, hie)
		buffer = ""
		candidates = []
		bufferError = false
	}

	async function PasteRawHieroglyphs()
	{
		const text = await navigator.clipboard.readText()
		const newValue = pHieroglyphs.eval(text)

		if (newValue instanceof Error)
		{
			toast.error($_.input_egyptian.syntax_error)
			return
		}

		Execute(IME.CommandKind.Replace, newValue)
		toast.success($_.pasted)
	}
</script>

<div class="relative flex gap-1">

	<Input
		aria-invalid={bufferError}
		autocapitalize="off"
		autocomplete="off"
		autocorrect="off"
		bind:value={buffer}
		oninput={OnImeInput}
		onkeydown={OnImeKeyDown}
		placeholder={$_.linguistics.transliteration}
		spellcheck="false"
	/>

	<Button onclick={OnSubmit} size="icon" variant="outline" type="submit">
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
				disabled={ctx.value.length == 0 || navigator.clipboard == undefined}
				onclick={() => navigator.clipboard.writeText(DumpHieroglyphs(ctx.value))}
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
			<DM.Item onclick={() => navigator.clipboard.writeText(ToJSesh(ctx.value))}>
				<Copy/>
				{$_.copy}
			</DM.Item>
		</DM.Content>
	</DM.Root>

	<ButtonGroup>

		<Button
			disabled={!IME.CanMoveLeft(ctx)}
			onclick={() => Execute(IME.CommandKind.Left)}
			size="icon"
			title={$_.input_egyptian.move_cursor_left}
			variant="outline"
		>
			<ArrowLeft/>
		</Button>

		<Button
			disabled={!IME.CanBackspace(ctx)}
			onclick={() => Execute(IME.CommandKind.Backspace)}
			size="icon"
			title={$_.input_egyptian.backspace}
			variant="outline"
		>
			<Delete/>
		</Button>

		<Button
			disabled={!IME.CanMoveRight(ctx)}
			onclick={() => Execute(IME.CommandKind.Right)}
			size="icon"
			title={$_.input_egyptian.move_cursor_right}
			variant="outline"
		>
			<ArrowRight/>
		</Button>

	</ButtonGroup>

</div>

<div class="flex flex-wrap justify-between">

	{#if buffer.length > 0}

		{#snippet CandidateButton(hie: EgyptianWordCandidate, i: number | null = null)}
			<Button
				onclick={() => OnClickImeWord(hie.Word)}
				variant="ghost"
				class="inline-flex items-center"
			>
				{#if i != null}
					<code class="text-orange-700 dark:text-orange-300">
						{i + 1}
					</code>
				{/if}
				<span class="text-xl egyptian">
					<EgyptianText t={[hie.Word]}/>
				</span>
				{#if hie.Tail != undefined}
					<span class="text-foreground/50">
						{$preferredSentenceTransliterationDumperForEdit(hie.Tail)}
					</span>
				{/if}
			</Button>
		{/snippet}

		<div class="flex flex-wrap items-center min-h-9">
			{#if buffer.startsWith(BufferPrefix.Determinative)}
				<div class="ml-4">
					{$_.input_egyptian.mode.determinative}
				</div>
				{#each candidates as hie, i (hie)}
					{@render CandidateButton(hie, i)}
				{/each}
			{:else if buffer.startsWith(BufferPrefix.Gardiner)}
				<div class="ml-4">
					{$_.input_egyptian.mode.gardiner}
				</div>
				{#if candidates.length == 1}
					{@render CandidateButton(candidates[0])}
				{/if}
			{:else if buffer.startsWith(BufferPrefix.Number)}
				<div class="ml-4">
					{$_.input_egyptian.mode.number}
				</div>
				{#if candidates.length == 1}
					{@render CandidateButton(candidates[0])}
				{/if}
			{:else}
				{#each candidates as hie, i (hie)}
					{@render CandidateButton(hie, i)}
				{/each}
			{/if}

		</div>

	{:else}

		<div></div>

		<div class="flex gap-1">

			<TT.Provider>
				<TT.Root>
					<TT.Trigger
						onclick={() => Execute(IME.CommandKind.Cartouche)}
						disabled={!IME.CanMakeCartouche(ctx)}
						title={$_.input_egyptian.add_cartouche}
						class={buttonVariants({variant: "outline"})}
					>
						<EgyptianText t={[c(h(v(g("𓂋"), g("𓈖")), g("𓀀")))]}/>
					</TT.Trigger>
					<TT.Content>
						{$_.input_egyptian.add_cartouche}
					</TT.Content>
				</TT.Root>
			</TT.Provider>

			<ButtonGroup>
				<TT.Provider>
					<TT.Root>
						<TT.Trigger
							onclick={() => Execute(IME.CommandKind.Ligature)}
							disabled={!IME.CanMakeLigature(ctx)}
							title={$_.input_egyptian.make_ligature}
							class={buttonVariants({variant: "outline", size: "icon"})}
						>
							<Blend/>
						</TT.Trigger>
						<TT.Content>
							{$_.input_egyptian.make_ligature}
						</TT.Content>
					</TT.Root>
				</TT.Provider>

				<TT.Provider>
					<TT.Root>
						<TT.Trigger
							onclick={() => Execute(IME.CommandKind.Row)}
							disabled={!IME.CanMakeColumnOrRow(ctx)}
							title={$_.input_egyptian.join_horizontally}
							class={buttonVariants({variant: "outline", size: "icon"})}
						>
							<Columns2/>
						</TT.Trigger>
						<TT.Content>
							{$_.input_egyptian.join_horizontally}
						</TT.Content>
					</TT.Root>
				</TT.Provider>

				<TT.Provider>
					<TT.Root>
						<TT.Trigger
							onclick={() => Execute(IME.CommandKind.Column)}
							disabled={!IME.CanMakeColumnOrRow(ctx)}
							title={$_.input_egyptian.join_vertically}
							class={buttonVariants({variant: "outline", size: "icon"})}
						>
							<Rows2/>
						</TT.Trigger>
						<TT.Content>
							{$_.input_egyptian.join_vertically}
						</TT.Content>
					</TT.Root>
				</TT.Provider>
			</ButtonGroup>

		</div>

	{/if}

</div>

<style lang="postcss">
	@reference "tailwindcss";

	.egyptian {
		@apply w-fit flex items-center flex-wrap select-none;
	}
</style>
