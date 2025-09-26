import {Language} from "$lib/i18n/Language"
import {language} from "$lib/i18n/store"

export type LivingLanguage
	= Language.ZhCn
	| Language.ZhTw
	| Language.EnGb
	| Language.EnUs
	| Language.JaJp
	| Language.FrFr
	| Language.DeDe

export const LivingLanguages = [
	Language.ZhCn,
	Language.ZhTw,
	Language.EnGb,
	Language.EnUs,
	Language.JaJp,
	Language.FrFr,
	Language.DeDe,
] as const

export function AutoDetectLanguage(lang: string)
{
	switch (lang)
	{
	case "zh":
	case "zh-CN":
	case "zh-HK":
	case "zh-TW":
		language.set(Language.ZhCn)
		break
	default:
		language.set(Language.EnGb)
	}
}
