<script lang="ts">
	import "../app.css"
	import {dev} from "$app/environment"
	import {AutoDetectLanguage, language} from "$lib/i18n"
	import {ModeWatcher} from "mode-watcher"
	import {mandarinScript, settings, settingsOpened, SettingsKey} from "$lib/Settings"
	import {Toaster} from "$lib/components/ui/sonner"
	import Settings from "$lib/components/Settings.svelte"

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

			mandarinScript.set(set.MandarinScript)
		})

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
</script>

<svelte:window
	onlanguagechange={() => AutoDetectLanguage(navigator.language)}
/>

<Settings bind:open={$settingsOpened}/>
<Toaster richColors position="top-center"/>
<ModeWatcher/>

{@render children()}
