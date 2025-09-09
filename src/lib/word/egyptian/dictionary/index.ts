import type {Phoneme} from "$lib/word/egyptian"
import Important from "$lib/word/egyptian/dictionary/important"
import Letter2 from "$lib/word/egyptian/dictionary/letter-2"
import Letter3 from "$lib/word/egyptian/dictionary/letter-3"
import LetterMore from "$lib/word/egyptian/dictionary/letter-more"
import {g, type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"

export function CandidatesFromPhonemes(phonemes: Phoneme[]): Hieroglyphs[]
{
	const s = phonemes.join("")

	const candidates: Hieroglyphs[] = []

	if (phonemes.length == 1)
	{
		candidates.push(g(s as any))
	}
	else if (phonemes.length == 2)
	{
		for (const [k, v] of Letter2)
			if (v == s)
				candidates.push(g(k as any))
	}
	else if (phonemes.length == 3)
	{
		for (const [k, v] of Letter3)
			if (v == s)
				candidates.push(g(k as any))
	}
	else
	{
		for (const [k, v] of LetterMore)
			if (v == s)
				candidates.push(g(k as any))
	}

	for (const [k, v] of Important)
		if (v == s)
			candidates.push(k)

	return candidates
}
