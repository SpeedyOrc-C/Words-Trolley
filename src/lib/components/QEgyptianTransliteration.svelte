<script lang="ts">
	import InputEgyptianTransliteration from "$lib/components/InputEgyptianTransliteration.svelte"
	import {preferredPhonemeEqual} from "$lib/settings/store/egyptian"
	import {Egyptian, type Word} from "$lib/word"

	const {word, OnWin}: { word: Word & Egyptian.Word, OnWin: () => any } = $props()

	let response: Egyptian.Phoneme[] = $state([])



	$effect(() =>
	{
		if (word.trans.length != response.length)
			return

		const length = word.trans.length

		for (let i = 0; i < length; i += 1)
			if (!($preferredPhonemeEqual(word.trans[i], response[i])))
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
