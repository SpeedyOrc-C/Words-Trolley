import {EgyptianTransliteration} from "$lib/settings"
import {pAsciiChen, Phoneme2AsciiChen} from "$lib/word/egyptian/transliteration/ascii-chen"
import { pAsciiChenNoCap, Phoneme2AsciiChenNoCap } from "$lib/word/egyptian/transliteration/ascii-chen-no-cap"
import {pAsciiMdc, Phoneme2AsciiMdc} from "$lib/word/egyptian/transliteration/ascii-mdc"
import {pEgyptology, Phoneme2Egyptology} from "$lib/word/egyptian/transliteration/egyptology"
import {pWiktionary, Phoneme2Wiktionary} from "$lib/word/egyptian/transliteration/wiktionary"
import {Phoneme} from "$lib/word/egyptian"
import * as P from "crazy-parser"
import {type Parser, eof} from "crazy-parser"
import {type Validator, eq, asum, array} from "crazy-parser/json/validate"

export enum Punctuation
{
	Equal = "=",
	Minus = "-",
	Dot = ".",
	Space = " ",
}

export type SentenceTransliteration = (Phoneme | Punctuation)[]

export const pPunctuation = P.asum(Object.values(Punctuation).map(P.char))

export const Validate: Validator<SentenceTransliteration> =
	array(
		asum(
			asum(...Object.values(Phoneme).map(eq)),
			asum(...Object.values(Punctuation).map(eq)),
		)
	)

function MakeTransliterationParser(parser: Parser<Phoneme>): Parser<Phoneme[]>
{
	return parser.many().left(eof)
}

export const TransliterationParserOf: Record<EgyptianTransliteration, Parser<Phoneme[]>> = {
	[EgyptianTransliteration.Chen]: MakeTransliterationParser(pAsciiChen),
	[EgyptianTransliteration.ChenNoCap]: MakeTransliterationParser(pAsciiChenNoCap),
	[EgyptianTransliteration.ManuelDeCodage]: MakeTransliterationParser(pAsciiMdc),
	[EgyptianTransliteration.Egyptology]: MakeTransliterationParser(pEgyptology),
	[EgyptianTransliteration.Wiktionary]: MakeTransliterationParser(pWiktionary),
}

export const TransliterationDumperOf: Record<EgyptianTransliteration, Record<Phoneme, string>> = {
	[EgyptianTransliteration.Chen]: Phoneme2AsciiChen,
	[EgyptianTransliteration.ChenNoCap]: Phoneme2AsciiChenNoCap,
	[EgyptianTransliteration.ManuelDeCodage]: Phoneme2AsciiMdc,
	[EgyptianTransliteration.Egyptology]: Phoneme2Egyptology,
	[EgyptianTransliteration.Wiktionary]: Phoneme2Wiktionary,
}

function MakeSentenceParser(parser: Parser<Phoneme>)
	: Parser<SentenceTransliteration>
{
	return parser.or(pPunctuation).many().left(eof)
}

export const SentenceTransliterationParserOf = {
	[EgyptianTransliteration.Chen]:
		MakeSentenceParser(pAsciiChen),
	[EgyptianTransliteration.ChenNoCap]:
		MakeSentenceParser(pAsciiChenNoCap),
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

export const SentenceTransliterationDumperOf = {
	[EgyptianTransliteration.Chen]:
		MakeSentenceDumper(Phoneme2AsciiChen),
	[EgyptianTransliteration.ChenNoCap]:
		MakeSentenceDumper(Phoneme2AsciiChenNoCap),
	[EgyptianTransliteration.ManuelDeCodage]:
		MakeSentenceDumper(Phoneme2AsciiMdc),
	[EgyptianTransliteration.Egyptology]:
		MakeSentenceDumper(Phoneme2Egyptology),
	[EgyptianTransliteration.Wiktionary]:
		MakeSentenceDumper(Phoneme2Wiktionary),
}
