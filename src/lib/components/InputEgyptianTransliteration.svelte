<script lang="ts">
	import {
		preferredEgyptianTransliterationDumper,
		preferredEgyptianTransliterationParser
	} from "$lib/settings/store/egyptian"
	import type {Phoneme} from "$lib/word/egyptian"
	import {Input} from "$lib/components/ui/input"

	let {
		value = $bindable([]),
		onchange: _onchange = () => {},
		placeholder = "",
		disabled = false,
		autofocus = false,
		class: _class = "",
		style = "",
	}: {
		value?: Phoneme[]
		onchange?: () => void
		placeholder?: string
		disabled?: boolean
		autofocus?: boolean
		class?: string
		style?: string
	} = $props()

	const initValue = $derived(value.map(x => $preferredEgyptianTransliterationDumper[x]).join(""))

	let input: HTMLInputElement = null as any
	let error = $state(false)

	function oninput()
	{
		const syllables = $preferredEgyptianTransliterationParser.eval(input.value.trim())

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
	{oninput}
	{placeholder}
	spellcheck="false"
	{style}
	type="text"
	value={initValue}
/>
