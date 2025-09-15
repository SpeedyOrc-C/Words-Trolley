import {English} from "$lib/word"
import {WordType} from "$lib/word/types"

export enum Region
{
	GB = "gb",
	US = "us",
}

export type Word = {
	type: WordType.English
	word: string
	region: English.Region
}
