import {EgyptianTransliteration} from "$lib/settings"
import {settings} from "$lib/settings/store"
import {Phoneme} from "$lib/word/egyptian"
import {pPunctuation, Punctuation, type SentenceTransliteration} from "$lib/word/egyptian/transliteration"
import {pAsciiChen, Phoneme2AsciiChen} from "$lib/word/egyptian/transliteration/ascii-chen"
import {pAsciiMdc, Phoneme2AsciiMdc} from "$lib/word/egyptian/transliteration/ascii-mdc"
import {pEgyptology, Phoneme2Egyptology} from "$lib/word/egyptian/transliteration/egyptology"
import {pWiktionary, Phoneme2Wiktionary} from "$lib/word/egyptian/transliteration/wiktionary"
import {eof, Parser} from "crazy-parser"
import {derived} from "svelte/store"

const TransliterationParserOf: Record<EgyptianTransliteration, Parser<Phoneme[]>> = {
	[EgyptianTransliteration.Chen]: pAsciiChen.many().left(eof),
	[EgyptianTransliteration.ManuelDeCodage]: pAsciiMdc.many().left(eof),
	[EgyptianTransliteration.Egyptology]: pEgyptology.many().left(eof),
	[EgyptianTransliteration.Wiktionary]: pWiktionary.many().left(eof),
}

const TransliterationDumperOf: Record<EgyptianTransliteration, Record<Phoneme, string>> = {
	[EgyptianTransliteration.Chen]: Phoneme2AsciiChen,
	[EgyptianTransliteration.ManuelDeCodage]: Phoneme2AsciiMdc,
	[EgyptianTransliteration.Egyptology]: Phoneme2Egyptology,
	[EgyptianTransliteration.Wiktionary]: Phoneme2Wiktionary,
}

export const preferredEgyptianTransliterationParser =
	derived(settings, s => TransliterationParserOf[s.EgyptianTransliteration])

export const preferredEgyptianTransliterationDumper =
	derived(settings, s => TransliterationDumperOf[s.EgyptianTransliteration])

function MakeSentenceParser(parser: Parser<Phoneme>)
	: Parser<SentenceTransliteration>
{
	return parser.or(pPunctuation).many().left(eof)
}

const SentenceTransliterationParserOf = {
	[EgyptianTransliteration.Chen]:
		MakeSentenceParser(pAsciiChen),
	[EgyptianTransliteration.ManuelDeCodage]:
		MakeSentenceParser(pAsciiMdc),
	[EgyptianTransliteration.Egyptology]:
		MakeSentenceParser(pEgyptology),
	[EgyptianTransliteration.Wiktionary]:
		MakeSentenceParser(pWiktionary),
}

function MakeSentenceDumper(dumper: Record<Phoneme, string>)
	: (xs: SentenceTransliteration) => string
{
	return (xs: SentenceTransliteration) =>
		xs.map(x => x in dumper ? dumper[x as Phoneme] : x).join("")
}

const SentenceTransliterationDumperOf = {
	[EgyptianTransliteration.Chen]:
		MakeSentenceDumper(Phoneme2AsciiChen),
	[EgyptianTransliteration.ManuelDeCodage]:
		MakeSentenceDumper(Phoneme2AsciiMdc),
	[EgyptianTransliteration.Egyptology]:
		MakeSentenceDumper(Phoneme2Egyptology),
	[EgyptianTransliteration.Wiktionary]:
		MakeSentenceDumper(Phoneme2Wiktionary),
}

export const preferredSentenceTransliterationParser =
	derived(settings, s => SentenceTransliterationParserOf[s.EgyptianTransliteration])

export const preferredSentenceTransliterationDumper =
	derived(settings, s => SentenceTransliterationDumperOf[s.EgyptianTransliteration])

export const egyptianTransliterationSampleText =
	derived(preferredSentenceTransliterationDumper, f => f([
		Phoneme.a, Phoneme.e, Phoneme.i, Punctuation.Space,
		Phoneme.t, Phoneme.c, Punctuation.Space,
		Phoneme.d, Phoneme.j, Punctuation.Space,
		Phoneme.k, Phoneme.q, Punctuation.Space,
		Phoneme.h, Phoneme.H, Phoneme.x, Phoneme.C,
	]))