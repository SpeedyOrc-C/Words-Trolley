import {Region, type Word} from "."
import {WordType} from "../types"
import {asum, eq, obj, str, type Validator} from "crazy-parser/json/validate"

export const Validate: Validator<Word> = obj({
	type: eq(WordType.English as const),
	word: str,
	region: asum(...Object.values(Region).map(eq)),
})
