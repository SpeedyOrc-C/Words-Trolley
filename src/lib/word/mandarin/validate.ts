import {Final, Initial, type ISyllable, Region, Tone, type Word} from "$lib/word/mandarin"
import {WordType} from "$lib/word/types"
import {array, asum, eq, nil, obj, str, type Validator} from "crazy-parser/json/validate"

const ValidateSyllable: Validator<ISyllable> = obj({
	Initial: asum(nil, ...Object.values(Initial).map(eq)),
	Final: asum(...Object.values(Final).map(eq)),
	Tone: asum(...[Tone.Neutral, Tone.Flat, Tone.Rise, Tone.FallRise, Tone.Fall].map(eq))
})

export const Validate: Validator<Word> = obj({
	type: eq(WordType.Mandarin as const),
	word: str,
	region: asum(...Object.values(Region).map(eq)),
	syllables: array(ValidateSyllable),
})
