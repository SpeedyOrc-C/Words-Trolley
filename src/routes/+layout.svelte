<script lang="ts">
	import "../app.css"
	import {dev} from "$app/environment"
	import {AutoDetectLanguage, language} from "$lib/i18n"
	import {settings, settingsOpened} from "$lib/settings/store"
	import {ModeWatcher} from "mode-watcher"
	import {SettingsKey} from "$lib/settings"
	import {Toaster} from "$lib/components/ui/sonner"
	import Settings from "$lib/components/Settings.svelte"
	import {voices} from "$lib/speak"

	const {children} = $props()

	$effect.pre(() =>
	{
		const f1 = language
			.subscribe(lang => document.documentElement.lang = lang)

		const rawStoredSettings = localStorage.getItem(SettingsKey)

		if (rawStoredSettings != null)
			settings.set(JSON.parse(rawStoredSettings))

		const f2 = settings.subscribe(set =>
		{
			localStorage.setItem(SettingsKey, JSON.stringify(set))

			if (set.Language == "auto")
				AutoDetectLanguage(navigator.language)
			else
				language.set(set.Language)
		})

		const newVoices = speechSynthesis.getVoices()

		if (newVoices.length > 0)
			voices.set(newVoices)

		speechSynthesis.onvoiceschanged = () =>
			voices.set(speechSynthesis.getVoices())

		if (! dev)
			console.info(
				"Fancy a peep? Come to our repo!",
				"https://github.com/SpeedyOrc-C/Words-Trolley",
			)

		return () =>
		{
			f1()
			f2()
		}
	})

	function onkeydown(e: KeyboardEvent)
	{
		if ((e.ctrlKey || e.metaKey) && e.code == "Comma")
		{
			e.preventDefault()
			settingsOpened.update(x => ! x)
			return
		}
	}
</script>

<svelte:window
	onlanguagechange={() => AutoDetectLanguage(navigator.language)}
	onkeydown={onkeydown}
/>

<Settings bind:open={$settingsOpened}/>
<Toaster richColors position="top-center"/>
<ModeWatcher/>

{@render children()}
