import {settings} from "$lib/settings/store"
import {Phoneme} from "$lib/word/egyptian"
import
{
	Punctuation,
	SentenceTransliterationDumperOf,
	SentenceTransliterationParserOf,
	TransliterationDumperOf,
	TransliterationParserOf
} from "$lib/word/egyptian/transliteration"
import {derived} from "svelte/store"

export const preferredEgyptianTransliterationParser =
	derived(settings, s => TransliterationParserOf[s.EgyptianTransliteration])

export const preferredEgyptianTransliterationDumper =
	derived(settings, s => TransliterationDumperOf[s.EgyptianTransliteration])

export const preferredSentenceTransliterationParser =
	derived(settings, s => SentenceTransliterationParserOf[s.EgyptianTransliteration])

export const preferredSentenceTransliterationDumper =
	derived(settings, s => SentenceTransliterationDumperOf[s.EgyptianTransliteration])

export const egyptianTransliterationSampleText =
	derived(preferredSentenceTransliterationDumper, f => f([
		Phoneme.a, Phoneme.e, Phoneme.i,
		Punctuation.Space,
		Phoneme.t, Phoneme.c,
		Punctuation.Space,
		Phoneme.d, Phoneme.j,
		Punctuation.Space,
		Phoneme.k, Phoneme.q,
		Punctuation.Space,
		Phoneme.h, Phoneme.H, Phoneme.x, Phoneme.C,
	]))
