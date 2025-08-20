<script lang="ts">
	import "../app.css"
	import {AutoDetectLanguage, language} from "$lib/i18n"
	import {ModeWatcher} from "mode-watcher"
	import {mandarinScript, settings, SettingsKey} from "$lib/Settings"

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

<ModeWatcher/>
{@render children()}
