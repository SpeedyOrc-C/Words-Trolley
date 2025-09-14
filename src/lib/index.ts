import {English, French, German, Japanese, Mandarin, Egyptian} from "$lib/word"
import type {Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
import { Language } from "./i18n"

export type Word = Metadata & { meaning: string }

type Metadata
	= SimpleWord
	| EnglishWord
	| MandarinWord
	| FrenchWord
	| FrenchNoun
	| GermanWord
	| GermanNoun
	| JapaneseWord
	| JapaneseVerb
	| EgyptianWord

export type SimpleWord = {
	type: WordType.Simple
	word: string
}

export type EnglishWord = {
	type: WordType.English
	word: string
	region: English.Region
}

export type MandarinWord = {
	type: WordType.Mandarin
	word: string
	region: Mandarin.Region
	syllables: Mandarin.ISyllable[]
}

export type FrenchWord = {
	type: WordType.French
	word: string
	category: French.Category.Word
}

export type FrenchNoun = {
	type: WordType.French
	word: string
	category: French.Category.Noun
	gender: French.Gender
}

export type GermanWord = {
	type: WordType.German
	word: string
	category: German.Category.Word
}

export type GermanNoun = {
	type: WordType.German
	word: string
	category: German.Category.Noun
	gender: German.Gender
}

export type JapaneseWord = {
	type: WordType.Japanese
	word: string
	category: Japanese.Category.Word
	furi: [number, number, string][]
	tone: number
}

export type JapaneseVerb = {
	type: WordType.Japanese
	word: string
	category: Japanese.Category.Verb
	furi: [number, number, string][]
	tone: number
	verb_type: Japanese.VerbType
}

export type EgyptianWord = {
	type: WordType.Egyptian
	word: Hieroglyphs[]
	trans: Egyptian.Phoneme[]
}

export enum WordType
{
	// TODO: Remove this "simple" type
	Simple = "simple",
	English = "english",
	Mandarin = "mandarin",
	Japanese = "japanese",
	French = "french",
	German = "german",
	Egyptian = "egyptian",
}

const baseWord = {
	meaning: "",
}

export const blankWordSimple: Word = {
	...baseWord,
	word: "",
	type: WordType.Simple,
}

export const blankWordEnglish: Word = {
	...baseWord,
	word: "",
	type: WordType.English,
	region: English.Region.GB,
}

const blankWordMandarin: Word = {
	...baseWord,
	word: "",
	type: WordType.Mandarin,
	region: Mandarin.Region.PRC,
	syllables: [],
}

const blankWordFrench: Word = {
	...baseWord,
	word: "",
	type: WordType.French,
	category: French.Category.Word,
}

const blankWordFrenchNoun: Word = {
	...blankWordFrench,
	category: French.Category.Noun,
	gender: French.Gender.M,
}

const blankWordGerman: Word = {
	...baseWord,
	word: "",
	type: WordType.German,
	category: German.Category.Word,
}

const blankWordGermanNoun: Word = {
	...blankWordGerman,
	category: German.Category.Noun,
	gender: German.Gender.M
}

const blankWordJapanese: Word = {
	...baseWord,
	word: "",
	type: WordType.Japanese,
	category: Japanese.Category.Word,
	furi: [],
	tone: 0,
}

const blankWordJapaneseVerb: Word = {
	...blankWordJapanese,
	word: "",
	category: Japanese.Category.Verb,
	verb_type: Japanese.VerbType.Vowel,
}

const blankWordEgyptian: Word = {
	...baseWord,
	word: [],
	type: WordType.Egyptian,
	trans: [],
}

export const blankWordFromTypeAndCategory = {
	[WordType.Simple]: blankWordSimple,
	[WordType.English]: blankWordEnglish,
	[WordType.Mandarin]: blankWordMandarin,
	[WordType.French]: {
		[French.Category.Word]: blankWordFrench,
		[French.Category.Noun]: blankWordFrenchNoun,
	},
	[WordType.German]: {
		[German.Category.Word]: blankWordGerman,
		[German.Category.Noun]: blankWordGermanNoun,
	},
	[WordType.Japanese]: {
		[Japanese.Category.Word]: blankWordJapanese,
		[Japanese.Category.Verb]: blankWordJapaneseVerb,
	}
} as const

export const blankWordFromType = {
	[WordType.Simple]: blankWordSimple,
	[WordType.English]: blankWordEnglish,
	[WordType.Mandarin]: blankWordMandarin,
	[WordType.French]: blankWordFrench,
	[WordType.German]: blankWordGerman,
	[WordType.Japanese]: blankWordJapanese,
	[WordType.Egyptian]: blankWordEgyptian,
} as const

export function LangFromWord(word: Word)
{
	switch (word.type)
	{
	case WordType.English:
		switch (word.region)
		{
		case English.Region.GB:
			return Language.EnGb
		case English.Region.US:
			return Language.EnUs
		}
	case WordType.Mandarin:
		switch (word.region)
		{
		case Mandarin.Region.PRC:
			return Language.ZhCn
		case Mandarin.Region.ROC:
			return Language.ZhTw
		}
	case WordType.French:
		return Language.FrFr
	case WordType.German:
		return Language.DeDe
	case WordType.Japanese:
		return Language.JaJp
	default:
		return ""
	}
}

export function CanSpeak(type: WordType): boolean
{
	return type != WordType.Simple && type != WordType.Egyptian
}

export function UsesStringInput(type: WordType): boolean
{
	return type != WordType.Egyptian
}
