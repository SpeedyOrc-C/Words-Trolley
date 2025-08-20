import type {Language} from "$lib/i18n"
import {writable} from "svelte/store"

export const SettingsKey = "words-trolley-settings"

export enum MandarinScript
{
	Pinyin = "pinyin",
	Bopomofo = "bopomofo",
}

export interface ISettings
{
	Language: Language | "auto"
	MandarinScript: MandarinScript
}

export const settings = writable({
	Language: "auto",
	MandarinScript: MandarinScript.Pinyin
} as ISettings)

export const mandarinScript = writable(MandarinScript.Pinyin)
