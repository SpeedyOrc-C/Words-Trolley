import {Validate as ValidateHieroglyphs} from "$lib/word/egyptian/hieroglyphs"
import {Phoneme, type Word} from "$lib/word/egyptian"
import {WordType} from "$lib/word/types"
import {array, asum, eq, obj, type Validator} from "crazy-parser/json/validate"

export const Validate: Validator<Word> = obj({
	type: eq(WordType.Egyptian as const),
	word: array(ValidateHieroglyphs),
	trans: array(asum(...Object.values(Phoneme).map(eq))),
})
