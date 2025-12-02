import {Phoneme} from "$lib/word/egyptian"
import Important from "$lib/word/egyptian/dictionary/important"
import Letter2 from "$lib/word/egyptian/dictionary/letter-2"
import Letter3 from "$lib/word/egyptian/dictionary/letter-3"
import LetterMore from "$lib/word/egyptian/dictionary/letter-more"
import {g, type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"

type EgyptianDictionary = Map<Phoneme, [Hieroglyphs[], null | EgyptianDictionary]>

export type EgyptianWordCandidate = {
	Word: Hieroglyphs
	Tail?: Phoneme[]
}

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

function CollectTailWords(d: EgyptianDictionary, input: Phoneme[], fuzzySz = false): EgyptianWordCandidate[]
{
	if (input.length > 0)
	{
		const [firstPhoneme, ...restPhonemes] = input

		const entry = d.get(firstPhoneme)

		if (entry == undefined)
			return []

		const [_, subDict] = entry

		if (subDict == null)
			return []

		return CollectTailWords(subDict, restPhonemes, fuzzySz)
	}

	const candidates: EgyptianWordCandidate[] = []

	for (const [phoneme, [words, subDict]] of d)
	{
		for (const w of words)
		{
			candidates.push({Word: w, Tail: [phoneme]})
		}

		if (subDict != null)
		{
			candidates.push(...CollectTailWords(subDict, [], fuzzySz).map(sc => ({
				Word: sc.Word,
				Tail: [phoneme, ...sc.Tail!],
			})))
		}
	}

	return candidates
}

function AppendToCandidates(
	candidates: EgyptianWordCandidate[],
	d: EgyptianDictionary,
	input: Phoneme[],
	fuzzySz = false,
)
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
			candidates.push(...words.map(w => ({Word: w})))
		}
	}
	else if (subDict != null)
	{
		AppendToCandidates(candidates, subDict, restPhonemes, fuzzySz)
	}

	if (firstPhoneme == Phoneme.s && fuzzySz)
		AppendToCandidates(candidates, d, [Phoneme.z, ...restPhonemes], fuzzySz)
}

export function CandidatesFromPhonemes(phonemes: Phoneme[], fuzzySz = false): EgyptianWordCandidate[]
{
	const candidates: EgyptianWordCandidate[] = []

	AppendToCandidates(candidates, EgyptianDictionary, phonemes, fuzzySz)
	if (phonemes.length >= 2)
		candidates.push(...CollectTailWords(EgyptianDictionary, phonemes, fuzzySz))

	return candidates
}
