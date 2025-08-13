import {Final, type Syllable} from "$lib/word/mandarin"
import {pPinyinWithToneNumber} from "$lib/word/mandarin/parser/pinyin-with-tone-number"
import {pBopomofo} from "$lib/word/mandarin/parser/bopomofo"


export type ShouldConfirm = boolean


export interface MandarinInputOverrider
{
    Parse(raw: string): Syllable | null

    OnKeyDown(e: KeyboardEvent & { currentTarget: HTMLInputElement }): void

    OnKeyUp(e: KeyboardEvent & { currentTarget: HTMLInputElement }): ShouldConfirm
}

class PinyinSingleSyllableOverrider implements MandarinInputOverrider
{
    Parse(raw: string): Syllable | null
    {
        const s = pPinyinWithToneNumber.eval(raw)

        if (s instanceof Error)
            return null

        if (s.Final == Final.E2 && s.Tone != 2 && s.Tone != 4)
            return null

        return s
    }

    OnKeyDown(e: KeyboardEvent & { currentTarget: HTMLInputElement }): void
    {
        const {key, currentTarget} = e

        if (key == "v" || key == "V")
        {
            e.preventDefault()
            InsertChar(currentTarget, "ü")
            return
        }

        if (key.length == 1 && "A" <= key && key <= "Z")
        {
            e.preventDefault()
            InsertChar(currentTarget, key.toLowerCase())
            return
        }
    }

    OnKeyUp(e: KeyboardEvent & { currentTarget: HTMLInputElement }): ShouldConfirm
    {
        const {currentTarget: t} = e

        const oldStart = t.selectionStart
        const oldEnd = t.selectionEnd

        if (t.value.includes("v"))
        {
            t.value = t.value.replaceAll("v", "ü")

            if (oldStart != null)
                t.selectionStart = oldStart

            if (oldEnd != null)
                t.selectionEnd = oldEnd
        }

        if (t.value.includes("E"))
        {
            t.value = t.value.replaceAll("E", "ê")

            if (oldStart != null)
                t.selectionStart = oldStart

            if (oldEnd != null)
                t.selectionEnd = oldEnd
        }

        if (t.value.endsWith(" "))
            t.value = t.value.slice(0, t.value.length - 1) + "0"

        return /[0-4]$/.test(t.value);
    }
}

class PinyinSyllablesOverrider implements MandarinInputOverrider
{
    Parse(raw: string): Syllable | null
    {
        const s = pPinyinWithToneNumber.eval(raw)

        if (s instanceof Error)
            return null

        if (s.Final == Final.E2 && s.Tone != 2 && s.Tone != 4)
            return null

        return s
    }

    OnKeyDown(e: KeyboardEvent & { currentTarget: HTMLInputElement }): void
    {
        const {key, currentTarget} = e

        if (key == "v" || key == "V")
        {
            e.preventDefault()
            InsertChar(currentTarget, "ü")
            return
        }

        if (key.length == 1 && "A" <= key && key <= "Z")
        {
            e.preventDefault()
            InsertChar(currentTarget, key.toLowerCase())
            return
        }
    }

    OnKeyUp(e: KeyboardEvent & { currentTarget: HTMLInputElement }): ShouldConfirm
    {
        const {currentTarget: t} = e

        const oldStart = t.selectionStart
        const oldEnd = t.selectionEnd

        if (t.value.includes("v"))
        {
            t.value = t.value.replaceAll("v", "ü")

            if (oldStart != null)
                t.selectionStart = oldStart

            if (oldEnd != null)
                t.selectionEnd = oldEnd
        }

        if (t.value.includes("E"))
        {
            t.value = t.value.replaceAll("E", "ê")

            if (oldStart != null)
                t.selectionStart = oldStart

            if (oldEnd != null)
                t.selectionEnd = oldEnd
        }

        return false;
    }
}

class BopomofoOverrider implements MandarinInputOverrider
{
    static KeyMapping: Array<[string, string]> = [
        ["Digit1", "ㄅ"],
        ["KeyQ", "ㄆ"],
        ["KeyA", "ㄇ"],
        ["KeyZ", "ㄈ"],
        ["Digit2", "ㄉ"],
        ["KeyW", "ㄊ"],
        ["KeyS", "ㄋ"],
        ["KeyX", "ㄌ"],
        ["Digit3", "ˇ"],
        ["KeyE", "ㄍ"],
        ["KeyD", "ㄎ"],
        ["KeyC", "ㄏ"],
        ["Digit4", "ˋ"],
        ["KeyR", "ㄐ"],
        ["KeyF", "ㄑ"],
        ["KeyV", "ㄒ"],
        ["Digit5", "ㄓ"],
        ["KeyT", "ㄔ"],
        ["KeyG", "ㄕ"],
        ["KeyB", "ㄖ"],
        ["Digit6", "ˊ"],
        ["KeyY", "ㄗ"],
        ["KeyH", "ㄘ"],
        ["KeyN", "ㄙ"],
        ["Digit7", "˙"],
        ["KeyU", "ㄧ"],
        ["KeyJ", "ㄨ"],
        ["KeyM", "ㄩ"],
        ["Digit8", "ㄚ"],
        ["KeyI", "ㄛ"],
        ["KeyK", "ㄜ"],
        ["Comma", "ㄝ"],
        ["Digit9", "ㄞ"],
        ["KeyO", "ㄟ"],
        ["KeyL", "ㄠ"],
        ["Period", "ㄡ"],
        ["Digit0", "ㄢ"],
        ["KeyP", "ㄣ"],
        ["Semicolon", "ㄤ"],
        ["Slash", "ㄥ"],
        ["Minus", "ㄦ"],
    ]

    Parse(raw: string): Syllable | null
    {
        const s = pBopomofo.eval(raw)

        if (s instanceof Error)
            return null

        return s
    }

    OnKeyDown(e: KeyboardEvent & { currentTarget: HTMLInputElement }): void
    {
        if (e.metaKey || e.ctrlKey || e.altKey)
            return

        const {currentTarget: t} = e

        for (const [key, bpmf] of BopomofoOverrider.KeyMapping)
        {
            if (e.code != key)
                continue

            e.preventDefault()

            InsertChar(t, bpmf)

            return
        }
    }

    OnKeyUp(e: KeyboardEvent & { currentTarget: HTMLInputElement }): ShouldConfirm
    {
        const {currentTarget: t} = e

        if (/[ˇˋˊ˙]$/.test(t.value))
            return true

        if (t.value.endsWith(" "))
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

    t.selectionStart = oldStart + 1
    t.selectionEnd = oldStart + 1
}

export const pinyinSingleSyllableOverrider = new PinyinSingleSyllableOverrider()
export const pinyinSyllablesOverrider = new PinyinSyllablesOverrider()
export const bopomofoOverrider = new BopomofoOverrider()
