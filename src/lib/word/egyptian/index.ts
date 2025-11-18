import {g, h, v, type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
import {WordType} from "$lib/word/types"
import type {Punctuation, SentenceTransliteration} from "$lib/word/egyptian/transliteration"

export enum Phoneme
{
	a = "𓄿",
	i = "𓇋",
	y = "𓇌",
	e = "𓂝",
	w = "𓅱",
	b = "𓃀",
	p = "𓊪",
	f = "𓆑",
	m = "𓅓",
	n = "𓈖",
	r = "𓂋",
	h = "𓉔",
	H = "𓎛",
	x = "𓐍",
	C = "𓄡",
	s = "𓋴",
	z = "𓊃",
	S = "𓈙",
	k = "𓎡",
	g = "𓎼",
	q = "𓈎",
	t = "𓏏",
	c = "𓍿",
	d = "𓂧",
	j = "𓆓",
}

export function PhonemeStringEqual_FuzzySs(a: string, b: string): boolean
{
	return a.replaceAll(Phoneme.z, Phoneme.s) == b.replaceAll(Phoneme.z, Phoneme.s)
}

export function PhonemeEqual_FuzzySs(a: Phoneme | Punctuation, b: Phoneme | Punctuation): boolean
{
	if (a == b)
		return true

	if (a == Phoneme.s && b == Phoneme.z)
		return true

	if (a == Phoneme.z && b == Phoneme.s)
		return true

	return false
}

export type Word = {
	type: WordType.Egyptian
	word: Hieroglyphs[]
	trans: SentenceTransliteration
}

export const ExampleWord = [v(g("𓂋"), g("𓏤"), g("𓈖")), h(g("𓆎"), g("𓅓"), v(g("𓏏"), g("𓊖")))] as const
