import * as Simple from "./simple"
import * as Egyptian from "./egyptian"
import * as English from "./english"
import * as French from "./french"
import * as German from "./german"
import * as Japanese from "./japanese"
import * as Mandarin from "./mandarin"

export type Word = Metadata & { meaning: string }

type Metadata
	= Simple.Word
	| English.Word
	| Mandarin.Word
	| French.Word
	| French.Noun
	| German.Word
	| German.Noun
	| Japanese.Word
	| Japanese.Verb
	| Egyptian.Word

export {
	French,
	German,
	Japanese,
	Mandarin,
	English,
	Egyptian,
}
