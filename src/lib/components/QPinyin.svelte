<script lang="ts">
	import {Mandarin, type Word} from "$lib/word"
	import {onMount} from "svelte"
	import InputPinyin from "$lib/components/InputPinyin.svelte"
	import {type Writable, writable} from "svelte/store"

	const {word, OnWin}: { word: Word & Mandarin.Word, OnWin: () => any } = $props()

	const toneWriter: Writable<{ tone: Mandarin.Tone } | undefined> = writable(undefined)

	let visualViewportHeight = $state(0)
	let value: Array<Mandarin.ISyllable> = $state([])
	let showToneInput = $state(false)

	onMount(() =>
	{
		const setHeightInterval = setInterval(() =>
		{
			if (! showToneInput)
				return

			const vvp = window.visualViewport

			if (vvp == null)
				return

			visualViewportHeight = vvp.height
		}, 250)

		return () =>
		{
			clearInterval(setHeightInterval)
		}
	})

	$effect(() =>
	{
		if (Mandarin.SyllablesEqual(value, word.syllables))
			OnWin()
	})
</script>

<div class="w-fit m-auto">
	<InputPinyin
		bind:value
		length={word.syllables.length}
		onfocusin={() => showToneInput = true}
		onfocusout={() => showToneInput = false}
		{toneWriter}
	/>
</div>
