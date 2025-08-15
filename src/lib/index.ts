import type {Json} from "$lib/database.types"
import {French, German, Japanese, Mandarin} from "$lib/word"
import {VerbType} from "$lib/word/japanese"

export type Words = Array<Word>

export type Word = Meta & {
    word: string
    meaning: string
}

type Meta
    = SimpleWord
    | MandarinWord
    | FrenchWord
    | FrenchNoun
    | GermanWord
    | GermanNoun
    | JapaneseWord
    | JapaneseVerb

export type SimpleWord = {
    type: Card.Simple
}

export type MandarinWord = {
    type: Card.Mandarin
    region: Mandarin.Region
    syllables: Mandarin.ISyllable[]
}

export type FrenchWord = {
    type: Card.French
    category: French.Category.Word
}

export type FrenchNoun = {
    type: Card.French
    category: French.Category.Noun
    gender: French.Gender
}

export type GermanWord = {
    type: Card.German
    category: German.Category.Word
}

export type GermanNoun = {
    type: Card.German
    category: German.Category.Noun
    gender: German.Gender
}

export type JapaneseWord = {
    type: Card.Japanese
    category: Japanese.Category.Word
    word_kana_only: string
    morae: Japanese.Mora[]
    tone: number
}

export type JapaneseVerb = {
    type: Card.Japanese
    category: Japanese.Category.Verb
    word_kana_only: string
    morae: Japanese.Mora[]
    tone: number
    verb_type: Japanese.VerbType
}

export enum Card
{
    Simple = "simple",
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
    type: Card.Simple,
}

const blankWordMandarin: Word = {
    ...baseWord,
    type: Card.Mandarin,
    region: Mandarin.Region.PRC,
    syllables: [],
}

const blankWordFrench: Word = {
    ...baseWord,
    type: Card.French,
    category: French.Category.Word,
}

const blankWordFrenchNoun: Word = {
    ...blankWordFrench,
    category: French.Category.Noun,
    gender: French.Gender.M,
}

const blankWordGerman: Word = {
    ...baseWord,
    type: Card.German,
    category: German.Category.Word,
}

const blankWordGermanNoun: Word = {
    ...blankWordGerman,
    category: German.Category.Noun,
    gender: German.Gender.M
}

const blankWordJapanese: Word = {
    ...baseWord,
    type: Card.Japanese,
    category: Japanese.Category.Word,
    word_kana_only: "",
    morae: [],
    tone: 0,
}

const blankWordJapaneseVerb: Word = {
    ...blankWordJapanese,
    type: Card.Japanese,
    category: Japanese.Category.Verb,
    verb_type: VerbType.Consonant,
}

export const blankWordFromTypeAndCategory = {
    [Card.Simple]: blankWordSimple,
    [Card.Mandarin]: blankWordMandarin,
    [Card.French]: {
        [French.Category.Word]: blankWordFrench,
        [French.Category.Noun]: blankWordFrenchNoun,
    },
    [Card.German]: {
        [German.Category.Word]: blankWordGerman,
        [German.Category.Noun]: blankWordGermanNoun,
    },
    [Card.Japanese]: {
        [Japanese.Category.Word]: blankWordJapanese,
        [Japanese.Category.Verb]: blankWordJapaneseVerb,
    }
} as const

export const blankWordFromType = {
    [Card.Simple]: blankWordSimple,
    [Card.Mandarin]: blankWordMandarin,
    [Card.French]: blankWordFrench,
    [Card.German]: blankWordGerman,
    [Card.Japanese]: blankWordJapanese
} as const

export const langFromType = {
    [Card.Simple]: null,
    [Card.Mandarin]: {
        [Mandarin.Region.PRC]: "zh-CN",
        [Mandarin.Region.ROC]: "zh-TW",
    },
    [Card.French]: "fr",
    [Card.German]: "de",
    [Card.Japanese]: "ja",
} as const

export function LangFromWord(word: Word)
{
    switch (word.type)
    {
    case Card.Simple:
        return ""
    case Card.Mandarin:
        switch (word.region)
        {
        case Mandarin.Region.PRC:
            return "zh-CN"
        case Mandarin.Region.ROC:
            return "zh-TW"
        }
    case Card.French:
        return "fr"
    case Card.German:
        return "de"
    case Card.Japanese:
        return "ja"

    }
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
    case Card.Simple:
        return true
    case Card.Mandarin:
        return true
    case Card.Japanese:
        return true
    case Card.French:
        return true
    case Card.German:
        return true
    default:
        return false
    }
}
