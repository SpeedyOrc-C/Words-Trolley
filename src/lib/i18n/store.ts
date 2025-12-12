import type {LivingLanguage} from "$lib/i18n"
import {Language} from "$lib/i18n/Language"
import _EnGb from "$lib/i18n/locale/EnGb"
import _ZhCn from "$lib/i18n/locale/ZhCn"
import _JaJp from "$lib/i18n/locale/JaJp"
import _Ar from "$lib/i18n/locale/Ar"
import {PopulateLanguagePacks} from "crazy-i18n/unify"
import {derived, writable} from "svelte/store"

const {ZhCn, EnGb, JaJp, Ar} = PopulateLanguagePacks({ZhCn: _ZhCn, EnGb: _EnGb, JaJp: _JaJp, Ar: _Ar})

export const language = writable<LivingLanguage>(Language.EnGb)

export const dir = derived(language, language =>
{
	switch (language)
	{
	case Language.Ar:
		return "rtl"
	default:
		return "ltr"
	}
})

export const _ = derived(language, language =>
{
	switch (language)
	{
	case Language.ZhCn:
		return ZhCn
	case Language.JaJp:
		return JaJp
	case Language.Ar:
		return Ar
	default:
		return EnGb
	}
})
