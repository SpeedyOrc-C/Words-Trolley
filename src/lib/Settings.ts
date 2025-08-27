import {Language} from "$lib/i18n"
import {writable} from "svelte/store"

export const SettingsKey = "words-trolley-settings"

export enum MandarinScript
{
	Pinyin = "pinyin",
	Bopomofo = "bopomofo",
}

export interface ISettings
{
	Language: Language | "auto"
	MandarinScript: MandarinScript
	PreferredVoice: {
		[key in Language]: string | null
	}
}

export const settings = writable({
	Language: "auto",
	MandarinScript: MandarinScript.Pinyin,
	PreferredVoice: {
		[Language.ZhCn]: null,
		[Language.ZhTw]: null,
		[Language.EnGb]: null,
		[Language.EnUs]: null,
		[Language.JaJp]: null,
		[Language.FrFr]: null,
		[Language.DeDe]: null,
	}
} as ISettings)

export const mandarinScript = writable(MandarinScript.Pinyin)

export const settingsOpened = writable(false)
