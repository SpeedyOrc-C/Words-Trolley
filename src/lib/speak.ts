import {LangFromWord, type Word} from "$lib/index"

import {settings} from "$lib/settings/store"
import {derived, writable} from "svelte/store"

export const voices = writable<SpeechSynthesisVoice[]>([])

export const Speak = derived([voices, settings], ([voices, settings]) => (word: Word) =>
{
	if (typeof word.word != "string")
		return

	const utterance = new SpeechSynthesisUtterance(word.word)

	function Utterance()
	{
		const lang = LangFromWord(word)

		if (lang == "")
			return utterance

		utterance.lang = lang

		const preferredVoiceName = settings.PreferredVoice[lang]

		if (preferredVoiceName == undefined)
			return utterance

		const voice = voices.find(v => v.name == preferredVoiceName && v.lang == lang)

		if (voice == undefined)
			return utterance

		utterance.voice = voice
		return utterance
	}

	speechSynthesis.speak(Utterance())
})
