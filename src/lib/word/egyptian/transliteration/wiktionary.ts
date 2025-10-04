/*
Wiktionary's non-controversial transliteration

https://en.wiktionary.org/wiki/Wiktionary:Egyptian_entry_guidelines#Romanization

This is mainly for quick navigation to Egyptian words on Wiktionary.
*/

import {ParserFromInvertedRecord} from "$lib/utils"
import {Phoneme as P} from "$lib/word/egyptian"

export const Phoneme2Wiktionary = {
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
   [P.i]: "j",
   [P.j]: "ḏ",
   [P.k]: "k",
   [P.m]: "m",
   [P.n]: "n",
   [P.p]: "p",
   [P.q]: "q",
   [P.r]: "r",
   [P.s]: "s",
   [P.S]: "š",
   [P.t]: "t",
   [P.w]: "w",
   [P.x]: "ḫ",
   [P.y]: "y",
   [P.z]: "z",
} as const

export const pWiktionary = ParserFromInvertedRecord(Phoneme2Wiktionary)
