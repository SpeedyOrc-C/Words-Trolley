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
	import {English, French, German, Japanese, Mandarin} from "$lib/word"
	import {FuriganaTemplateFromWord} from "$lib/word/japanese"
	import SelectFrenchCategory from "./SelectFrenchCategory.svelte"
	import SelectJapaneseCategory from "./SelectJapaneseCategory.svelte"
	import SelectMandarinRegion from "./SelectMandarinRegion.svelte"

	let {
		word = $bindable(),
		saved = $bindable(),
		onchange: _onchange,
	}: {
		word: Word
		saved: boolean
		onchange: (word: Word) => any
	} = $props()

	let wordType = $state(word.type)

	function OnCardChange()
	{
		if (word.type == WordType.Egyptian && wordType == WordType.Egyptian)
			_onchange({
				...structuredClone(blankWordFromType[wordType]),
				word: word.word,
				meaning: word.meaning,
			})
		else if (word.type != WordType.Egyptian && wordType == WordType.Japanese)
			_onchange({
				...structuredClone(blankWordFromType[wordType]),
				word: word.word,
				meaning: word.meaning,
				furi: FuriganaTemplateFromWord(word.word),
			})
		else if ((word.type != WordType.Egyptian && wordType != WordType.Egyptian))
			_onchange({
				...structuredClone(blankWordFromType[wordType]),
				word: word.word,
				meaning: word.meaning,
			})
		else
			_onchange({
				...structuredClone(blankWordFromType[wordType]),
				meaning: word.meaning,
			})

		saved = false
	}

	function OnFrenchCategoryChange(category: French.Category)
	{
		if (word.type != WordType.French)
			throw "Category change must not change the type."

		_onchange({
			...structuredClone(blankWordFromTypeAndCategory.french[category]),
			word: word.word,
			meaning: word.meaning,
		})

		saved = false
	}

	function OnGermanCategoryChange(category: German.Category)
	{
		if (word.type != WordType.German)
			throw "Category change must not change the type."

		_onchange({
			...structuredClone(blankWordFromTypeAndCategory.german[category]),
			word: word.word,
			meaning: word.meaning,
		})

		saved = false
	}

	function OnJapaneseCategoryChange(category: Japanese.Category)
	{
		if (word.type != WordType.Japanese)
			throw "Category change must not change the type."

		_onchange({
			...structuredClone(blankWordFromTypeAndCategory.japanese[category]),
			word: word.word,
			meaning: word.meaning,
			furi: word.furi,
		})

		saved = false
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
