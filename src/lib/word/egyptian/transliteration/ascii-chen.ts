/*
Transliteration by me

This is ASCII-only and similar to that by Manuel de Codage.
Uses 3 capital letters.
*/

import {ParserFromInvertedRecord} from "$lib/utils"
import {Phoneme as P} from "$lib/word/egyptian"

export const Phoneme2AsciiChen = {
	[P.a]: "a",
	[P.b]: "b",
	[P.c]: "c",
	[P.C]: "C",
	[P.d]: "d",
	[P.e]: "e",
	[P.f]: "f",
	[P.g]: "g",
	[P.h]: "h",
	[P.H]: "H",
	[P.i]: "i",
	[P.j]: "j",
	[P.k]: "k",
	[P.m]: "m",
	[P.n]: "n",
	[P.p]: "p",
	[P.q]: "q",
	[P.r]: "r",
	[P.s]: "s",
	[P.S]: "S",
	[P.t]: "t",
	[P.w]: "w",
	[P.x]: "x",
	[P.y]: "y",
	[P.z]: "z",
} as const

export const pAsciiChen = ParserFromInvertedRecord(Phoneme2AsciiChen)
