<script lang="ts">
	import {Input} from "$lib/components/ui/input"
	import {SentenceTransliterationDumperOf, SentenceTransliterationParserOf, type SentenceTransliteration} from "$lib/word/egyptian/transliteration"
	import {EgyptianTransliteration} from "$lib/settings"
	import {settings} from "$lib/settings/store"

	let {
		value = $bindable([]),
		oninput: _oninput,
		placeholder = "",
		disabled = false,
		autofocus = false,
		id,
		class: _class = "",
		style = "",
		scheme = $settings.Egyptian.TransliterationForEdit,
	}: {
		value?: SentenceTransliteration
		oninput?: () => void
		placeholder?: string
		disabled?: boolean
		autofocus?: boolean
		id?: string
		class?: string
		style?: string
		scheme?: EgyptianTransliteration
	} = $props()

	const Dump = $derived(SentenceTransliterationDumperOf[scheme])
	const Parse = $derived(SentenceTransliterationParserOf[scheme])

	const initValue = $derived(Dump(value))

	let input: HTMLInputElement | null = $state(null)
	let error = $state(false)

	function oninput()
	{
		if (! input)
			return

		const syllables = Parse.eval(input.value.trim())

		if (syllables instanceof Error)
			error = true
		else
		{
			error = false
			value = syllables
			if (_oninput != undefined)
				_oninput()
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
	class="font-egy-trans {_class}"
	{disabled}
	{id}
	{oninput}
	{placeholder}
	spellcheck="false"
	{style}
	type="text"
	value={initValue}
/>
