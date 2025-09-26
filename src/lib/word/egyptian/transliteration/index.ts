import {Phoneme} from "$lib/word/egyptian"
import * as P from "crazy-parser"
import {type Validator, eq, asum, array} from "crazy-parser/json/validate"

export enum Punctuation
{
	Equal = "=",
	Minus = "-",
	Dot = ".",
	Space = " ",
}

export type SentenceTransliteration = (Phoneme | Punctuation)[]

export const pPunctuation = P.asum(Object.values(Punctuation).map(P.char))

export const Validate: Validator<SentenceTransliteration> =
	array(
		asum(
			asum(...Object.values(Phoneme).map(eq)),
			asum(...Object.values(Punctuation).map(eq)),
		)
	)
