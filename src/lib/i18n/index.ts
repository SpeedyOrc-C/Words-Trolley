import {derived, writable} from "svelte/store";
import {TranslatorFrom} from "crazy-i18n";
import {ZhCn} from "$lib/i18n/locale/ZhCn";
import {EnGb} from "$lib/i18n/locale/EnGb";

export enum Language
{
    ZhCn = "zh-CN",
    EnGb = "en-GB",
}

export const language = writable<Language | undefined | null>(null)

export const _ = derived(language, language =>
{
    switch (language)
    {
    case Language.ZhCn:
        return TranslatorFrom(ZhCn)
    case Language.EnGb:
        return TranslatorFrom(EnGb)
    case undefined:
        return (x: string) => x
    case null:
        return () => ""
    }
})
