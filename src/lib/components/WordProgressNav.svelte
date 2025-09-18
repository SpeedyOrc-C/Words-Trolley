<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {Progress} from "$lib/components/ui/progress"
	import {_} from "$lib/i18n"
	import {settingsOpened} from "$lib/settings/store"
	import type {Word} from "$lib/word"
	import {Phoneme2Egyptology} from "$lib/word/egyptian/transliteration/egyptology"
	import {WordType} from "$lib/word/types"

	const {
		index,
		words,
		id,
		progressTitle
	}: {
		index: number
		words: Word[]
		id: string
		progressTitle: string
	} = $props()

	const word = $derived(words[index])

	const wordArg = $derived.by(() =>
	{
		if (word.type == WordType.Egyptian)
			return word.trans.map(x => Phoneme2Egyptology[x]).join("")

		return word.word
	})

	const titleArg = $derived.by(() =>
	{
		if (word.type == WordType.Egyptian)
			return "#Egyptian"

		return ""
	})
</script>

<nav class="p-4 w-full flex flex-col gap-2">

	<Progress
		class="opacity-20" max={words.length}
		title={progressTitle} value={index + 1}
	/>

	<div class="flex items-center">

		<Button href="/word-set/{id}" variant="ghost">
			{$_.return}
		</Button>

		<Button
			href="https://en.wiktionary.org/w/index.php?search={encodeURIComponent(wordArg)}{titleArg}"
			target="_blank" variant="ghost"
		>
			Wiktionary
		</Button>

		<Button onclick={() => settingsOpened.set(true)} variant="ghost">
			{$_.settings._}
		</Button>

		<div class="text-right grow text-xl font-mono">
			{index + 1}<span class="text-foreground/50">/{words.length}</span>
		</div>

	</div>
</nav>
