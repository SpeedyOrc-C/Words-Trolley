<script lang="ts">
	import {CanSpeak, LangFromWord, type Word, WordType} from "$lib"
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import WordProgressNav from "$lib/components/WordProgressNav.svelte"
	import {_, Language, language} from "$lib/i18n"
	import {Button} from "$lib/components/ui/button"
	import {settings} from "$lib/settings/store"
	import {preferredEgyptianTransliterationDumper} from "$lib/settings/store/egyptian"
	import {French, German} from "$lib/word"
	import {BopomofoStrict, type ISyllable, Pinyin} from "$lib/word/mandarin"
	import {MandarinScript} from "$lib/settings"
	import {Speak} from "$lib/speak"

	import Circle from "@lucide/svelte/icons/circle"
	import Mars from "@lucide/svelte/icons/mars"
	import Venus from "@lucide/svelte/icons/venus"

	const {data} = $props()
	const words = data.set.words as Word[]

	let i = $state(0)
	let flipped = $state(false)

	const word = $derived(words[i])

	const description = $derived.by(() =>
	{
		switch ($language)
		{
		case Language.ZhCn:
			return `学习《${data.set.name}》中的单词。`
		case Language.EnGb:
			return `Learn the words in ${data.set.name}.`
		}
	})

	function Next()
	{
		flipped = false

		if (i < words.length - 1)
			i += 1
	}

	function Previous()
	{
		flipped = false

		if (i > 0)
			i -= 1
	}

	function Flip()
	{
		flipped = ! flipped
	}

	function RenderMandarinSyllable(s: ISyllable)
	{
		return $settings.MandarinScript == MandarinScript.Pinyin
			? Pinyin(s)
			: BopomofoStrict(s)
	}

	function onkeydown(e: KeyboardEvent)
	{
		// Shortcut keys only work when the user isn't focused on anything.
		if (e.target != document.body)
			return

		// Don't interfere with browser's default shortcuts.
		if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)
			return

		// Gamers, VIMers, and other keyboard warriors will appreciate this.
		switch (e.code)
		{
		case "ArrowLeft":
		case "ArrowUp":
		case "KeyA":
		case "KeyW":
		case "KeyK":
		case "KeyH":
			Previous()
			break

		case "ArrowRight":
		case "ArrowDown":
		case "KeyD":
		case "KeyS":
		case "KeyJ":
		case "KeyL":
			Next()
			break

		case "Space":
		case "Enter":
			Flip()
			break
		}
	}
</script>

<svelte:window onkeydown={onkeydown}/>

<svelte:head>
	<title>{$_.learn.title(data.set.name)}</title>
	<meta content={description} name="description">
</svelte:head>

<WordProgressNav index={i} progressTitle={$_.learn.progress} {words}/>

<main class="grow flex items-center justify-around px-4">

	{#if flipped}

		<div class="text-5xl select-all">
			{word.meaning}
		</div>

	{:else}

		{#if word.type === WordType.French && word.category === French.Category.Noun}

			<div class="flex flex-col items-center gap-4">

				<div class="text-5xl select-all" lang="fr-FR">
					{word.word}
				</div>

				<div class="flex items-center gap-2 text-xl opacity-60">
					{#if word.gender === French.Gender.M}
						<Mars/>
						<div>{$_.linguistics.abbr.masculine}</div>
					{:else}
						<Venus/>
						<div>{$_.linguistics.abbr.feminine}</div>
					{/if}
				</div>

			</div>

		{:else if word.type === WordType.German && word.category === German.Category.Noun}

			<div class="flex flex-col items-center gap-4">

				<div class="text-5xl select-all" lang="de-DE">
					{word.word}
				</div>

				<div class="flex items-center gap-2 text-xl opacity-60">
					{#if word.gender === German.Gender.M}
						<Mars/>
						<div>{$_.linguistics.abbr.masculine}</div>
					{:else if word.gender === German.Gender.F}
						<Venus/>
						<div>{$_.linguistics.abbr.feminine}</div>
					{:else}
						<Circle/>
						<div>{$_.linguistics.abbr.neutral}</div>
					{/if}
				</div>

			</div>

		{:else if word.type === WordType.Mandarin}

			<div class="select-all text-5xl" lang={LangFromWord(word)}>
				{#each word.word as char, i}
					<ruby>
						<span>{char}</span><rt>{RenderMandarinSyllable(word.syllables[i])}</rt>
					</ruby>
				{/each}
			</div>

		{:else if word.type === WordType.Japanese}

			<div class="select-all text-5xl" lang={LangFromWord(word)}>
				{#each word.furi as [start, length, furi]}
					{#if furi.length === 0}
						{word.word.slice(start, start + length)}
					{:else}
						<ruby>
							<span>{word.word.slice(start, start + length)}</span><rt>{furi}</rt>
						</ruby>
					{/if}
				{/each}
			</div>

		{:else if word.type === WordType.Egyptian}

			<div class="text-5xl" lang="egy">
				<ruby>
					<EgyptianText t={word.word}/>
					<rt>{word.trans.map(x => $preferredEgyptianTransliterationDumper[x]).join("")}</rt>
				</ruby>
			</div>

		{:else}

			<div class="text-5xl select-all" lang={LangFromWord(word)}>
				{word.word}
			</div>

		{/if}

	{/if}

</main>

<div class="w-full p-3 flex flex-col gap-3" id="control">

	<div class="flex gap-3">
		<Button
			class="h-24 text-xl flex-1"
			disabled={! CanSpeak(word.type)}
			onclick={() => $Speak(word)}
			variant="secondary"
		>
			{$_.learn.speak}
		</Button>

		<Button class="h-24 text-xl flex-1" onclick={Previous} variant="secondary">
			{$_.learn.previous}
		</Button>
	</div>

	<div class="flex gap-3">
		<Button class="h-24 text-xl flex-1" onclick={Flip} variant="secondary">
			{$_.learn.flip}
		</Button>

		<Button class="h-24 text-xl flex-1" onclick={Next} variant="outline">
			{$_.learn.next}
		</Button>
	</div>

</div>

<style>
	@reference "tailwindcss";

	rt {
		@apply select-none px-1;

		div[lang="egy"] & {
			@apply pb-4 font-mono text-4xl;
		}
	}
</style>
