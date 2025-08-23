<script lang="ts">
	import {Input} from "$lib/components/ui/input"
	import type {Word} from "$lib"

	const {word, OnWin}: { word: Word, OnWin: () => any } = $props()

	let response = $state("")

	$effect(() =>
	{
		if (word.word == response.trim()) OnWin()
	})
</script>

<Input
	type="text" autofocus bind:value={response}
	autocorrect="off" autocomplete="off" autocapitalize="off"
	class="w-full max-w-80 text-center" style="font-size: 2rem"
/>
