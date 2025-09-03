/*
Standard Egyptological transliteration

Many letters of which are terribly difficult to type on any languages' keyboards.
Must not use this system for exchanging data.
Try to avoid it in UI as some characters are poorly supported by common fonts.
*/

import {InverseRecord, ParserFromRecord} from "$lib/utils"
import {Phoneme as P} from "$lib/word/egyptian"

export type Egyptology
	= "ꜣ" | "ỉ" | "y" | "ꜥ" | "w"
	| "b" | "p" | "f" | "m"
	| "n" | "r"
	| "h" | "ḥ" | "ḫ" | "ẖ"
	| "s" | "š" | "z"
	| "k" | "ḳ" | "g"
	| "t" | "ṯ" | "d" | "ḏ"

export const Phoneme2Egyptology: Record<P, Egyptology> = {
	[P.e]: "ꜥ",
	[P.C]: "ẖ",
	[P.H]: "ḥ",
	[P.S]: "š",
	[P.a]: "ꜣ",
	[P.b]: "b",
	[P.c]: "ṯ",
	[P.d]: "d",
	[P.f]: "f",
	[P.g]: "g",
	[P.h]: "h",
	[P.i]: "ỉ",
	[P.j]: "ḏ",
	[P.k]: "k",
	[P.m]: "m",
	[P.n]: "n",
	[P.p]: "p",
	[P.q]: "ḳ",
	[P.r]: "r",
	[P.s]: "s",
	[P.t]: "t",
	[P.w]: "w",
	[P.x]: "ḫ",
	[P.y]: "y",
	[P.z]: "z",
}

export const Egyptology2Phoneme = InverseRecord(Phoneme2Egyptology)
export const pEgyptology = ParserFromRecord(Egyptology2Phoneme)
