import {type Word} from "."
import {Validate as ValidateEgyptian} from "./egyptian/validate"
import {Validate as ValidateEnglish} from "./english/validate"
import {Validate as ValidateFrench} from "./french/validate"
import {Validate as ValidateGerman} from "./german/validate"
import {Validate as ValidateJapanese} from "./japanese/validate"
import {Validate as ValidateMandarin} from "./mandarin/validate"
import {Validate as ValidateSimple} from "./simple/validate"
import {ands, array, asum, obj, str, type Validator} from "crazy-parser/json/validate"

const Validate: Validator<Word> = ands(
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

export const ValidateWords = array(Validate)
