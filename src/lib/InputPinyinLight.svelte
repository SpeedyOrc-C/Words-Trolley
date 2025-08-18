<script lang="ts" module>
	import {pPinyinWithToneNumber} from "$lib/word/mandarin/parser/pinyin-with-tone-number"
	import {eof, space} from "crazy-parser"
	import {many, some} from "crazy-parser/prefix"

	const parser =
		pPinyinWithToneNumber
			.and(many(some(space).$_(pPinyinWithToneNumber)))._$(eof)
			.map(x => [x[0], ...x[1]])
</script>

<script lang="ts">
	import {type ISyllable, Syllable} from "$lib/word/mandarin"
	import {pinyinSyllablesOverrider} from "$lib/MandarinInputOverrider"

	let {
		value = $bindable(),
		onchange: _onchange = () => {},
		placeholder = "",
	}: {
		value: ISyllable[]
		onchange: () => void
		placeholder: string
	} = $props()

	const initValue = value.map(s => new Syllable(s.Initial, s.Final, s.Tone).Pinyin).join(" ")

	let input: HTMLInputElement
	let error = $state(false)

	function onchange()
	{
		console.log("changed", input.value)

		const syllables = parser.eval(input.value.trim().toLowerCase())

		if (syllables instanceof Error)
		{
			error = true
		}
		else
		{
			error = false
			value = syllables
			_onchange()
		}
	}

	function onfocusin()
	{
		if (! error)
			input.value = value.map(s => new Syllable(s.Initial, s.Final, s.Tone).PinyinWithToneNumber).join(" ")
	}

	function onfocusout()
	{
		if (! error)
			input.value = value.map(s => new Syllable(s.Initial, s.Final, s.Tone).Pinyin).join(" ")
	}
</script>

<label class="w-full floating-label">
	<span>{placeholder}</span>
	<input
		bind:this={input}
		autocapitalize="off"
		autocomplete="off"
		autocorrect="off"
		value={initValue}
		class="input text-lg w-full"
		class:input-error={error}
		{onchange}
		{onfocusin}
		{onfocusout}
		onkeydown={pinyinSyllablesOverrider.OnKeyDown}
		onkeyup={pinyinSyllablesOverrider.OnKeyUp}
		{placeholder}
		type="text"
	>
</label>
