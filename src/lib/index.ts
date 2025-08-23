import type {Json} from "$lib/database.types"
import {English, French, German, Japanese, Mandarin} from "$lib/word"
import {VerbType} from "$lib/word/japanese"

export type Words = Array<Word>

export type Word = Metadata & {
	word: string
	meaning: string
}

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

export type SimpleWord = {
	type: WordType.Simple
}

export type EnglishWord = {
	type: WordType.English
	region: English.Region
}

export type MandarinWord = {
	type: WordType.Mandarin
	region: Mandarin.Region
	syllables: Mandarin.ISyllable[]
}

export type FrenchWord = {
	type: WordType.French
	category: French.Category.Word
}

export type FrenchNoun = {
	type: WordType.French
	category: French.Category.Noun
	gender: French.Gender
}

export type GermanWord = {
	type: WordType.German
	category: German.Category.Word
}

export type GermanNoun = {
	type: WordType.German
	category: German.Category.Noun
	gender: German.Gender
}

export type JapaneseWord = {
	type: WordType.Japanese
	category: Japanese.Category.Word
	word_kana_only: string
	morae: Japanese.Mora[]
	tone: number
}

export type JapaneseVerb = {
	type: WordType.Japanese
	category: Japanese.Category.Verb
	word_kana_only: string
	morae: Japanese.Mora[]
	tone: number
	verb_type: Japanese.VerbType
}

export enum WordType
{
	Simple = "simple",
	English = "english",
	Mandarin = "mandarin",
	Japanese = "japanese",
	French = "french",
	German = "german",
}

const baseWord = {
	word: "",
	meaning: "",
}

export const blankWordSimple: Word = {
	...baseWord,
	type: WordType.Simple,
}

export const blankWordEnglish: Word = {
	...baseWord,
	type: WordType.English,
	region: English.Region.GB,
}

const blankWordMandarin: Word = {
	...baseWord,
	type: WordType.Mandarin,
	region: Mandarin.Region.PRC,
	syllables: [],
}

const blankWordFrench: Word = {
	...baseWord,
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
	type: WordType.Japanese,
	category: Japanese.Category.Word,
	word_kana_only: "",
	morae: [],
	tone: 0,
}

const blankWordJapaneseVerb: Word = {
	...blankWordJapanese,
	type: WordType.Japanese,
	category: Japanese.Category.Verb,
	verb_type: VerbType.Consonant,
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
} as const

export function LangFromWord(word: Word)
{
	switch (word.type)
	{
	case WordType.Simple:
		return ""
	case WordType.English:
		switch (word.region)
		{
		case English.Region.GB:
			return "en-GB"
		case English.Region.US:
			return "en-US"
		}
	case WordType.Mandarin:
		switch (word.region)
		{
		case Mandarin.Region.PRC:
			return "zh-CN"
		case Mandarin.Region.ROC:
			return "zh-TW"
		}
	case WordType.French:
		return "fr-FR"
	case WordType.German:
		return "de-DE"
	case WordType.Japanese:
		return "ja-JP"
	}
}

export function Speak(word: Word)
{
	const utterance = new SpeechSynthesisUtterance(word.word)
	utterance.lang = LangFromWord(word)
	speechSynthesis.speak(utterance)
}

export function TypeCheckWords(input: Json): boolean
{
	if (! (input instanceof Array))
		return false

	return input.map(TypeCheckWord).reduce((a, b) => a && b, true)
}

function TypeCheckWord(input: Json): boolean
{
	if (typeof input != "object" || input === null || input instanceof Array)
		return false

	if (typeof input.word != "string")
		return false

	if (typeof input.meaning != "string")
		return false

	const type = input.type

	if (typeof type != "string")
		return false

	// TODO
	switch (type)
	{
	case WordType.Simple:
		return true
	case WordType.Mandarin:
		return true
	case WordType.Japanese:
		return true
	case WordType.French:
		return true
	case WordType.German:
		return true
	default:
		return false
	}
}
