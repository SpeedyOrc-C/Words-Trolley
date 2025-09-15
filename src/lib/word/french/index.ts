import {WordType} from "$lib/word/types"

export enum Gender { M = "M", F = "F" }

export enum Category
{
	Word = "word",
	Noun = "noun",
}

// Source: https://www.lawlessfrench.com/pronunciation/h-aspire
const WordsStartWithAspiratedLetterH = new Set([
	"hâbleur",
	"hache",
	"hacher",
	"hachisch",
	"haddock",
	"haie",
	"haïku",
	"haillon",
	"haine",
	"haïr",
	"haïssable",
	"halal",
	"hâle",
	"haler",
	"hâler",
	"haleter",
	"hall",
	"halle",
	"hallier",
	"halloween",
	"halo",
	"halte",
	"hamac",
	"hamburger",
	"hameau",
	"hammam",
	"hampe",
	"hamster",
	"hanche",
	"hand-ball",
	"handicap",
	"hangar",
	"hanter",
	"happer",
	"harangue",
	"harasser",
	"harceler",
	"harde",
	"harder",
	"hardi",
	"hareng",
	"hargne",
	"haricot",
	"harnacher",
	"harpail",
	"harpe",
	"harpon",
	"hasard",
	"hâte",
	"hâter",
	"hausser",
	"haut",
	"hauteur",
	"havre",
	"hercher",
	"hère",
	"hérisson",
	"hernie",
	"héron",
	"héros",
	"herse",
	"hêtre",
	"heurt",
	"heurter",
	"heurtoir",
	"hiatus",
	"hibou",
	"hic",
	"hickory",
	"hideux",
	"hiérarchie",
	"hiéroglyphe",
	"hippie",
	"hisser",
	"hobby",
	"hocher",
	"hockey",
	"hollande",
	"homard",
	"hong-kong",
	"hongrie",
	"honte",
	"hoquet",
	"hoqueter",
	"hors",
	"houe",
	"houille",
	"houle",
	"houleux",
	"hooligan",
	"houppe",
	"houspiller",
	"housse",
	"housser",
	"houx",
	"hublot",
	"huche",
	"huer",
	"huguenot",
	"huit",
	"hululer",
	"humer",
	"hurler",
])

const VowelLetters = new Set([
	"a", "e", "i", "o", "u", "y", "œ", "æ",
	"â", "ê", "ô",
	"à", "è", "ù",
	"é",
])

export function StartsWithVowel(word: string)
{
	const w = word.trim().toLowerCase()

	if (w.length == 0)
		throw "Empty word"

	return VowelLetters.has(w[0]) || WordsStartWithAspiratedLetterH.has(w)
}

export type Word = {
	type: WordType.French
	word: string
	category: Category.Word
}

export type Noun = {
	type: WordType.French
	word: string
	category: Category.Noun
	gender: Gender
}
