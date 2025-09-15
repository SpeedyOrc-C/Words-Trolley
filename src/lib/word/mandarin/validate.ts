import {Region, ValidateSyllable, type Word} from "$lib/word/mandarin"
import {WordType} from "$lib/word/types"
import {array, asum, eq, obj, str, type Validator} from "crazy-parser/json/validate"

export const Validate: Validator<Word> = obj({
	type: eq(WordType.Mandarin as const),
	word: str,
	region: asum(...Object.values(Region).map(eq)),
	syllables: array(ValidateSyllable),
})
