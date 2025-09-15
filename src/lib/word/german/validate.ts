import {Category, Gender, type Noun, type Word} from "$lib/word/german"
import {WordType} from "$lib/word/types"
import {asum, eq, obj, str, type Validator} from "crazy-parser/json/validate"

const ValidateWord: Validator<Word> = obj({
	type: eq(WordType.German as const),
	word: str,
	category: eq(Category.Word as const),
})

export const ValidateNoun: Validator<Noun> = obj({
	type: eq(WordType.German as const),
	word: str,
	category: eq(Category.Noun as const),
	gender: asum(...Object.values(Gender).map(eq)),
})

export const Validate = asum(ValidateWord, ValidateNoun)
