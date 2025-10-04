import {defaultSettings} from "$lib/settings"
import {derived, writable} from "svelte/store"

export const settingsOpened = writable(false)

export const settings = writable(structuredClone(defaultSettings))

export const showMeaningWhileLearning =
   derived(settings, s => s.Learning.ShowMeaningAndWordAtTheSameTime)

export const showPronunciation =
   derived(settings, s => s.Learning.ShowPronunciation)
