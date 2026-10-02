import type {Word} from "../../word"
import {defaultSettings} from ".."
import {derived, writable} from "svelte/store"
import L from "lodash/fp"

export const settingsOpened = writable(false)

export const settings = writable(structuredClone(defaultSettings))

export const autosave =
   derived(settings, s => s.Editor.Autosave)

export const showMeaningWhileLearning =
   derived(settings, s => s.Learning.ShowMeaningAndWordAtTheSameTime)

export const showPronunciation =
   derived(settings, s => s.Learning.ShowPronunciation)

export const ReorderWords =
	derived(settings, s => s.Learning.ShuffleWords ? L.shuffle<Word> : L.identity<Word[]>)
