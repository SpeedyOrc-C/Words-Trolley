import type {Phoneme} from "$lib/word/egyptian"

export enum Punctuation
{
	Equal = "=",
	Minus = "-",
	Dot = ".",
	Space = " ",
}

type SentenceTransliterationUnit = Phoneme | Punctuation
