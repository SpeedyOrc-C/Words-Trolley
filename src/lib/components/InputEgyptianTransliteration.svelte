<script lang="ts">
	import {
		preferredSentenceTransliterationDumperForEdit as Dump,
		preferredSentenceTransliterationParserForEdit as Parse,
	} from "$lib/settings/store/egyptian"
	import {Input} from "$lib/components/ui/input"
	import type {SentenceTransliteration} from "$lib/word/egyptian/transliteration"

	let {
		value = $bindable([]),
		onchange: _onchange,
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

	const initValue = $derived($Dump(value))

	let input: HTMLInputElement | null = $state(null)
	let error = $state(false)

	function oninput()
	{
		if (! input)
			return

		const syllables = $Parse.eval(input.value.trim())

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
	class="font-egy-trans {_class}"
	{disabled}
	{id}
	{oninput}
	{placeholder}
	spellcheck="false"
	style="font-size: 1.25rem; {style}"
	type="text"
	value={initValue}
/>
