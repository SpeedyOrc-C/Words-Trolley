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

export enum HieroglyphsFont
{
	NewGardiner = "new-gardiner",
	SemiessessiColourful = "semiessessi-colourful",
}

export interface ISettings
{
	Language: Language | "auto"
	MandarinScript: MandarinScript
	EgyptianTransliteration: EgyptianTransliteration
	HieroglyphsFont: HieroglyphsFont
	PreferredVoice: Record<Language, string | null>
}

export const defaultSettings: ISettings = {
	Language: "auto",
	MandarinScript: MandarinScript.Pinyin,
	EgyptianTransliteration: EgyptianTransliteration.ManuelDeCodage,
	HieroglyphsFont: HieroglyphsFont.NewGardiner,
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

function WarnCannotFind(key: string)
{
	console.warn(`Cannot find ${key} in settings, now use default.`)
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
		WarnCannotFind("Language")

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
		WarnCannotFind("MandarinScript")

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
		WarnCannotFind("EgyptianTransliteration")

	if ("HieroglyphsFont" in x)
	{
		const hieroglyphsFont = x.HieroglyphsFont

		if (typeof hieroglyphsFont == "string" &&
			-1 != Object.values(HieroglyphsFont).indexOf(hieroglyphsFont as HieroglyphsFont))
		{
			settings.HieroglyphsFont = hieroglyphsFont as HieroglyphsFont
		}
	}
	else
		WarnCannotFind("HieroglyphsFont")

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
		WarnCannotFind("PreferredVoice")

	return settings
}
