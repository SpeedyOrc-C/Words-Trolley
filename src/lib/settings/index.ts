import {Language} from "$lib/i18n"

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
