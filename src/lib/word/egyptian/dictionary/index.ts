import {Equal} from "$lib/utils"
import {Phoneme, PhonemeStringEqual_FuzzySs} from "$lib/word/egyptian"
import Important from "$lib/word/egyptian/dictionary/important"
import Letter2 from "$lib/word/egyptian/dictionary/letter-2"
import Letter3 from "$lib/word/egyptian/dictionary/letter-3"
import LetterMore from "$lib/word/egyptian/dictionary/letter-more"
import {g, type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"

export function CandidatesFromPhonemes(phonemes: Phoneme[], fuzzySz = false): Hieroglyphs[]
{
	const input = phonemes.join("")

	const candidates: Hieroglyphs[] = []

	const _Equal = fuzzySz ? PhonemeStringEqual_FuzzySs : Equal

	if (phonemes.length == 1)
	{
		if (fuzzySz && (input == Phoneme.s || input == Phoneme.z))
		{
			candidates.push(g(Phoneme.s))
			candidates.push(g(Phoneme.z))
		}
		else
			candidates.push(g(input as any))
	}
	else if (phonemes.length == 2)
	{
		for (const [k, v] of Letter2)
			if (_Equal(v, input))
				candidates.push(g(k as any))
	}
	else if (phonemes.length == 3)
	{
		for (const [k, v] of Letter3)
			if (_Equal(v, input))
				candidates.push(g(k as any))
	}
	else
	{
		for (const [k, v] of LetterMore)
			if (_Equal(v, input))
				candidates.push(g(k as any))
	}

	for (const [k, v] of Important)
		if (_Equal(v, input))
			candidates.push(k)

	return candidates
}
