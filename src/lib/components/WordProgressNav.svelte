<script lang="ts">
	import type {Words} from "$lib"
	import {Button} from "$lib/components/ui/button"
	import {Progress} from "$lib/components/ui/progress"
	import {settingsOpened} from "$lib/Settings"
	import {_} from "$lib/i18n"

	const {index, words, progressTitle}: { index: number, words: Words, progressTitle: string } = $props()
	const wordArg = $derived(encodeURIComponent(words[index].word))
</script>

<nav class="p-4 w-full flex flex-col gap-2">

	<Progress
		max={words.length} value={index + 1}
		title={progressTitle} class="opacity-20"
	/>

	<div class="flex items-center">

		<Button href="/" variant="ghost">
			{$_.home._}
		</Button>

		<Button
			href="https://en.wiktionary.org/w/index.php?search={wordArg}"
			target="_blank" variant="ghost"
		>
			Wiktionary
		</Button>

		<Button onclick={() => settingsOpened.set(true)} variant="ghost">
			{$_.settings._}
		</Button>

		<div class="text-right grow text-xl font-mono">
			{index + 1}<span class="opacity-60">/{words.length}</span>
		</div>

	</div>
</nav>
