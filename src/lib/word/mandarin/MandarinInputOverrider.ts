import {Final, type ISyllable} from "$lib/word/mandarin"
import {pPinyinWithToneNumber} from "$lib/word/mandarin/parser/pinyin-with-tone-number"
import {pBopomofo} from "$lib/word/mandarin/parser/bopomofo"

export type ShouldConfirm = boolean

export interface MandarinInputOverrider
{
	Parse(raw: string): ISyllable | null

	OnKeyDown(e: KeyboardEvent & {currentTarget: HTMLInputElement}): void

	OnKeyUp(e: KeyboardEvent & {currentTarget: HTMLInputElement}): ShouldConfirm
}

export class PinyinOverrider implements MandarinInputOverrider
{
	constructor(
		public readonly IsSingle: boolean = false,
	)
	{ }

	Parse(raw: string): ISyllable | null
	{
		const s = pPinyinWithToneNumber.eval(raw)

		if (s instanceof Error)
			return null

		if (s.Final == Final.E2 && s.Tone != 2 && s.Tone != 4)
			return null

		return s
	}

	OnKeyDown(e: KeyboardEvent & {currentTarget: HTMLInputElement}): void
	{
		const {key, currentTarget: t} = e

		if (key == "v" || key == "V")
		{
			e.preventDefault()
			InsertChar(t, "ü")
			return
		}

		if (key == "E")
		{
			e.preventDefault()
			InsertChar(t, "ê")
			return
		}

		if (key.length == 1 && "A" <= key && key <= "Z")
		{
			e.preventDefault()
			InsertChar(t, key.toLowerCase())
			return
		}
	}

	OnKeyUp(e: KeyboardEvent & {currentTarget: HTMLInputElement}): ShouldConfirm
	{
		const {currentTarget: t} = e

		if (this.IsSingle && t.value.endsWith(" "))
			t.value = t.value.slice(0, t.value.length - 1) + "0"

		return /[0-4]$/.test(t.value)
	}
}

export class BopomofoOverrider implements MandarinInputOverrider
{
	public static readonly KeyMapping: Record<string, string> = {
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

	constructor(
		public readonly IsSingle: boolean = false,
	)
	{ }

	Parse(raw: string): ISyllable | null
	{
		const s = pBopomofo.eval(raw)

		if (s instanceof Error)
			return null

		return s
	}

	OnKeyDown(e: KeyboardEvent & {currentTarget: HTMLInputElement}): void
	{
		if (e.metaKey || e.ctrlKey || e.altKey)
			return

		const {currentTarget: t} = e

		const bpmf = BopomofoOverrider.KeyMapping[e.code] as string | undefined

		if (bpmf == undefined)
			return

		e.preventDefault()

		InsertChar(t, bpmf)
	}

	OnKeyUp(e: KeyboardEvent & {currentTarget: HTMLInputElement}): ShouldConfirm
	{
		const {currentTarget: t} = e

		if (/[ˇˋˊ˙]$/.test(t.value))
			return true

		if (this.IsSingle && t.value.endsWith(" "))
		{
			t.value = t.value.slice(0, t.value.length - 1)
			return true
		}

		return false
	}
}

function InsertChar(t: HTMLInputElement, c: string)
{
	const oldStart = t.selectionStart
	const oldEnd = t.selectionEnd

	if (oldStart == null || oldEnd == null)
		return

	t.value = t.value.slice(0, oldStart) + c + t.value.slice(oldEnd)
	t.setSelectionRange(oldStart + 1, oldStart + 1)
	t.dispatchEvent(new InputEvent("change", {bubbles: true}))
}

export const pinyinSingleSyllableOverrider = new PinyinOverrider(true)
