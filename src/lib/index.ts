import * as Mandarin from "$lib/word/mandarin"
import * as French from "$lib/word/french"
import * as German from "$lib/word/german"

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

export type Japanese = {}

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
