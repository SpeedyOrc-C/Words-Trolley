/*
Transliteration by Manuel de Codage
https://www.catchpenny.org/codage
http://www.ccer.ggl.ruu.nl/codage/codage.htm

This is ASCII-only, good for typing and exchanging data.
Uses 6 capital letters.
*/

import {InverseRecord, ParserFromRecord} from "$lib/utils"
import {Phoneme} from "$lib/word/egyptian"

export type AsciiMdc
	= "a" | "A" | "b" | "d" | "D" | "f" | "g"
	| "h" | "H" | "i" | "k" | "m" | "n"
	| "p" | "q" | "r" | "s" | "S" | "t" | "T"
	| "w" | "x" | "X" | "y" | "z"

export const Phoneme2AsciiMdc: Record<Phoneme, AsciiMdc> = {
	[Phoneme.e]: "a",
	[Phoneme.C]: "X",
	[Phoneme.H]: "H",
	[Phoneme.S]: "S",
	[Phoneme.a]: "A",
	[Phoneme.b]: "b",
	[Phoneme.c]: "T",
	[Phoneme.d]: "d",
	[Phoneme.f]: "f",
	[Phoneme.g]: "g",
	[Phoneme.h]: "h",
	[Phoneme.i]: "i",
	[Phoneme.j]: "D",
	[Phoneme.k]: "k",
	[Phoneme.m]: "m",
	[Phoneme.n]: "n",
	[Phoneme.p]: "p",
	[Phoneme.q]: "q",
	[Phoneme.r]: "r",
	[Phoneme.s]: "s",
	[Phoneme.t]: "t",
	[Phoneme.w]: "w",
	[Phoneme.x]: "x",
	[Phoneme.y]: "y",
	[Phoneme.z]: "z",
}

export const AsciiMdc2Phoneme = InverseRecord(Phoneme2AsciiMdc)
export const pAsciiMdc = ParserFromRecord(AsciiMdc2Phoneme)
