<script lang="ts">
	import {Input} from "$lib/components/ui/input"

	import type {Word} from "$lib/word"

	const {word, OnWin}: { word: Word, OnWin: () => any } = $props()

	let response = $state("")

	$effect(() =>
	{
		if (word.word == response.trim()) OnWin()
	})
</script>

<Input
	autocapitalize="off" autocomplete="off" autocorrect="off"
	autofocus bind:value={response} class="w-full max-w-80 text-center"
	spellcheck="false"
	style="font-size: 2rem" type="text"
/>
