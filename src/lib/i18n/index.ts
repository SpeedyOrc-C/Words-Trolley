import {derived, writable} from "svelte/store"
import _ZhCn from "$lib/i18n/locale/ZhCn"
import _EnGb from "$lib/i18n/locale/EnGb"
import {PopulateLanguagePacks} from "crazy-i18n/unify"

export enum Language
{
	ZhCn = "zh-CN",
	ZhTw = "zh-TW",
	EnGb = "en-GB",
	EnUs = "en-US",
	JaJp = "ja-JP",
	FrFr = "fr-FR",
	DeDe = "de-DE",
}

export const language = writable<Language>(Language.EnGb)

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
