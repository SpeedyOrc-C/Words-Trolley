import {EgyptianTransliteration} from "$lib/settings"
import {settings} from "$lib/settings/store"
import {Phoneme} from "$lib/word/egyptian"
import {pPunctuation, type SentenceTransliteration} from "$lib/word/egyptian/transliteration"
import {pAsciiChen, Phoneme2AsciiChen} from "$lib/word/egyptian/transliteration/ascii-chen"
import {pAsciiMdc, Phoneme2AsciiMdc} from "$lib/word/egyptian/transliteration/ascii-mdc"
import {pEgyptology, Phoneme2Egyptology} from "$lib/word/egyptian/transliteration/egyptology"
import {eof} from "crazy-parser"
import {derived} from "svelte/store"

const TransliterationParserOf = {
	[EgyptianTransliteration.Chen]: pAsciiChen.many().left(eof),
	[EgyptianTransliteration.ManuelDeCodage]: pAsciiMdc.many().left(eof),
	[EgyptianTransliteration.Egyptology]: pEgyptology.many().left(eof),
}

const TransliterationDumperOf = {
	[EgyptianTransliteration.Chen]: Phoneme2AsciiChen,
	[EgyptianTransliteration.ManuelDeCodage]: Phoneme2AsciiMdc,
	[EgyptianTransliteration.Egyptology]: Phoneme2Egyptology,
}

export const preferredEgyptianTransliterationParser =
	derived(settings, s => TransliterationParserOf[s.EgyptianTransliteration])

export const preferredEgyptianTransliterationDumper =
	derived(settings, s => TransliterationDumperOf[s.EgyptianTransliteration])

export const egyptianTransliterationSampleText =
	derived(preferredEgyptianTransliterationDumper, f => [
		Phoneme.a, Phoneme.e, Phoneme.b, Phoneme.t,
		Phoneme.c, Phoneme.d, Phoneme.j,
	].map(x => f[x]).join(""))

const SentenceTransliterationParserOf = {
	[EgyptianTransliteration.Chen]:
		pAsciiChen.or(pPunctuation).many().left(eof),
	[EgyptianTransliteration.ManuelDeCodage]:
		pAsciiMdc.or(pPunctuation).many().left(eof),
	[EgyptianTransliteration.Egyptology]:
		pEgyptology.or(pPunctuation).many().left(eof),
}

const SentenceTransliterationDumperOf = {
	[EgyptianTransliteration.Chen]:
		(xs: SentenceTransliteration) => xs.map(x =>
			x in Phoneme2AsciiChen ? Phoneme2AsciiChen[x as Phoneme] : x).join(""),
	[EgyptianTransliteration.ManuelDeCodage]:
		(xs: SentenceTransliteration) => xs.map(x =>
			x in Phoneme2AsciiMdc ? Phoneme2AsciiMdc[x as Phoneme] : x).join(""),
	[EgyptianTransliteration.Egyptology]:
		(xs: SentenceTransliteration) => xs.map(x =>
			x in Phoneme2Egyptology ? Phoneme2Egyptology[x as Phoneme] : x).join(""),
}

export const preferredSentenceTransliterationParser =
	derived(settings, s => SentenceTransliterationParserOf[s.EgyptianTransliteration])

export const preferredSentenceTransliterationDumper =
	derived(settings, s => SentenceTransliterationDumperOf[s.EgyptianTransliteration])
