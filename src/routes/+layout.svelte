<script lang="ts">
	import "../app.css"
	import {AutoDetectLanguage} from "$lib/i18n"
	import {language} from "$lib/i18n/store"
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

	function onlanguagechange()
	{
		AutoDetectLanguage(navigator.language)
	}
</script>

<svelte:window {onkeydown} {onlanguagechange}/>

<svelte:head>
	<meta name="google-site-verification" content="LgylSiIsanuhSU46lPG1N7luYA1a1b8Q0qcaoD8xdhM">
	<meta name="msvalidate.01" content="6E969809D470884D99DD8C78AE56BBF7">
	<link rel="manifest" href="/manifest.json">
</svelte:head>

<Settings bind:open={$settingsOpened}/>
<Toaster position="bottom-right" richColors/>
<ModeWatcher/>

{@render children()}
