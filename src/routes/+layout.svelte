<script lang="ts">
	import "../app.css"
	import {AutoDetectLanguage} from "$lib/i18n"
	import {dir, language} from "$lib/i18n/store"
	import {ParseSettings} from "$lib/settings"
	import {settings, settingsOpened} from "$lib/settings/store"
	import {ModeWatcher} from "mode-watcher"
	import {SettingsKey} from "$lib/settings"
	import {Toaster} from "$lib/components/ui/sonner"
	import Settings from "$lib/components/Settings.svelte"
	import {voices} from "$lib/speak"

	const {children} = $props()

	$effect.pre(() =>
	{
		const unsubscribeLanguage = language
			.subscribe(language => document.documentElement.lang = language)

		const unsubscribeDir = dir
			.subscribe(dir => document.documentElement.dir = dir)

		const rawStringStoredSettings = localStorage.getItem(SettingsKey)

		if (rawStringStoredSettings != null)
			try
			{
				const rawJsonStoredSettings = JSON.parse(rawStringStoredSettings)

				const storedSettings = ParseSettings(rawJsonStoredSettings)

				if (storedSettings instanceof TypeError)
				{
					console.error(
						"Settings in localStorage has invalid format, now use default.",
						rawJsonStoredSettings
					)
				}
				else
				{
					settings.set(storedSettings)
				}
			}
			catch
			{
				console.error(
					"Settings in localStorage is not a valid JSON, now use default.",
					rawStringStoredSettings
				)
			}

		const unsubscribeSettings = settings.subscribe(set =>
		{
			localStorage.setItem(SettingsKey, JSON.stringify(set))

			if (set.Language == "auto")
				AutoDetectLanguage(navigator.language)
			else
				language.set(set.Language)
		})

		const speechSynthesis = window.speechSynthesis as SpeechSynthesis | undefined

		if (speechSynthesis != undefined)
		{
			const newVoices = speechSynthesis.getVoices()

			if (newVoices.length > 0)
				voices.set(newVoices)

			speechSynthesis.onvoiceschanged = () =>
				voices.set(speechSynthesis.getVoices())
		}

		return () =>
		{
			unsubscribeLanguage()
			unsubscribeSettings()
			unsubscribeDir()
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

	function onlanguagechange()
	{
		AutoDetectLanguage(navigator.language)
	}
</script>

<svelte:window {onkeydown} {onlanguagechange} />

<svelte:head>
	<meta content="LgylSiIsanuhSU46lPG1N7luYA1a1b8Q0qcaoD8xdhM" name="google-site-verification">
	<meta content="6E969809D470884D99DD8C78AE56BBF7" name="msvalidate.01">
	<link href="/manifest.json" rel="manifest">
</svelte:head>

<Settings bind:open={$settingsOpened} />
<Toaster position="bottom-right" richColors />
<ModeWatcher />

{@render children()}
