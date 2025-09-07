<script lang="ts">
	import {
		blankWordFromType,
		blankWordFromTypeAndCategory,
		type EnglishWord,
		type MandarinWord,
		type Word,
		WordType
	} from "$lib"
	import SelectEnglishRegion from "$lib/components/editor/SelectEnglishRegion.svelte"
	import SelectGermanCategory from "$lib/components/editor/SelectGermanCategory.svelte"
	import SelectWordType from "$lib/components/editor/SelectWordType.svelte"
	import {_} from "$lib/i18n"
	import {English, French, German, Japanese, Mandarin} from "$lib/word"
	import SelectFrenchCategory from "./SelectFrenchCategory.svelte"
	import SelectJapaneseCategory from "./SelectJapaneseCategory.svelte"
	import SelectMandarinRegion from "./SelectMandarinRegion.svelte"

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

	function OnJapaneseCategoryChange(category: Japanese.Category)
	{
		_onchange({
			...structuredClone(blankWordFromTypeAndCategory.japanese[category]),
			word: word.word,
			meaning: word.meaning,
		})
	}

	function OnMandarinRegionChange(word: Word & MandarinWord, region: Mandarin.Region)
	{
		word.region = region

		saved = false
	}

	function OnEnglishRegionChange(word: Word & EnglishWord, region: English.Region)
	{
		word.region = region

		saved = false
	}
</script>

<fieldset class="w-full flex gap-2 flex-wrap">

	<SelectWordType bind:value={wordType} onchange={OnCardChange}/>

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

	{:else if word.type === WordType.English}

		<SelectEnglishRegion
			value={word.region}
			onchange={region => OnEnglishRegionChange(word, region)}
		/>

	{:else if word.type === WordType.Japanese}

	   <SelectJapaneseCategory
			value={word.category}
			onchange={OnJapaneseCategoryChange}
		/>

	{/if}

</fieldset>
