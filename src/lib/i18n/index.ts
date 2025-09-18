import {Language} from "$lib/i18n/Language"
import _EnGb from "$lib/i18n/locale/EnGb"
import _ZhCn from "$lib/i18n/locale/ZhCn"
import {PopulateLanguagePacks} from "crazy-i18n/unify"
import {derived, writable} from "svelte/store"

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

export const language = writable<LivingLanguage>(Language.EnGb)

const {ZhCn, EnGb} = PopulateLanguagePacks({ZhCn: _ZhCn, EnGb: _EnGb})

export const _ = derived(language, language =>
{
	switch (language)
	{
	case Language.ZhCn:
		return ZhCn
	default:
		return EnGb
	}
})

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
