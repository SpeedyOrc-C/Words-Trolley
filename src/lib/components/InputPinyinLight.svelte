<script lang="ts" module>
	import {pPinyinWithToneNumber} from "$lib/word/mandarin/parser/pinyin-with-tone-number"
	import {eof, space} from "crazy-parser"
	import {many, some} from "crazy-parser/prefix"
	import {Label} from "$lib/components/ui/label"
	import {Input} from "$lib/components/ui/input"

	const parser =
		pPinyinWithToneNumber
			.and(many(some(space).$_(pPinyinWithToneNumber)))._$(eof)
			.map(x => [x[0], ...x[1]])
</script>

<script lang="ts">
	import {type ISyllable, Pinyin, PinyinWithToneNumber} from "$lib/word/mandarin"
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

	const initValue = value.map(Pinyin).join(" ")

	let input: HTMLInputElement | null = $state(null)
	let error = $state(false)

	function onchange()
	{
		if (! input)
			return

		const syllables = parser.eval(input.value.trim().toLowerCase())

		if (syllables instanceof Error)
			error = true
		else
		{
			error = false
			value = syllables
			_onchange()
		}
	}

	function onfocusin()
	{
		if (! input)
			return

		if (! error)
			input.value = value.map(PinyinWithToneNumber).join(" ")
	}

	function onfocusout()
	{
		if (! input)
			return

		if (! error)
			input.value = value.map(Pinyin).join(" ")
	}
</script>

<div class="flex flex-col gap-2">

	<Label>{placeholder}</Label>

	<Input
		aria-invalid={error}
		autocapitalize="off"
		autocomplete="off"
		autocorrect="off"
		bind:ref={input}
		class="input text-lg w-full"
		{onchange}
		{onfocusin}
		{onfocusout}
		onkeydown={pinyinSyllablesOverrider.OnKeyDown}
		onkeyup={pinyinSyllablesOverrider.OnKeyUp}
		{placeholder}
		type="text"
		value={initValue}
	/>

</div>
