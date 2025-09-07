import {Language} from "$lib/i18n"
import {writable} from "svelte/store"

export const SettingsKey = "words-trolley-settings"

export enum MandarinScript
{
	Pinyin = "pinyin",
	Bopomofo = "bopomofo",
}

export enum EgyptianTransliteration
{
	Egyptology = "egyptology",
	ManuelDeCodage = "mdc",
	Chen = "chen",
}

export interface ISettings
{
	Language: Language | "auto"
	MandarinScript: MandarinScript
	EgyptianTransliteration: EgyptianTransliteration
	PreferredVoice: {
		[key in Language]: string | null
	}
}

export const settings = writable<ISettings>({
	Language: "auto",
	MandarinScript: MandarinScript.Pinyin,
	EgyptianTransliteration: EgyptianTransliteration.ManuelDeCodage,
	PreferredVoice: {
		[Language.ZhCn]: null,
		[Language.ZhTw]: null,
		[Language.EnGb]: null,
		[Language.EnUs]: null,
		[Language.JaJp]: null,
		[Language.FrFr]: null,
		[Language.DeDe]: null,
	}
})

export const mandarinScript = writable(MandarinScript.Pinyin)

export const settingsOpened = writable(false)
