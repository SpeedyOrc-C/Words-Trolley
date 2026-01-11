<script lang="ts" module>
	import {pBopomofo} from "$lib/word/mandarin/parser/bopomofo"
	import {eof, space} from "crazy-parser"
	import {some} from "crazy-parser/prefix"
	import {ParseSep} from "$lib/utils"

	const parser = ParseSep(pBopomofo, some(space))._$(eof)

	const mapping: Record<string, string> = {
		"Digit1": "ㄅ",
		"KeyQ": "ㄆ",
		"KeyA": "ㄇ",
		"KeyZ": "ㄈ",
		"Digit2": "ㄉ",
		"KeyW": "ㄊ",
		"KeyS": "ㄋ",
		"KeyX": "ㄌ",
		"Digit3": "ˇ",
		"KeyE": "ㄍ",
		"KeyD": "ㄎ",
		"KeyC": "ㄏ",
		"Digit4": "ˋ",
		"KeyR": "ㄐ",
		"KeyF": "ㄑ",
		"KeyV": "ㄒ",
		"Digit5": "ㄓ",
		"KeyT": "ㄔ",
		"KeyG": "ㄕ",
		"KeyB": "ㄖ",
		"Digit6": "ˊ",
		"KeyY": "ㄗ",
		"KeyH": "ㄘ",
		"KeyN": "ㄙ",
		"Digit7": "˙",
		"KeyU": "ㄧ",
		"KeyJ": "ㄨ",
		"KeyM": "ㄩ",
		"Digit8": "ㄚ",
		"KeyI": "ㄛ",
		"KeyK": "ㄜ",
		"Comma": "ㄝ",
		"Digit9": "ㄞ",
		"KeyO": "ㄟ",
		"KeyL": "ㄠ",
		"Period": "ㄡ",
		"Digit0": "ㄢ",
		"KeyP": "ㄣ",
		"Semicolon": "ㄤ",
		"Slash": "ㄥ",
		"Minus": "ㄦ",
	}
</script>

<script lang="ts">
	import {Bopomofo, SyllablesEqual, type ISyllable} from "$lib/word/mandarin"
	import InputWithCustomKeyMapping from "./InputWithCustomKeyMapping.svelte"

	let {
		value = $bindable([]),
		onchange: _onchange = () => {},
		id,
		class: _class = "",
	}: {
		value?: ISyllable[]
		onchange?: () => void
		id?: string
		class?: string
	} = $props()

	let _value = $derived(value.map(Bopomofo).join(" "))
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
</script>

<InputWithCustomKeyMapping
	aria-invalid={error}
	autocapitalize="off"
	autocomplete="off"
	autocorrect="off"
	bind:value={_value}
	{id}
	class="text-lg {_class}"
	{onchange}
	type="text"
	{mapping}
/>
