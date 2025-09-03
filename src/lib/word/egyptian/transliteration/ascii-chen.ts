/*
Transliteration by me

This is ASCII-only and similar to that by Manuel de Codage.
Uses 3 capital letters.
*/

import {InverseRecord, ParserFromRecord} from "$lib/utils"
import {Phoneme} from "$lib/word/egyptian"

export type AsciiChen
	= "a" | "b" | "c" | "C" | "d" | "e" | "f" | "g"
	| "h" | "H" | "i" | "j" | "k" | "m" | "n"
	| "p" | "q" | "r" | "s" | "S" | "t"
	| "w" | "x" | "y" | "z"

export const Phoneme2AsciiChen: Record<Phoneme, AsciiChen> = {
	[Phoneme.e]: "e",
	[Phoneme.C]: "C",
	[Phoneme.H]: "H",
	[Phoneme.S]: "S",
	[Phoneme.a]: "a",
	[Phoneme.b]: "b",
	[Phoneme.c]: "c",
	[Phoneme.d]: "d",
	[Phoneme.f]: "f",
	[Phoneme.g]: "g",
	[Phoneme.h]: "h",
	[Phoneme.i]: "i",
	[Phoneme.j]: "j",
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

export const AsciiChen2Phoneme = InverseRecord(Phoneme2AsciiChen)
export const pAsciiChen = ParserFromRecord(AsciiChen2Phoneme)
