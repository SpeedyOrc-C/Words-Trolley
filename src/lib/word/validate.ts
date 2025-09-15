import {type Word} from "$lib/word"
import {Validate as ValidateEgyptian} from "$lib/word/egyptian/validate"
import {Validate as ValidateEnglish} from "$lib/word/english/validate"
import {Validate as ValidateFrench} from "$lib/word/french/validate"
import {Validate as ValidateGerman} from "$lib/word/german/validate"
import {Validate as ValidateJapanese} from "$lib/word/japanese/validate"
import {Validate as ValidateMandarin} from "$lib/word/mandarin/validate"
import {Validate as ValidateSimple} from "$lib/word/simple/validate"
import {ands, asum, obj, str, type Validator} from "crazy-parser/json/validate"

export const Validate: Validator<Word> = ands(
	obj({meaning: str}),
	asum(
		ValidateSimple,
		ValidateMandarin,
		ValidateEnglish,
		ValidateFrench,
		ValidateGerman,
		ValidateEgyptian,
		ValidateJapanese,
	),
)
