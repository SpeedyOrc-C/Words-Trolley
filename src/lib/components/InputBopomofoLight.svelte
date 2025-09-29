<script lang="ts" module>
	import {pBopomofo} from "$lib/word/mandarin/parser/bopomofo"
	import {eof, space} from "crazy-parser"
	import {many, some} from "crazy-parser/prefix"
	import {Label} from "$lib/components/ui/label"
	import {Input} from "$lib/components/ui/input"

	const parser =
		pBopomofo
			.and(many(some(space).$_(pBopomofo)))._$(eof)
			.map(x => [x[0], ...x[1]])
</script>

<script lang="ts">
	import {Bopomofo, type ISyllable} from "$lib/word/mandarin"
	import {bopomofoOverrider} from "$lib/MandarinInputOverrider"

	let {
		value = $bindable(),
		onchange: _onchange = () => {},
		placeholder = "",
	}: {
		value: ISyllable[]
		onchange: () => void
		placeholder: string
	} = $props()

	const initValue = value.map(Bopomofo).join(" ")

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

	function onfocusout()
	{
		if (! input)
			return

		if (! error)
			input.value = value.map(Bopomofo).join(" ")
	}
</script>

<div class="flex flex-col gap-2">

	<Label>{placeholder}</Label>

	<Input
		bind:ref={input}
		autocapitalize="off"
		autocomplete="off"
		autocorrect="off"
		value={initValue}
		class="input text-lg w-full"
		aria-invalid={error}
		{onchange}
		onkeydown={bopomofoOverrider.OnKeyDown}
		{onfocusout}
		{placeholder}
		type="text"
	/>

</div>
