import {derived, writable} from "svelte/store"
import {ZhCn as _ZhCn} from "$lib/i18n/locale/ZhCn"
import {EnGb as _EnGb} from "$lib/i18n/locale/EnGb"
import {PopulateLanguagePacks} from "crazy-i18n/unify"

export enum Language
{
    ZhCn = "zh-CN",
    EnGb = "en-GB",
}

export const language = writable<Language>(Language.EnGb)

const {ZhCn, EnGb} = PopulateLanguagePacks({ZhCn: _ZhCn, EnGb: _EnGb})

export const _ = derived(language, language =>
{
    switch (language)
    {
    case Language.ZhCn:
        return ZhCn
    case Language.EnGb:
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
