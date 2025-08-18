<script lang="ts">
	import type {Word} from "$lib/index"

	const {word, OnWin}: { word: Word, OnWin: () => any } = $props()

	let response = $state("")

	$effect(() =>
	{
		if (word.word == response.trim()) OnWin()
	})
</script>

<input type="text" required autofocus bind:value={response}
		 autocorrect="off" autocomplete="off" autocapitalize="off"
		 class="input input-lg block w-full max-w-80 text-3xl text-center"
>
