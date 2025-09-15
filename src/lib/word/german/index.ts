import {WordType} from "$lib/word/types"

export enum Gender { M = "M", N = "N", F = "F" }

export enum Category
{
	Word = "word",
	Noun = "noun",
}

export type Word = {
	type: WordType.German
	word: string
	category: Category.Word
}

export type Noun = {
	type: WordType.German
	word: string
	category: Category.Noun
	gender: Gender
}
