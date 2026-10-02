import {English} from ".."
import {WordType} from "../types"

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
