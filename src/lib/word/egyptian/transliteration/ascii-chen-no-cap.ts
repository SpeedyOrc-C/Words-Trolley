/*
Another transliteration by me.

This doesn’t use any capital letters.
*/

import {ParserFromInvertedRecord} from "$lib/utils"
import {Phoneme as P} from "$lib/word/egyptian"

export const Phoneme2AsciiChenNoCap = {
   [P.a]: "a",
   [P.b]: "b",
   [P.c]: "c",
   [P.d]: "d",
   [P.e]: "e",
   [P.f]: "f",
   [P.g]: "g",
   [P.h]: "h",
   [P.i]: "i",
   [P.j]: "j",
   [P.k]: "k",
   [P.H]: "l",
   [P.m]: "m",
   [P.n]: "n",
   [P.p]: "p",
   [P.q]: "q",
   [P.r]: "r",
   [P.s]: "s",
   [P.t]: "t",
   [P.S]: "u",
   [P.C]: "v",
   [P.w]: "w",
   [P.x]: "x",
   [P.y]: "y",
   [P.z]: "z",
} as const

export const pAsciiChenNoCap = ParserFromInvertedRecord(Phoneme2AsciiChenNoCap)
