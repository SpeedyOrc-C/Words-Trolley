import {WordType} from "$lib/word/types"
import {eq, obj, str} from "crazy-parser/json/validate"

export const Validate = obj({
	type: eq(WordType.Simple as const),
	word: str
})
