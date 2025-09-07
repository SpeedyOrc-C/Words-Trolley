import {EgyptianTransliteration} from "$lib/settings"
import {settings} from "$lib/settings/store"
import {pAsciiChen, Phoneme2AsciiChen} from "$lib/word/egyptian/transliteration/ascii-chen"
import {pAsciiMdc, Phoneme2AsciiMdc} from "$lib/word/egyptian/transliteration/ascii-mdc"
import {pEgyptology, Phoneme2Egyptology} from "$lib/word/egyptian/transliteration/egyptology"
import {eof} from "crazy-parser/index"
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
