<script lang="ts">
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import {Separator} from "$lib/components/ui/separator"
	import {Language} from "$lib/i18n/Language"
	import {_} from "$lib/i18n/store"
	import {EgyptianTransliteration, HieroglyphsFont, type ISettings, MandarinScript} from "$lib/settings"
	import {LivingLanguages} from "$lib/i18n"
	import * as Dialog from "$lib/components/ui/dialog"
	import * as NS from "$lib/components/ui/native-select"
	import {Switch} from "$lib/components/ui/switch"
	import {Label} from "$lib/components/ui/label"
	import {settings} from "$lib/settings/store"
	import {egyptianTransliterationSampleTextForRead, egyptianTransliterationSampleTextForEdit, preferredSentenceTransliterationDumperForRead, egyptianSoundChanger} from "$lib/settings/store/egyptian"
	import {mandarinSpellingSampleText} from "$lib/settings/store/mandarin"
	import Languages from "@lucide/svelte/icons/languages"
	import {voices} from "$lib/speak"
	import {Checkbox} from "$lib/components/ui/checkbox"
	import {g, v, h} from "$lib/word/egyptian/hieroglyphs"
	import Settings from "@lucide/svelte/icons/settings"
	import {Phoneme} from "$lib/word/egyptian"
	import SettingSubList from "./ui/setting/SettingSubList.svelte"

	let {open = $bindable(false)}: { open: boolean } = $props()
	let newSettings = $state($settings)

	function UpdateSettings()
	{
		settings.set(structuredClone($state.snapshot(newSettings)))
	}

	$effect(() =>
	{
		newSettings
		UpdateSettings()
	})

	function _Language(l: ISettings["Language"])
	{
		switch (l)
		{
		case Language.ZhCn:
			return "现代汉语（中华人民共和国）"
		case Language.ZhTw:
			return "現代漢語（中華民國）"
		case Language.EnGb:
			return "English (United Kingdom)"
		case Language.EnUs:
			return "English (United States)"
		case Language.JaJp:
			return "日本語"
		case Language.FrFr:
			return "Français (France)"
		case Language.DeDe:
			return "Deutsch (Deutschland)"
		case Language.Ar:
			return "العربية"
		case "auto":
			return $_.settings.follows_your_system
		}
	}

	function _EgyptianTransliteration(t: EgyptianTransliteration)
	{
		switch (t)
		{
		case EgyptianTransliteration.ManuelDeCodage:
			return $_.egyptian.transliteration.mdc
		case EgyptianTransliteration.Chen:
			return $_.egyptian.transliteration.chen
		case EgyptianTransliteration.ChenNoCap:
			return $_.egyptian.transliteration.chen_no_cap
		case EgyptianTransliteration.Wiktionary:
			return $_.wiktionary
		case EgyptianTransliteration.Egyptology:
			return $_.egyptian.transliteration.gardiner
		}
	}

	function _MandarinScript(s: MandarinScript)
	{
		switch (s)
		{
		case MandarinScript.Pinyin:
			return $_.linguistics.pinyin
		case MandarinScript.Bopomofo:
			return $_.linguistics.bopomofo
		}
	}

	function _HieroglyphsFont(f: HieroglyphsFont)
	{
		switch (f)
		{
		case HieroglyphsFont.NewGardiner:
			return $_.settings.hieroglyphs_style.sans_serif
		case HieroglyphsFont.SemiessessiColourful:
			return $_.settings.hieroglyphs_style.colourful
		}
	}
</script>

<Dialog.Root bind:open>

	<Dialog.Content class="max-h-1/1 max-w-1/1 overflow-y-auto p-3 sm:p-6 bg-gray-100 dark:bg-background">

		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2">
				<Settings/>
				<header class="text-2xl">
					{$_.settings._}
				</header>
			</Dialog.Title>
		</Dialog.Header>

		<main>

			<section>

				<article>

					<SettingSubList>

						<div class="flex justify-between gap-2 flex-wrap">
							<Label for="language">
								<Languages/>
								{$_.settings.ui_language}
							</Label>

							<NS.Root id="language" bind:value={newSettings.Language}>
								<NS.Option value="auto">
									{$_.settings.follows_your_system}
								</NS.Option>
								<NS.Option value={Language.ZhCn} lang="zh-CN">
									{_Language(Language.ZhCn)}
								</NS.Option>
								<NS.Option value={Language.EnGb} lang="en-GB">
									{_Language(Language.EnGb)}
								</NS.Option>
								<NS.Option value={Language.JaJp} lang="ja-JP">
									{_Language(Language.JaJp)}
								</NS.Option>
								<NS.Option value={Language.Ar} lang="ar">
									{_Language(Language.Ar)}
								</NS.Option>
							</NS.Root>
						</div>
					</SettingSubList>

				</article>

				<article>

					<header>{$_.settings.learning._}</header>

					<SettingSubList>

						<div class="flex items-center justify-between gap-2">
							<Label for="set-show-meaning-and-word-at-the-same-time">
								{$_.settings.learning.show_meaning_in_the_front}
							</Label>
							<Switch
								bind:checked={newSettings.Learning.ShowMeaningAndWordAtTheSameTime}
								id="set-show-meaning-and-word-at-the-same-time"
							/>
						</div>

						<Separator/>

						<div class="flex items-center justify-between gap-2">
							<Label for="set-show-pronunciation-above-words">
								{$_.settings.learning.show_pronunciation}
							</Label>
							<Switch
								bind:checked={newSettings.Learning.ShowPronunciation}
								id="set-show-pronunciation-above-words"
							/>
						</div>

					</SettingSubList>

				</article>

				<article>

					<header>
						{$_.settings.editor._}
					</header>

					<SettingSubList>
						<div class="flex items-center justify-between gap-2">
							<Label for="set-autosave">
								{$_.settings.editor.autosave}
							</Label>
							<Switch
								bind:checked={newSettings.Editor.Autosave}
								id="set-autosave"
							/>
						</div>
					</SettingSubList>

				</article>

			</section>

			<Separator/>

			<section>

				<header>{$_.settings.mandarin._}</header>

				<article>

					<SettingSubList>

						<div class="flex justify-between gap-2">
							<Label for="mandarin-spelling-scheme">
								{$_.settings.mandarin.spelling_scheme}
							</Label>
							<NS.Root bind:value={newSettings.MandarinScript} id="mandarin-spelling-scheme">
								<NS.Option value={MandarinScript.Pinyin}>
									{$_.linguistics.pinyin}
								</NS.Option>
								<NS.Option value={MandarinScript.Bopomofo}>
									{$_.linguistics.bopomofo}
								</NS.Option>
							</NS.Root>
						</div>

						<div class="text-2xl text-center">
							{$mandarinSpellingSampleText}
						</div>

					</SettingSubList>

				</article>

			</section>

			<Separator/>

			<section>

				<header>{$_.settings.egyptian._}</header>

				<article>

					<SettingSubList>

						<div class="flex justify-between gap-2">
							<Label for="hieroglyphs-style">
								{$_.settings.hieroglyphs_style._}
							</Label>

							<NS.Root id="hieroglyphs-style" bind:value={newSettings.Egyptian.HieroglyphsFont}>
								<NS.Option value={HieroglyphsFont.NewGardiner}>
									{$_.settings.hieroglyphs_style.sans_serif}
								</NS.Option>
								<NS.Option value={HieroglyphsFont.SemiessessiColourful}>
									{$_.settings.hieroglyphs_style.colourful}
								</NS.Option>
							</NS.Root>
						</div>

						<div class="text-center" style="font-size: 2.5rem">
							<EgyptianText t={[h(v(g("𓂋"), g("𓏤"), g("𓈖")), h(g("𓆎"), g("𓅓"), v(g("𓏏"), g("𓊖"))))]}/>
						</div>

					</SettingSubList>

				</article>

				<article>

					<header>
						{$_.settings.egyptian.transliteration_scheme._}
					</header>

					<SettingSubList>

						<div class="flex justify-between gap-2">
							<Label for="set-fuzzy-sz">{$_.settings.egyptian.transliteration_scheme.fuzzy_sz}</Label>
							<Switch bind:checked={newSettings.Egyptian.FuzzySZ} id="set-fuzzy-sz" />
						</div>

						<div class="inline-flex justify-evenly gap-4">
							<span class="flex gap-2 items-center">
								<span style:font-size="2rem">
									<EgyptianText t={[v(g("𓊃"), h(g("𓀀"), g("𓏤")))]}/>
								</span>
								<span class="text-2xl">
									{$preferredSentenceTransliterationDumperForRead([Phoneme.z].map($egyptianSoundChanger))}
								</span>
							</span>
							<span class="flex gap-2 items-center">
								<span style:font-size="2rem">
									<EgyptianText t={[g("𓅭")]}/>
								</span>
								<span class="text-2xl">
									{$preferredSentenceTransliterationDumperForRead([Phoneme.z, Phoneme.a].map($egyptianSoundChanger))}
								</span>
							</span>
							<span class="flex gap-2 items-center">
								<span style:font-size="2rem">
									<EgyptianText t={[g("𓏞")]}/>
								</span>
								<span class="text-2xl">
									{$preferredSentenceTransliterationDumperForRead([Phoneme.z, Phoneme.S].map($egyptianSoundChanger))}
								</span>
							</span>
						</div>

						<Separator/>

						<div class="flex justify-between gap-2">
							<Label for="egyptian-transliteration-scheme-for-read">
								{$_.settings.egyptian.transliteration_scheme.when_read}
							</Label>

							<NS.Root bind:value={newSettings.Egyptian.TransliterationForRead} id="egyptian-transliteration-scheme-for-read">
								<NS.Option value={EgyptianTransliteration.Egyptology}>
									{_EgyptianTransliteration(EgyptianTransliteration.Egyptology)}
								</NS.Option>
								<NS.Option value={EgyptianTransliteration.Wiktionary}>
									{_EgyptianTransliteration(EgyptianTransliteration.Wiktionary)}
								</NS.Option>
								<NS.OptGroup label="ASCII">
									<NS.Option value={EgyptianTransliteration.ManuelDeCodage}>
										{_EgyptianTransliteration(EgyptianTransliteration.ManuelDeCodage)}
									</NS.Option>
									<NS.Option value={EgyptianTransliteration.Chen}>
										{_EgyptianTransliteration(EgyptianTransliteration.Chen)}
									</NS.Option>
									<NS.Option value={EgyptianTransliteration.ChenNoCap}>
										{_EgyptianTransliteration(EgyptianTransliteration.ChenNoCap)}
									</NS.Option>
								</NS.OptGroup>
							</NS.Root>
						</div>

						<div class="text-2xl text-center">
							{$egyptianTransliterationSampleTextForRead}
						</div>

						<Separator/>

						<div class="flex justify-between gap-2">
							<Label for="egyptian-transliteration-scheme-for-edit">
								{$_.settings.egyptian.transliteration_scheme.when_edit}
							</Label>

							<NS.Root bind:value={newSettings.Egyptian.TransliterationForEdit} id="egyptian-transliteration-scheme-for-edit">
								<NS.OptGroup label="ASCII">
									<NS.Option value={EgyptianTransliteration.ManuelDeCodage}>
										{_EgyptianTransliteration(EgyptianTransliteration.ManuelDeCodage)}
									</NS.Option>
									<NS.Option value={EgyptianTransliteration.Chen}>
										{_EgyptianTransliteration(EgyptianTransliteration.Chen)}
									</NS.Option>
									<NS.Option value={EgyptianTransliteration.ChenNoCap}>
										{_EgyptianTransliteration(EgyptianTransliteration.ChenNoCap)}
									</NS.Option>
								</NS.OptGroup>
								<NS.Option value={EgyptianTransliteration.Egyptology}>
									{_EgyptianTransliteration(EgyptianTransliteration.Egyptology)}
								</NS.Option>
								<NS.Option value={EgyptianTransliteration.Wiktionary}>
									{_EgyptianTransliteration(EgyptianTransliteration.Wiktionary)}
								</NS.Option>
							</NS.Root>
						</div>

						<div class="text-2xl text-center">
							{$egyptianTransliterationSampleTextForEdit}
						</div>

					</SettingSubList>

				</article>

			</section>

			<Separator/>

			<section>

				<article>

					<header>{$_.settings.customise_voices._}</header>

					<SettingSubList>

						<p class="text-sm text-foreground/50">
							{$_.settings.customise_voices.tip}
						</p>

						<div class="flex flex-col gap-2">
							{#each LivingLanguages as lang}
								{@const names = $voices.filter(v => v.lang == lang).map(v => v.name)}
								{@const value = newSettings.PreferredVoice[lang]}

								<div class="flex flex-col gap-1">

									<div class="flex gap-3 items-center">
										<Checkbox
											id="set-preferred-voice-{lang}"
											checked={newSettings.PreferredVoice[lang] != null}
											disabled={value == null && names.length == 0}
											onCheckedChange={c => {
											newSettings.PreferredVoice[lang] = c ? names[0] : null
											UpdateSettings()
										}}
										/>
										<Label for="set-preferred-voice-{lang}" {lang}>
											{_Language(lang)}
										</Label>
									</div>

									{#if value != null}
										<NS.Root {value} onchange={e => {
											newSettings.PreferredVoice[lang] = e.currentTarget.value
											UpdateSettings()
										}}>
											{#each new Set([...names, value]) as name}
												<NS.Option value={name}>{name}</NS.Option>
											{/each}
										</NS.Root>
									{/if}

								</div>
							{/each}
						</div>

					</SettingSubList>

				</article>

			</section>

		</main>

		<div class="h-4"></div>

	</Dialog.Content>

</Dialog.Root>

<style lang="postcss">
	@reference "tailwindcss";

	main {
		@apply flex flex-col gap-4;

		& > section {
			@apply flex flex-col gap-4;

			& > header {
				@apply ml-3 text-lg font-bold;
			}

			& > article {

				& > header {
					@apply ml-3 mb-1 text-sm uppercase;
				}
			}
		}
	}
</style>
