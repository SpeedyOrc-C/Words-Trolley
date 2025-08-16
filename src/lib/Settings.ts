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
    Language: Language | null
    MandarinScript: MandarinScript
}

const defaultSettings: ISettings = {
    Language: null,
    MandarinScript: MandarinScript.Pinyin,
}

export const settings = writable(structuredClone(defaultSettings))
