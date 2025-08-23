<script lang="ts" module>
	import {WordType} from "$lib"

	function UseSimple(t: WordType): boolean
	{
		return t == WordType.Simple || t == WordType.English
	}
</script>

<script lang="ts">
	import {LangFromWord, type Words} from "$lib"
	import WordProgressNav from "$lib/components/WordProgressNav.svelte"
	import {_} from "$lib/i18n"
	import QSimple from "$lib/QSimple.svelte"
	import QPinyin from "$lib/QPinyin.svelte"
	import {Button} from "$lib/components/ui/button"

	const {data} = $props()
	const words = data.set.words as Words

	const score: Array<null | false | true> = $state(new Array(words.length).fill(null))

	let i = $state(0)
	let showAnswer = $state(false)

	const word = $derived(words[i])
	const hasNext = $derived(i < words.length - 1)

	function OnWin()
	{
		showAnswer = true
		score[i] = true
	}

	function ShowAnswer()
	{
		if (showAnswer)
			return

		showAnswer = true
		score[i] = false
	}

	function Next()
	{
		if (! hasNext)
			return

		showAnswer = false
		i += 1
	}

	function onkeydown(e: KeyboardEvent)
	{
		// Shortcut keys only work when the user isn't focused on anything.
		if (e.target != document.body)
			return

		// Don't interfere with browser's default shortcuts.
		if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)
			return

		switch (e.code)
		{
		case "Space":
		case "Enter":
			if (showAnswer)
				if (hasNext)
					Next()
				else
					Finish()
			else
				ShowAnswer()
			break
		}
	}

	function Finish()
	{

	}
</script>

<svelte:window onkeydown={onkeydown}/>

<svelte:head>
	<title>{$_.test.title(data.set.name)}</title>
</svelte:head>

<WordProgressNav index={i} {words} progressTitle={$_.test.progress}/>

<main class="mx-2">

	<div class="text-5xl text-center">
		{word.meaning}
	</div>

	<div class="h-4"></div>

	{#if showAnswer}
		<div lang={LangFromWord(word)} class="text-3xl text-center">
			{word.word}
		</div>
	{:else if UseSimple(word.type)}
		<QSimple {word} {OnWin}/>
	{:else if word.type === WordType.Mandarin}
		<QPinyin {word} {OnWin}/>
	{/if}

</main>

<div class="w-full p-3 flex flex-col gap-3">

	<!-- Language specific controls goes here...	-->

	{#if showAnswer}

		{#if hasNext}

			<Button onclick={Next} variant="secondary" class="w-full text-xl h-24">
				{$_.test.next}
			</Button>

		{:else}

			<Button onclick={Finish} class="w-full text-xl h-24">
				{$_.test.finish}
			</Button>
		{/if}

	{:else}

		<Button onclick={ShowAnswer} variant="secondary" class="w-full text-xl h-24">
			{$_.test.show_answer}
		</Button>

	{/if}

</div>
