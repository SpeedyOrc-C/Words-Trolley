import {defaultSettings} from "$lib/settings"
import {writable} from "svelte/store"

export const settingsOpened = writable(false)

export const settings = writable(structuredClone(defaultSettings))
