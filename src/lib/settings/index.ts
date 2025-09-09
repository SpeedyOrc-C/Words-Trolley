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
	PreferredVoice: Record<Language, string | null>
}

export const defaultSettings: ISettings = {
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
}

export function ParseSettings(x: unknown): ISettings
{
	const settings = structuredClone(defaultSettings)

	if (typeof x != "object" || x === null)
		return settings

	if ("Language" in x)
	{
		const language = x.Language

		if (typeof language == "string" &&
			-1 != Object.values(Language).indexOf(language as Language))
		{
			settings.Language = language as Language
		}
	}
	else
		console.warn("Cannot find Language in settings.")

	if ("MandarinScript" in x)
	{
		const mandarinScript = x.MandarinScript

		if (typeof mandarinScript == "string" &&
			-1 != Object.values(MandarinScript).indexOf(mandarinScript as MandarinScript))
		{
			settings.MandarinScript = mandarinScript as MandarinScript
		}
	}
	else
		console.warn("Cannot find MandarinScript in settings.")

	if ("EgyptianTransliteration" in x)
	{
		const egyptianTransliteration = x.EgyptianTransliteration

		if (typeof egyptianTransliteration == "string" &&
			-1 != Object.values(EgyptianTransliteration).indexOf(egyptianTransliteration as EgyptianTransliteration))
		{
			settings.EgyptianTransliteration = egyptianTransliteration as EgyptianTransliteration
		}
	}
	else
		console.warn("Cannot find EgyptianTransliteration in settings.")

	if ("PreferredVoice" in x)
	{
		const preferredVoice = x.PreferredVoice

		if (typeof preferredVoice == "object" && preferredVoice !== null)
		{
			for (let lang of Object.values(Language))
			{
				if (! (lang in preferredVoice))
					continue

				const voice = (preferredVoice as Record<Language, unknown>)[lang]

				if (voice !== null && typeof voice != "string")
					continue

				settings.PreferredVoice[lang] = voice
			}
		}
	}
	else
		console.warn("Cannot find PreferredVoice in settings.")

	return settings
}
