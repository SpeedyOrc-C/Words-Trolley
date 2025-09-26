<script lang="ts">
	import {
		preferredSentenceTransliterationDumper,
		preferredSentenceTransliterationParser,
	} from "$lib/settings/store/egyptian"
	import {Input} from "$lib/components/ui/input"
	import type {SentenceTransliteration} from "$lib/word/egyptian/transliteration"

	let {
		value = $bindable([]),
		onchange: _onchange = () => {},
		placeholder = "",
		disabled = false,
		autofocus = false,
		id,
		class: _class = "",
		style = "",
	}: {
		value?: SentenceTransliteration
		onchange?: () => void
		placeholder?: string
		disabled?: boolean
		autofocus?: boolean
		id?: string
		class?: string
		style?: string
	} = $props()

	const initValue = $derived($preferredSentenceTransliterationDumper(value))

	let input: HTMLInputElement = null as any
	let error = $state(false)

	function oninput()
	{
		const syllables = $preferredSentenceTransliterationParser.eval(input.value.trim())

		if (syllables instanceof Error)
			error = true
		else
		{
			error = false
			value = syllables
			if (_onchange != undefined)
				_onchange()
		}
	}
</script>

<Input
	aria-invalid={error}
	autocapitalize="off"
	autocomplete="off"
	autocorrect="off"
	{autofocus}
	bind:ref={input}
	class="font-mono {_class}"
	{disabled}
	{id}
	{oninput}
	{placeholder}
	spellcheck="false"
	{style}
	type="text"
	value={initValue}
/>
