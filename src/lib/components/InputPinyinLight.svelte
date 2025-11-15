<script lang="ts" module>
	import {pPinyinWithToneNumber} from "$lib/word/mandarin/parser/pinyin-with-tone-number"
	import {eof, space} from "crazy-parser"
	import {some} from "crazy-parser/prefix"

	const parser = ParseSep(pPinyinWithToneNumber, some(space))._$(eof)
</script>

<script lang="ts">
	import {type ISyllable, Pinyin, PinyinWithToneNumber, SyllablesEqual} from "$lib/word/mandarin"
	import InputWithCustomKeyMapping from "./InputWithCustomKeyMapping.svelte"
	import {ParseSep} from "$lib/utils"

	let {
		value = $bindable([]),
		onchange: _onchange = () => {},
		id,
		class: _class = ""
	}: {
		value: ISyllable[]
		onchange?: () => void
		id?: string
		class?: string
	} = $props()

	let _value = $derived(value.map(Pinyin).join(" "))
	let error = $state(false)

	$effect(() => { value; error = false })

	function onchange()
	{
		const syllables = parser.eval(_value.trim().toLowerCase())

		if (syllables instanceof Error)
			error = true
		else
		{
			error = false
			if (!SyllablesEqual(syllables, value))
			{
				value = syllables
				_onchange()
			}
		}
	}

	function onfocusin()
	{
		if (! error)
			_value = value.map(PinyinWithToneNumber).join(" ")
	}

	function onfocusout()
	{
		if (! error)
			_value = value.map(Pinyin).join(" ")
	}
</script>

<InputWithCustomKeyMapping
	aria-invalid={error}
	autocapitalize="off"
	autocomplete="off"
	autocorrect="off"
	class="text-lg {_class}"
	{id}
	{onchange}
	{onfocusin}
	{onfocusout}
	type="text"
	bind:value={_value}
	mapping={{"KeyV": "ü"}}
/>
