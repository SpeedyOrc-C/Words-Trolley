import {Validate as ValidateHieroglyphs} from "./hieroglyphs"
import {Validate as ValidateTransliteration} from "./transliteration"
import {type Word} from "."
import {WordType} from "../types"
import {array, eq, obj, type Validator} from "crazy-parser/json/validate"

export const Validate: Validator<Word> = obj({
	type: eq(WordType.Egyptian as const),
	word: array(ValidateHieroglyphs),
	trans: ValidateTransliteration,
})
