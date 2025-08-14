import type {Json} from "$lib/database.types"
import {French, German, Japanese, Mandarin} from "$lib/word"
import {VerbType} from "$lib/word/japanese";

export type Words = Array<Word>

export type Word = Meta & {
    word: string
    meaning: string
}

export type Meta
    = SimpleWord
    | MandarinWord
    | FrenchNoun
    | GermanNoun
    | JapaneseWord
    | JapaneseVerb

export type SimpleWord = {
    type: CardType.Simple
}

export type MandarinWord = {
    type: CardType.Mandarin
    syllables: Mandarin.ISyllable[]
}

export type FrenchNoun = {
    type: CardType.FrenchNoun
    gender: French.Gender
}

export type GermanNoun = {
    type: CardType.GermanNoun
    gender: German.Gender
}

export type JapaneseWord = {
    type: CardType.Japanese
    word_kana_only: string
    morae: Japanese.Mora[]
    tone: number
}

export type JapaneseVerb = {
    type: CardType.JapaneseVerb
    word_kana_only: string
    morae: Japanese.Mora[]
    tone: number
    verb_type: Japanese.VerbType
}

export enum CardType
{
    Simple = "simple",
    Mandarin = "mandarin",
    Japanese = "japanese",
    JapaneseVerb = "japanese-verb",
    FrenchNoun = "french-noun",
    GermanNoun = "german-noun",
}

const baseWord = {
    word: "",
    meaning: "",
}

export const blankWordSimple: Word = {
    ...baseWord,
    type: CardType.Simple,
}

const blankWordMandarin: Word = {
    ...baseWord,
    type: CardType.Mandarin,
    syllables: [],
}

const blankWordFrenchNoun: Word = {
    ...baseWord,
    type: CardType.FrenchNoun,
    gender: French.Gender.M
}

const blankWordGermanNoun: Word = {
    ...baseWord,
    type: CardType.GermanNoun,
    gender: German.Gender.M
}

const blankWordJapanese: Word = {
    ...baseWord,
    type: CardType.Japanese,
    word_kana_only: "",
    morae: [],
    tone: 0,
}

const blankWordJapaneseVerb: Word = {
    ...blankWordJapanese,
    type: CardType.JapaneseVerb,
    verb_type: VerbType.Consonant,
}

export const blankWordFromType: Record<CardType, Word> = {
    [CardType.Simple]: blankWordSimple,
    [CardType.Mandarin]: blankWordMandarin,
    [CardType.FrenchNoun]: blankWordFrenchNoun,
    [CardType.GermanNoun]: blankWordGermanNoun,
    [CardType.Japanese]: blankWordJapanese,
    [CardType.JapaneseVerb]: blankWordJapaneseVerb,
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
    case CardType.Simple:
        return true
    case CardType.Mandarin:
        return true
    case CardType.Japanese:
        return true
    case CardType.JapaneseVerb:
        return true
    case CardType.FrenchNoun:
        return true
    case CardType.GermanNoun:
        return true
    default:
        return false
    }
}
