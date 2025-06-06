import {MandarinScript} from "$lib/settings"
import {settings} from "$lib/settings/store/index"
import {BopomofoStrict, Final, Initial, Pinyin, type ISyllable} from "$lib/word/mandarin"
import {derived} from "svelte/store"

const MandarinDumperOf = {
	[MandarinScript.Pinyin]: Pinyin,
	[MandarinScript.Bopomofo]: BopomofoStrict,
}

export const preferredMandarinDumper =
	derived(settings, s => MandarinDumperOf[s.MandarinScript])

export const mandarinSpellingSampleText =
	derived(preferredMandarinDumper, f => MandarinSampleSyllables.map(f).join(" "))

export const MandarinSampleSyllables: ISyllable[] = [
	{Initial: Initial.N, Final: Final.I, Tone: 3},
	{Initial: Initial.H, Final: Final.Ao, Tone: 3},
	{Initial: Initial.Sh, Final: Final.I, Tone: 4},
	{Initial: Initial.J, Final: Final.Ie, Tone: 4},
] as const
