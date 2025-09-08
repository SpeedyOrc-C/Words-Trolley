<script lang="ts">
	import InputEgyptianTransliteration from "$lib/components/InputEgyptianTransliteration.svelte"
	import type {EgyptianWord, Word} from "$lib"
	import type {Phoneme} from "$lib/word/egyptian"

	const {word, OnWin}: { word: Word & EgyptianWord, OnWin: () => any } = $props()

	let response: Phoneme[] = $state([])

	$effect(() =>
	{
		if (word.trans.length != response.length)
			return

		const length = word.trans.length

		for (let i = 0; i < length; i += 1)
			if (word.trans[i] != response[i])
				return

		OnWin()
	})
</script>

<InputEgyptianTransliteration
	autofocus
	bind:value={response}
	class="w-full max-w-80 text-center"
	style="font-size: 2rem"
/>
