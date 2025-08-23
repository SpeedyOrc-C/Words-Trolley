<script lang="ts">
	import {Syllable, SyllablesEqual, Tone} from "$lib/word/mandarin"
	import {onMount} from "svelte"
	import InputPinyin from "$lib/components/InputPinyin.svelte"
	import {type Writable, writable} from "svelte/store"
	import type {MandarinWord, Word} from "$lib"

	const {word, OnWin}: { word: Word & MandarinWord, OnWin: () => any } = $props()

	const toneWriter: Writable<{ tone: Tone } | undefined> = writable(undefined)

	let visualViewportHeight = $state(0)
	let value: Array<Syllable> = $state([])
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
		if (SyllablesEqual(value, word.syllables))
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
