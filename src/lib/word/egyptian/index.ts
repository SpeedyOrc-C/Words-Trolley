import {type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
import {WordType} from "$lib/word/types"
import type {SentenceTransliteration} from "$lib/word/egyptian/transliteration"

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

export function PhonemeEqual_BlurrySZ(a: string, b: string): boolean
{
	return a.replaceAll(Phoneme.z, Phoneme.s) == b.replaceAll(Phoneme.z, Phoneme.s)
}

export type Word = {
	type: WordType.Egyptian
	word: Hieroglyphs[]
	trans: SentenceTransliteration
}
