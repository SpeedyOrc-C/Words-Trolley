import type {Word} from "$lib/word"
import {WordType} from "$lib/word/types"
import {ands, obj, eq, type Validator, str, asum} from "crazy-parser/json/validate"
import * as Mandarin from "$lib/word/mandarin/validate"
import * as English from "$lib/word/english/validate"

export const ValidateSimpleWord = obj({
	type: eq(WordType.Simple as const),
	word: str,
})

export const Validate: Validator<Word> = ands(
	obj({meaning: str}),
	asum(
		ValidateSimpleWord,
		Mandarin.Validate,
		English.Validate,
	),
)
