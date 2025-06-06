import {asum, eq, nil} from "crazy-parser/json/validate"

export enum Language
{
	ZhCn = "zh-CN",
	ZhTw = "zh-TW",
	EnGb = "en-GB",
	EnUs = "en-US",
	JaJp = "ja-JP",
	FrFr = "fr-FR",
	DeDe = "de-DE",
	Ar = "ar",
	Egy = "egy",
}

export const ValidateLanguage =
	asum(...Object.values(Language).map(v => eq(v)))

export const ValidateMaybeLanguage =
	asum(ValidateLanguage, nil)
