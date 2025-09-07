<script lang="ts" module>
	import {pAsciiChen} from "$lib/word/egyptian/transliteration/ascii-chen"
	import {eof} from "crazy-parser"
	import {Input} from "$lib/components/ui/input"

	const parser = pAsciiChen.many()._$(eof)
</script>

<script lang="ts">
	import type {Phoneme} from "$lib/word/egyptian"
	import type {HieroglyphsEditCommand} from "$lib/word/egyptian/hieroglyphs"
	import {Phoneme2AsciiChen} from "$lib/word/egyptian/transliteration/ascii-chen"

	let {
		value = $bindable([]),
		onchange: _onchange = () => {},
		placeholder = "",
		disabled = false,
		allowCommands = false,
		OnCommand,
		OnSelect,
	}: {
		value?: Phoneme[]
		onchange?: () => void
		placeholder?: string
		disabled?: boolean
		allowCommands?: boolean
		OnCommand?: (command: HieroglyphsEditCommand) => void
		OnSelect?: (index: number) => void
	} = $props()

	const initValue = value.map(x => Phoneme2AsciiChen[x]).join("")

	let input: HTMLInputElement = null as any
	let error = $state(false)

	function oninput()
	{
		if (OnCommand != undefined && input.value.length == 2)
		{
			const rawOperation = input.value[0]
			const count = parseInt(input.value[1])

			if (! Number.isNaN(count))
			{
				if (rawOperation == "-")
				{
					OnCommand(["row", count])
					input.value = ""
					return
				}
				else if (rawOperation == "=")
				{
					OnCommand(["column", count])
					input.value = ""
					return
				}
			}
		}

		if (OnSelect != undefined && input.value.length >= 2)
		{
			const lastChar = input.value[input.value.length - 1]

			if (lastChar == " ")
			{
				OnSelect(1)
				input.value = ""
				value = []
				return
			}

			const lastDigit = parseInt(lastChar)

			if (! Number.isNaN(lastDigit) && lastDigit != 0)
			{
				OnSelect(lastDigit)
				input.value = ""
				value = []
				return
			}
		}

		if (input.value == "-" || input.value == "=")
		{
			error = false
			return
		}

		const syllables = parser.eval(input.value.trim())

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

	function onkeydown(e: KeyboardEvent)
	{
		if (OnCommand == undefined)
			return

		if (e.code == "ArrowLeft" && input.selectionEnd == 0)
		{
			e.preventDefault()
			OnCommand(["left"])
			return
		}

		if (e.code == "ArrowRight" && input.selectionStart == input.value.length)
		{
			e.preventDefault()
			OnCommand(["right"])
			return
		}

		if (e.code == "Backspace" && input.value.length == 0)
		{
			e.preventDefault()
			OnCommand(["backspace"])
			return
		}
	}
</script>

<Input
	aria-invalid={error}
	autocapitalize="off"
	autocomplete="off"
	autocorrect="off"
	bind:ref={input}
	class="font-mono"
	{disabled}
	{oninput}
	{onkeydown}
	{placeholder}
	type="text"
	value={initValue}
/>
