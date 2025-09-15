import {Region, type Word} from "$lib/word/english"
import {WordType} from "$lib/word/types"
import {asum, eq, obj, str, type Validator} from "crazy-parser/json/validate"

export const Validate: Validator<Word> = obj({
	type: eq(WordType.English as const),
	word: str,
	region: asum(...Object.values(Region).map(eq)),
})
