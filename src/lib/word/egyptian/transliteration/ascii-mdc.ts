/*
Transliteration by Manuel de Codage
https://www.catchpenny.org/codage
http://www.ccer.ggl.ruu.nl/codage/codage.htm

This is ASCII-only, good for typing and exchanging data.
Uses 6 capital letters.
*/

import {ParserFromInvertedRecord} from "$lib/utils"
import {Phoneme as P} from "$lib/word/egyptian"

export const Phoneme2AsciiMdc = {
	[P.a]: "A",
	[P.b]: "b",
	[P.c]: "T",
	[P.C]: "X",
	[P.d]: "d",
	[P.e]: "a",
	[P.f]: "f",
	[P.g]: "g",
	[P.h]: "h",
	[P.H]: "H",
	[P.i]: "i",
	[P.j]: "D",
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

export const pAsciiMdc = ParserFromInvertedRecord(Phoneme2AsciiMdc)
