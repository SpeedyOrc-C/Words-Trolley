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

const sampleText = [
	Phoneme.a, Phoneme.e, Phoneme.i,
	Punctuation.Space,
	Phoneme.t, Phoneme.c,
	Punctuation.Space,
	Phoneme.d, Phoneme.j,
	Punctuation.Space,
	Phoneme.k, Phoneme.q,
	Punctuation.Space,
	Phoneme.h, Phoneme.H, Phoneme.x, Phoneme.C,
]

export const preferredEgyptianTransliterationParserForRead =
	derived(settings, s => TransliterationParserOf[s.Egyptian.TransliterationForRead])

export const preferredEgyptianTransliterationDumperForRead =
	derived(settings, s => TransliterationDumperOf[s.Egyptian.TransliterationForRead])

export const preferredSentenceTransliterationParserForRead =
	derived(settings, s => SentenceTransliterationParserOf[s.Egyptian.TransliterationForRead])

export const preferredSentenceTransliterationDumperForRead =
	derived(settings, s => SentenceTransliterationDumperOf[s.Egyptian.TransliterationForRead])

export const egyptianTransliterationSampleTextForRead =
	derived(preferredSentenceTransliterationDumperForRead, f => f(sampleText))

export const preferredEgyptianTransliterationParserForEdit =
	derived(settings, s => TransliterationParserOf[s.Egyptian.TransliterationForEdit])

export const preferredEgyptianTransliterationDumperForEdit =
	derived(settings, s => TransliterationDumperOf[s.Egyptian.TransliterationForEdit])

export const preferredSentenceTransliterationParserForEdit =
	derived(settings, s => SentenceTransliterationParserOf[s.Egyptian.TransliterationForEdit])

export const preferredSentenceTransliterationDumperForEdit =
	derived(settings, s => SentenceTransliterationDumperOf[s.Egyptian.TransliterationForEdit])

export const egyptianTransliterationSampleTextForEdit =
	derived(preferredSentenceTransliterationDumperForEdit, f => f(sampleText))
