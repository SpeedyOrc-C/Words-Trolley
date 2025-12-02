import {Phoneme} from "$lib/word/egyptian"
import Important from "$lib/word/egyptian/dictionary/important"
import Letter2 from "$lib/word/egyptian/dictionary/letter-2"
import Letter3 from "$lib/word/egyptian/dictionary/letter-3"
import LetterMore from "$lib/word/egyptian/dictionary/letter-more"
import {g, type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"

type EgyptianDictionary = Map<Phoneme, [Hieroglyphs[], null | EgyptianDictionary]>

const EgyptianDictionary: EgyptianDictionary = new Map()

function AppendToDictionary(d: EgyptianDictionary, pronunciation: Phoneme[], word: Hieroglyphs)
{
	if (pronunciation.length == 0)
		throw "Empty pronunciation"

	const [firstPhoneme, ...restPhonemes] = pronunciation

	const entry = d.get(firstPhoneme)

	if (entry == undefined)
	{
		if (restPhonemes.length == 0)
		{
			d.set(firstPhoneme, [[word], null])
		}
		else
		{
			const newSubDict: EgyptianDictionary = new Map()
			AppendToDictionary(newSubDict, restPhonemes, word)
			d.set(firstPhoneme, [[], newSubDict])
		}
	}
	else
	{
		const [words, subDict] = entry

		if (restPhonemes.length == 0)
		{
			words.push(word)
		}
		else if (subDict == null)
		{
			const newSubDict: EgyptianDictionary = new Map()
			AppendToDictionary(newSubDict, restPhonemes, word)
			d.set(firstPhoneme, [words, newSubDict])
		}
		else
		{
			AppendToDictionary(subDict, restPhonemes, word)
		}
	}
}

for (const p of Object.values(Phoneme))
	AppendToDictionary(EgyptianDictionary, [p], g(p))
for (const [k, v] of Letter2)
	AppendToDictionary(EgyptianDictionary, [...v as any], g(k))
for (const [k, v] of Letter3)
	AppendToDictionary(EgyptianDictionary, [...v as any], g(k))
for (const [k, v] of LetterMore)
	AppendToDictionary(EgyptianDictionary, [...v as any], g(k))
for (const [k, v] of Important)
	AppendToDictionary(EgyptianDictionary, [...v as any], k)

function CollectRestWords(d: EgyptianDictionary): Hieroglyphs[]
{
	const words: Hieroglyphs[] = []

	for (const [_, [ws, subDict]] of d)
	{
		words.push(...ws)

		if (subDict != null)
			words.push(...CollectRestWords(subDict))
	}

	return words
}

function AppendToCandidates(candidates: Hieroglyphs[], d: EgyptianDictionary, input: Phoneme[], fuzzySz = false)
{
	if (input.length == 0)
		return

	const [firstPhoneme, ...restPhonemes] = input

	const entry = d.get(firstPhoneme)

	if (entry == undefined)
		return

	const [words, subDict] = entry

	if (restPhonemes.length == 0)
	{
		if (words.length > 0)
		{
			candidates.push(...words)
		}
		else if (subDict != null)
		{
			candidates.push(...CollectRestWords(subDict))
		}
	}
	else if (subDict != null)
	{
		AppendToCandidates(candidates, subDict, restPhonemes, fuzzySz)
	}

	if (firstPhoneme == Phoneme.s && fuzzySz)
		AppendToCandidates(candidates, d, [Phoneme.z, ...restPhonemes], fuzzySz)
}

export function CandidatesFromPhonemes(phonemes: Phoneme[], fuzzySz = false): Hieroglyphs[]
{
	const candidates: Hieroglyphs[] = []
	AppendToCandidates(candidates, EgyptianDictionary, phonemes, fuzzySz)
	return candidates
}
