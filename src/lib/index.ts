import * as Mandarin from "$lib/word/mandarin"
import * as French from "$lib/word/french"
import * as German from "$lib/word/german"
import * as Japanese from "$lib/word/japanese"
import type {Json} from "$lib/database.types"

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
    type: CardType.JapaneseVerb
    word_kana_only: string
    morae: Japanese.Mora[]
    tone: number
}

export type JapaneseVerb = JapaneseWord & {
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

export const blankWordSimple: Word = {
    type: CardType.Simple,
    word: "",
    meaning: "",
}

export const blankWordFrenchNoun: Word = {
    type: CardType.FrenchNoun,
    word: "",
    meaning: "",
    gender: French.Gender.M
}

export const blankWordGermanNoun: Word = {
    type: CardType.GermanNoun,
    word: "",
    meaning: "",
    gender: German.Gender.M
}

export const blankWordFromType: Record<CardType, Word> = {
    [CardType.Simple]: blankWordSimple,
    [CardType.FrenchNoun]: blankWordFrenchNoun,
    [CardType.GermanNoun]: blankWordGermanNoun,
}

export function TypeCheckWords(input: Json): boolean
{
    if (!(input instanceof Array))
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
