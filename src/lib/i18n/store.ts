import type {LivingLanguage} from "."
import type {I18nTemplate} from "./I18nTemplate"
import {Language} from "./Language"
import _EnGb from "./locale/EnGb"
import _ZhCn from "./locale/ZhCn"
import _JaJp from "./locale/JaJp"
import _Ar from "./locale/Ar"
import {PopulateLanguagePacks} from "crazy-i18n/unify"
import {derived, writable} from "svelte/store"

const {ZhCn, EnGb, JaJp, Ar} = PopulateLanguagePacks({ZhCn: _ZhCn, EnGb: _EnGb, JaJp: _JaJp, Ar: _Ar as I18nTemplate})

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
