import {Category, type Verb, VerbType, type Word} from "$lib/word/japanese"
import {WordType} from "$lib/word/types"
import {array, asum, eq, num, obj, sequence, str, type Validator} from "crazy-parser/json/validate"

const ValidateFuri: Validator<[number, number, string][]> =
	array(sequence(num, num, str))

export const ValidateWord: Validator<Word> = obj({
	type: eq(WordType.Japanese as const),
	word: str,
	category: eq(Category.Word as const),
	furi: ValidateFuri,
})

export const ValidateNoun: Validator<Verb> = obj({
	type: eq(WordType.Japanese as const),
	word: str,
	category: eq(Category.Verb as const),
	furi: ValidateFuri,
	verb_type: asum(...Object.values(VerbType).map(eq))
})

export const Validate = asum(ValidateWord, ValidateNoun)
