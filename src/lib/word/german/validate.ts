import {Category, Gender, type Noun, type Word} from "."
import {WordType} from "../types"
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
