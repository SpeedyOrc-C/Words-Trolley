import {type LivingLanguage, LivingLanguages} from "$lib/i18n"
import {Language} from "$lib/i18n/Language"
import {str, bool, obj, asum, type Validator, eq} from "crazy-parser/json/validate"

export const SettingsKey = "words-trolley-settings"

export interface ISettings
{
	Language: LivingLanguage | "auto"
	Learning: {
		ShowMeaningAndWordAtTheSameTime: boolean
		ShowPronunciation: boolean
	}
	Editor: {
		Autosave: boolean
	}
	MandarinScript: MandarinScript
	Egyptian: {
		HieroglyphsFont: HieroglyphsFont
		TransliterationForRead: EgyptianTransliteration
		TransliterationForEdit: EgyptianTransliteration
		FuzzySZ: boolean
	}
	PreferredVoice: Record<LivingLanguage, string | null>
}

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
	ChenNoCap = "chen-no-cap",
	Wiktionary = "wiktionary",
}

export enum HieroglyphsFont
{
	NewGardiner = "new-gardiner",
	SemiessessiColourful = "semiessessi-colourful",
}

export const defaultSettings: ISettings = {
	Language: "auto",
	Learning: {
		ShowMeaningAndWordAtTheSameTime: false,
		ShowPronunciation: true,
	},
	Editor: {
		Autosave: true,
	},
	MandarinScript: MandarinScript.Pinyin,
	Egyptian: {
		HieroglyphsFont: HieroglyphsFont.NewGardiner,
		TransliterationForRead: EgyptianTransliteration.Egyptology,
		TransliterationForEdit: EgyptianTransliteration.ManuelDeCodage,
		FuzzySZ: false,
	},
	PreferredVoice: {
		[Language.ZhCn]: null,
		[Language.ZhTw]: null,
		[Language.EnGb]: null,
		[Language.EnUs]: null,
		[Language.JaJp]: null,
		[Language.FrFr]: null,
		[Language.DeDe]: null,
		[Language.Ar]: null,
	}
}

export const ParseSettings: Validator<ISettings> = obj({
	Language: asum(...LivingLanguages.map(eq), eq("auto" as const)),
	Learning: obj({
		ShowMeaningAndWordAtTheSameTime: bool,
		ShowPronunciation: bool,
	}, defaultSettings.Learning),
	Editor: obj({
		Autosave: bool
	}, defaultSettings.Editor),
	MandarinScript: asum(...Object.values(MandarinScript).map(eq)),
	Egyptian: obj({
		HieroglyphsFont: asum(...Object.values(HieroglyphsFont).map(eq)),
		TransliterationForRead: asum(...Object.values(EgyptianTransliteration).map(eq)),
		TransliterationForEdit: asum(...Object.values(EgyptianTransliteration).map(eq)),
		FuzzySZ: bool,
	}, defaultSettings.Egyptian),
	PreferredVoice: obj({
		[Language.ZhCn]: asum(eq(null), str),
		[Language.ZhTw]: asum(eq(null), str),
		[Language.EnGb]: asum(eq(null), str),
		[Language.EnUs]: asum(eq(null), str),
		[Language.JaJp]: asum(eq(null), str),
		[Language.FrFr]: asum(eq(null), str),
		[Language.DeDe]: asum(eq(null), str),
		[Language.Ar]: asum(eq(null), str),
	}, defaultSettings.PreferredVoice),
}, defaultSettings)
