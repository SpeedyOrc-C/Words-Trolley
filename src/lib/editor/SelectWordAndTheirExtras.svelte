<script lang="ts">
	import SelectWordType from "$lib/editor/SelectWordType.svelte"
	import {_} from "$lib/i18n"
	import {blankWordFromType, blankWordFromTypeAndCategory, WordType, type MandarinWord, type Word} from "$lib"
	import SelectFrenchCategory from "./SelectFrenchCategory.svelte"
	import {French, German, Mandarin} from "$lib/word"
	import SelectMandarinRegion from "./SelectMandarinRegion.svelte"
	import SelectGermanCategory from "$lib/editor/SelectGermanCategory.svelte"
	import * as Select from "$lib/components/ui/select"

	let {
		word = $bindable(),
		saved = $bindable(),
		i,
		onchange: _onchange,
	}: {
		word: Word
		saved: boolean
		i: number
		onchange: (word: Word) => any
	} = $props()

	let wordType = $state(word.type)

	function _WordType(t: WordType): string
	{
		switch (t)
		{
		case WordType.Simple:
			return $_.WordType.Simple
		case WordType.Mandarin:
			return $_.WordType.Mandarin
		case WordType.Japanese:
			return $_.WordType.Japanese
		case WordType.French:
			return $_.WordType.French
		case WordType.German:
			return $_.WordType.German
		}
	}

	function OnCardChange()
	{
		_onchange({
			...structuredClone(blankWordFromType[wordType]),
			word: word.word,
			meaning: word.meaning,
		})

		saved = false
	}

	function OnFrenchCategoryChange(category: French.Category)
	{
		_onchange({
			...structuredClone(blankWordFromTypeAndCategory.french[category]),
			word: word.word,
			meaning: word.meaning,
		})

		saved = false
	}

	function OnGermanCategoryChange(category: German.Category)
	{
		_onchange({
			...structuredClone(blankWordFromTypeAndCategory.german[category]),
			word: word.word,
			meaning: word.meaning,
		})
	}

	function OnMandarinRegionChange(word: Word & MandarinWord, region: Mandarin.Region)
	{
		word.region = region

		saved = false
	}
</script>

<fieldset class="w-full flex gap-2">

	<SelectWordType bind:value={wordType} onchange={OnCardChange} />

	{#if word.type === WordType.French}

		<SelectFrenchCategory
			value={word.category}
			onchange={OnFrenchCategoryChange}
		/>

	{:else if word.type === WordType.German}

		<SelectGermanCategory
			value={word.category}
			onchange={OnGermanCategoryChange}
		/>

	{:else if word.type === WordType.Mandarin}

		<SelectMandarinRegion
			value={word.region}
			onchange={region => OnMandarinRegionChange(word, region)}
		/>

	{/if}

</fieldset>
