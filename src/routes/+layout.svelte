<script lang="ts">
	import "../app.css"
	import {dev} from "$app/environment"
	import {AutoDetectLanguage, language} from "$lib/i18n"
	import {ParseSettings} from "$lib/settings"
	import {settings, settingsOpened} from "$lib/settings/store"
	import {mode, ModeWatcher, resetMode, setMode, userPrefersMode} from "mode-watcher"
	import {SettingsKey} from "$lib/settings"
	import {Toaster} from "$lib/components/ui/sonner"
	import Settings from "$lib/components/Settings.svelte"
	import {voices} from "$lib/speak"

	const {children} = $props()

	$effect.pre(() =>
	{
		const f1 = language
			.subscribe(lang => document.documentElement.lang = lang)

		const rawStringStoredSettings = localStorage.getItem(SettingsKey)

		if (rawStringStoredSettings != null)
			try
			{
				const rawJsonStoredSettings = JSON.parse(rawStringStoredSettings)

				settings.set(ParseSettings(rawJsonStoredSettings))
			}
			catch
			{
				console.error(
					"Broken settings in localStorage, now use default.",
					rawStringStoredSettings
				)
			}

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
	onkeydown={onkeydown}
	onlanguagechange={() => AutoDetectLanguage(navigator.language)}
/>

<Settings bind:open={$settingsOpened}/>
<Toaster position="top-center" richColors/>
<ModeWatcher/>

{@render children()}
