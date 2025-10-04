/*
Standard Egyptological transliteration

Many letters of which are terribly difficult to type on any languages' keyboards.
Must not use this system for exchanging data.
Try to avoid it in UI as some characters are poorly supported by common fonts.
*/

import {ParserFromInvertedRecord} from "$lib/utils"
import {Phoneme as P} from "$lib/word/egyptian"

export const Phoneme2Egyptology = {
	[P.a]: "ꜣ",
	[P.b]: "b",
	[P.c]: "ṯ",
	[P.C]: "ẖ",
	[P.d]: "d",
	[P.e]: "ꜥ",
	[P.f]: "f",
	[P.g]: "g",
	[P.h]: "h",
	[P.H]: "ḥ",
	[P.i]: "ỉ",
	[P.j]: "ḏ",
	[P.k]: "k",
	[P.m]: "m",
	[P.n]: "n",
	[P.p]: "p",
	[P.q]: "ḳ",
	[P.r]: "r",
	[P.s]: "s",
	[P.S]: "š",
	[P.t]: "t",
	[P.w]: "w",
	[P.x]: "ḫ",
	[P.y]: "y",
	[P.z]: "z",
} as const

export const pEgyptology = ParserFromInvertedRecord(Phoneme2Egyptology)
