import {Phoneme} from "$lib/word/egyptian"
import * as Content from "$lib/word/egyptian/dictionary/content"
import {g, type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
import type {EgyptianWordCandidate} from "$lib/word/egyptian/IME"

type Dictionary = Map<Phoneme, [Hieroglyphs[], null | Dictionary]>

const Dictionary: Dictionary = new Map()

function AppendToDictionary(d: Dictionary, pronunciation: Phoneme[], word: Hieroglyphs)
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
			const newSubDict: Dictionary = new Map()
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
			const newSubDict: Dictionary = new Map()
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
	AppendToDictionary(Dictionary, [p], g(p))
for (const [k, v] of Content.Letter2)
	AppendToDictionary(Dictionary, [...v as never], g(k))
for (const [k, v] of Content.Letter3)
	AppendToDictionary(Dictionary, [...v as never], g(k))
for (const [k, v] of Content.LetterMore)
	AppendToDictionary(Dictionary, [...v as never], g(k))
for (const [k, v] of Content.Important)
	AppendToDictionary(Dictionary, [...v as never], k)

function CollectTailWords(d: Dictionary, input: Phoneme[], fuzzySz = false): EgyptianWordCandidate[]
{
	if (input.length > 0)
	{
		const [firstPhoneme, ...restPhonemes] = input

		const entry = d.get(firstPhoneme)

		if (entry == undefined)
			return []

		const [, subDict] = entry

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
				Tail: [phoneme, ...sc.Tail!]
			})))
		}
	}

	return candidates
}

function AppendToCandidates(
	candidates: EgyptianWordCandidate[],
	d: Dictionary,
	input: Phoneme[],
	fuzzySz = false
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

	AppendToCandidates(candidates, Dictionary, phonemes, fuzzySz)
	if (phonemes.length >= 2)
		candidates.push(...CollectTailWords(Dictionary, phonemes, fuzzySz))

	return candidates
}
