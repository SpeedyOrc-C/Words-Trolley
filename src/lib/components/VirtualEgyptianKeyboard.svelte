<script lang="ts" module>
	import {_} from "$lib/i18n/store"
	import Check from "@lucide/svelte/icons/check"
	import {Phoneme as P} from "$lib/word/egyptian"
	import {g, v, c, h, DumpHieroglyphs, RoughAutoStackPhonemes} from "$lib/word/egyptian/hieroglyphs"
	import {View} from "$lib/word/egyptian/IME/virtual-keyboard"
	import * as IME from "$lib/word/egyptian/IME"
	import EgyptianText from "./EgyptianText.svelte"
	import Button from "./ui/button/button.svelte"

	import Delete from "@lucide/svelte/icons/delete"
	import Columns2 from "@lucide/svelte/icons/columns-2"
	import Rows2 from "@lucide/svelte/icons/rows-2"
	import Blend from "@lucide/svelte/icons/blend"
	import Copy from "@lucide/svelte/icons/copy"
	import ClipboardPaste from "@lucide/svelte/icons/clipboard-paste"

	import {CandidatesFromPhonemes} from "$lib/word/egyptian/dictionary"
	import {settings} from "$lib/settings/store"
	import {focusedEgyptianInput, gardinerTablePromptOnSelect} from "$lib/word/egyptian/IME/store"
	import {
		FromPower0,
		FromPower1,
		FromPower2,
		FromPower3,
	} from "$lib/word/egyptian/dictionary/numbers"
	import {EgyptianImeMode} from "$lib/settings"
	import {pHieroglyphs} from "$lib/word/egyptian/hieroglyphs/parser"
	import {toast} from "svelte-sonner"

	const row0 = [
		IME.QuickSymbols["1"],
		IME.QuickSymbols["2"],
		IME.QuickSymbols["3"],
		IME.QuickSymbols["4"],
		IME.QuickSymbols["5"],
		IME.QuickSymbols["6"],
		IME.QuickSymbols["7"],
		IME.QuickSymbols["8"],
		IME.QuickSymbols["9"],
		IME.QuickSymbols["0"],
	]
	const row1 = [P.q, P.w, P.e, P.r, P.t, P.y, P.S, P.i, null, P.p]
	const row2 = [P.a, P.s, P.d, P.f, P.g, P.h, P.j, P.k, P.H]
	const row3 = [P.z, P.x, P.c, P.C, P.b, P.n, P.m]
	const keyWidth = "8.5%"
	const numWidth = "9.5%"

	function duration400(...args: any)
	{
		return { duration: 400 }
	}
</script>

<script lang="ts">
	let buffer: P[] = $state([])
	let view: View = $state(View.Letter)

	const candidates = $derived(
		CandidatesFromPhonemes(buffer, $settings.Egyptian.FuzzySZ),
	)

	function Backspace()
	{
		if (buffer.length > 0)
		{
			buffer.pop()
			return
		}

		if ($focusedEgyptianInput == null)
			return

		const ctx = $focusedEgyptianInput.Get()

		if (ctx.cursor == 0)
			return

		$focusedEgyptianInput.Set(IME.Execute(ctx, [IME.CommandKind.Backspace]))
	}

	function Execute(...cmd: IME.Command): void
	{
		if ($focusedEgyptianInput == null)
			return

		$focusedEgyptianInput.Set(IME.Execute($focusedEgyptianInput.Get(), cmd))
	}

	async function Paste()
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

{#snippet KeyBtn(p: string, onclick?: () => void)}
	<Button
		variant="outline"
		size="lg"
		class="border-none p-0 text-2xl"
		style="width: {keyWidth}"
		{onclick}
	>
		<EgyptianText t={[g(p)]} />
	</Button>
{/snippet}

{#snippet LetterLayout(state: IME.State)}
	{#if buffer.length == 0}
		<div class="row">
			{#each row0 as p}
				{@render KeyBtn(p, () => Execute(IME.CommandKind.Insert, g(p)))}
			{/each}
		</div>
	{:else}
		<div class="flex items-center h-10">
			<div class="text-muted-foreground text-sm">
				<EgyptianText t={RoughAutoStackPhonemes(buffer)} />
			</div>

			<div
				class="flex-1 min-w-0 text-nowrap overflow-auto inline-flex flex-nowrap"
			>
				{#each candidates as candidate}
					<Button
						variant="ghost"
						class="text-xl"
						onclick={() => {
							buffer = []
							Execute(IME.CommandKind.Insert, candidate.Word)
						}}
					>
						<EgyptianText t={[candidate.Word]} />
					</Button>
				{/each}
			</div>
		</div>
	{/if}

	<div class="row">
		{#each row1 as p}
			{#if p != null}
				{@render KeyBtn(p, () => buffer.push(p))}
			{:else}
				<Button
					variant="outline"
					size="lg"
					class="border-none p-0 text-lg"
					style="width: {keyWidth}"
				/>
			{/if}
		{/each}
	</div>

	<div class="row">
		<div class="w-[2%]"></div>
		{#each row2 as p}
			{@render KeyBtn(p, () => buffer.push(p))}
		{/each}
		<div class="w-[2%]"></div>
	</div>

	<div class="row">
		<Button variant="outline" size="lg" class="p-0 w-[12%] text-lg">
			{$_.input_egyptian.determinative_label}
		</Button>
		<div class=""></div>
		{#each row3 as p}
			{@render KeyBtn(p, () => buffer.push(p))}
		{/each}
		<div class=""></div>
		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[12%]"
			onclick={Backspace}
		>
			<Delete style="width: 20px; height: 20px" />
		</Button>
	</div>

	<div class="row">
		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[12%] text-2xl"
			onclick={() => (view = View.Number)}
		>
			<EgyptianText t={[g("𓆼"), g("𓍢"), v(g("𓎆"), g("𓏺"))]} />
		</Button>

		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[12%]"
			disabled={!IME.CanMakeColumnOrRow(state)}
			onclick={() => Execute(IME.CommandKind.Row)}
		>
			<Columns2 style="width: 20px; height: 20px" />
		</Button>

		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[45%]"
			disabled={candidates.length == 0}
			onclick={() => {
				Execute(IME.CommandKind.Insert, candidates[0].Word)
				buffer = []
			}}
		/>

		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[12%]"
			disabled={!IME.CanMakeLigature(state)}
			onclick={() => Execute(IME.CommandKind.Ligature)}
		>
			<Blend style="width: 20px; height: 20px" />
		</Button>

		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[12%]"
			disabled={!IME.CanMakeColumnOrRow(state)}
			onclick={() => Execute(IME.CommandKind.Column)}
		>
			<Rows2 style="width: 20px; height: 20px" />
		</Button>
	</div>
{/snippet}

{#snippet NumBtn(p: string, onclick?: () => void)}
	<Button
		variant="outline"
		size="lg"
		class="border-none p-0 text-2xl"
		style="width: {numWidth}"
		{onclick}
	>
		<EgyptianText t={[g(p)]} />
	</Button>
{/snippet}

{#snippet NumberLayout(state: IME.State)}
	<div class="row">
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9].map(FromPower0) as d}
			{@render NumBtn(d, () => Execute(IME.CommandKind.Insert, g(d)))}
		{/each}
	</div>

	<div class="row">
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9].map(FromPower1) as d}
			{@render NumBtn(d, () => Execute(IME.CommandKind.Insert, g(d)))}
		{/each}
	</div>

	<div class="row">
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9].map(FromPower2) as d}
			{@render NumBtn(d, () => Execute(IME.CommandKind.Insert, g(d)))}
		{/each}
	</div>

	<div class="row">
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9].map(FromPower3) as d}
			{@render NumBtn(d, () => Execute(IME.CommandKind.Insert, g(d)))}
		{/each}
	</div>

	<div class="row">
		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[12%] text-2xl"
			onclick={() => (view = View.Letter)}
		>
			<EgyptianText t={[g("𓄿")]} />
		</Button>

		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[12%]"
			disabled={!IME.CanMakeColumnOrRow(state)}
			onclick={() => Execute(IME.CommandKind.Row)}
		>
			<Columns2 style="width: 20px; height: 20px" />
		</Button>

		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[45%]"
			disabled={candidates.length == 0}
			onclick={() => {
				Execute(IME.CommandKind.Insert, candidates[0].Word)
				buffer = []
			}}
		/>

		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[12%]"
			onclick={Backspace}
		>
			<Delete style="width: 20px; height: 20px" />
		</Button>

		<Button
			variant="outline"
			size="lg"
			class="p-0 w-[12%]"
			disabled={!IME.CanMakeColumnOrRow(state)}
			onclick={() => Execute(IME.CommandKind.Column)}
		>
			<Rows2 style="width: 20px; height: 20px" />
		</Button>
	</div>
{/snippet}

{#if $focusedEgyptianInput != null && $settings.Egyptian.Mode == EgyptianImeMode.VirtualKeyboard}
	<div
		id="virtual-egyptian-keyboard"
		class="fixed z-10 w-full left-0 touch-none flex flex-col"
		style="bottom: env(safe-area-inset-bottom)"
		out:duration400
	>
		<div class="px-4 py-3 bg-linear-to-b from-transparent to-background/90">
			<div class="p-1 rounded-full border border-foreground/10 drop-shadow-2xl bg-card/50 backdrop-blur-xs flex items-center justify-between">
				<div class="min-w-0 text-nowrap flex-nowrap overflow-auto flex items-center gap-2">
					<Button variant="ghost" size="icon-lg" class="rounded-full" title={$_.copy}
						onclick={() => navigator.clipboard.writeText(DumpHieroglyphs($focusedEgyptianInput.Get().value))}
					>
						<Copy style="width: 22px; height: 22px" />
					</Button>
					<Button variant="ghost" size="icon-lg" class="rounded-full" title={$_.paste} onclick={Paste}>
						<ClipboardPaste style="width: 22px; height: 22px" />
					</Button>
					<Button variant="ghost" size="lg" class="px-3 rounded-full text-xl" title={$_.input_egyptian.add_cartouche}
						disabled={!IME.CanMakeCartouche($focusedEgyptianInput.Get())}
						onclick={() => Execute(IME.CommandKind.Cartouche)}
					>
						<EgyptianText t={[c(h(v(g("𓂋"), g("𓈖")), g("𓀀")))]} />
					</Button>
					<Button variant="ghost" size="icon-lg" class="px-3 rounded-full text-xl" title={$_.input_egyptian.gardiner_symbol_table._}
						onclick={() => gardinerTablePromptOnSelect.set(symbol => Execute(IME.CommandKind.Insert, g(symbol)))}
					>
						{$_.input_egyptian.gardiner_symbol_table.abbr}
					</Button>
				</div>
				<Button variant="ghost" size="icon-lg" class="rounded-full" onclick={() => focusedEgyptianInput.set(null)}>
					<Check style="width: 26px; height: 26px" />
				</Button>
			</div>
		</div>
		<div class="p-2 rounded-t-xl shadow bg-neutral-200/80 dark:bg-neutral-950/90 border-t border-foreground/10 backdrop-blur-md flex flex-col gap-2">
			{#if view == View.Letter}
				{@render LetterLayout($focusedEgyptianInput.Get())}
			{:else if view == View.Number}
				{@render NumberLayout($focusedEgyptianInput.Get())}
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	@keyframes slide-up {
		from {
			bottom: -100%;
		}
		to {
			bottom: env(safe-area-inset-bottom);
		}
	}

	@keyframes slide-down {
		from {
			bottom: env(safe-area-inset-bottom);
		}
		to {
			bottom: -100%;
		}
	}

	#virtual-egyptian-keyboard {
		animation: slide-up 0.4s cubic-bezier(0,1,.4,1);
		&:global([inert]) {
			animation: slide-down 0.4s cubic-bezier(0,.2,.8,1);
		}
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
