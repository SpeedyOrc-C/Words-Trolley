import {Category, type Word, type Noun, Gender} from "$lib/word/french"
import {WordType} from "$lib/word/types"
import {eq, str, obj, type Validator, asum} from "crazy-parser/json/validate"

const ValidateWord: Validator<Word> = obj({
	type: eq(WordType.French as const),
	word: str,
	category: eq(Category.Word as const)
})

export const ValidateNoun: Validator<Noun> = obj({
	type: eq(WordType.French as const),
	word: str,
	category: eq(Category.Noun as const),
	gender: asum(...Object.values(Gender).map(eq))
})

export const Validate = asum(ValidateWord, ValidateNoun)
