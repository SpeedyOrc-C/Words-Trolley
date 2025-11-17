<script lang="ts">
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import {Separator} from "$lib/components/ui/separator"
	import {Language} from "$lib/i18n/Language"
	import {_} from "$lib/i18n/store"
	import {EgyptianTransliteration, HieroglyphsFont, type ISettings, MandarinScript} from "$lib/settings"
	import {LivingLanguages} from "$lib/i18n"
	import * as Dialog from "$lib/components/ui/dialog"
	import * as Select from "$lib/components/ui/select"
	import {Switch} from "$lib/components/ui/switch"
	import {Label} from "$lib/components/ui/label"
	import {settings} from "$lib/settings/store"
	import {egyptianTransliterationSampleTextForRead, egyptianTransliterationSampleTextForEdit} from "$lib/settings/store/egyptian"
	import {mandarinSpellingSampleText} from "$lib/settings/store/mandarin"
	import Languages from "@lucide/svelte/icons/languages"
	import {voices} from "$lib/speak"
	import {Checkbox} from "$lib/components/ui/checkbox"
	import {g, v, h} from "$lib/word/egyptian/hieroglyphs"
	import Settings from "@lucide/svelte/icons/settings"

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
		case "auto":
			return $_.settings.follows_your_system
		}
	}

	function _EgyptianTransliteration(t: EgyptianTransliteration)
	{
		switch (t)
		{
		case EgyptianTransliteration.ManuelDeCodage:
			return "Manuel de Codage"
		case EgyptianTransliteration.Chen:
			return "陈"
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

					<section>

						<div class="flex justify-between gap-2 flex-wrap">
							<Label>{$_.settings.ui_language}</Label>

							<Select.Root bind:value={newSettings.Language} type="single">

								<Select.Trigger>
									<Languages/>
									{_Language(newSettings.Language)}
								</Select.Trigger>

								<Select.Content>
									<Select.Item value="auto">
										{$_.settings.follows_your_system}
									</Select.Item>
									<Select.Separator/>
									<Select.Item value={Language.ZhCn} lang="zh-CN">
										{_Language(Language.ZhCn)}
									</Select.Item>
									<Select.Item value={Language.EnGb} lang="en-GB">
										{_Language(Language.EnGb)}
									</Select.Item>
									<Select.Item value={Language.JaJp} lang="ja-JP">
										{_Language(Language.JaJp)}
									</Select.Item>
								</Select.Content>

							</Select.Root>
						</div>
					</section>

				</article>

				<article>

					<header>{$_.settings.learning._}</header>

					<section class="flex flex-col gap-2">

						<div class="flex items-center justify-between gap-2">
							<Label for="set-show-meaning-and-word-at-the-same-time">
								{$_.settings.learning.show_meaning_and_word_at_the_same_time}
							</Label>
							<Switch
								bind:checked={newSettings.Learning.ShowMeaningAndWordAtTheSameTime}
								id="set-show-meaning-and-word-at-the-same-time"
							/>
						</div>

						<div class="flex items-center justify-between gap-2">
							<Label for="set-show-pronunciation-above-words">
								{$_.settings.learning.show_pronunciation}
							</Label>
							<Switch
								bind:checked={newSettings.Learning.ShowPronunciation}
								id="set-show-pronunciation-above-words"
							/>
						</div>

					</section>

				</article>

				<article>

					<header>
						{$_.settings.editor._}
					</header>

					<section>
						<div class="flex items-center justify-between gap-2">
							<Label for="set-autosave">
								{$_.settings.editor.autosave}
							</Label>
							<Switch
								bind:checked={newSettings.Editor.Autosave}
								id="set-autosave"
							/>
						</div>
					</section>

				</article>

			</section>

			<Separator/>

			<section>

				<header>{$_.settings.mandarin._}</header>

				<article>

					<header>{$_.settings.mandarin.spelling_scheme}</header>

					<section>
						<Select.Root bind:value={newSettings.MandarinScript} type="single">

							<Select.Trigger>
								{_MandarinScript(newSettings.MandarinScript)}
							</Select.Trigger>

							<Select.Content>
								<Select.Item value={MandarinScript.Pinyin}>
									{$_.linguistics.pinyin}
								</Select.Item>
								<Select.Item value={MandarinScript.Bopomofo}>
									{$_.linguistics.bopomofo}
								</Select.Item>
							</Select.Content>

						</Select.Root>

						<div class="text-2xl text-center">
							{$mandarinSpellingSampleText}
						</div>
					</section>

				</article>

			</section>

			<Separator/>

			<section>

				<header>{$_.settings.egyptian._}</header>

				<article>

					<header>
						{$_.settings.egyptian.transliteration_for_read}
					</header>

					<section>

						<Select.Root bind:value={newSettings.Egyptian.TransliterationForRead} type="single">

							<Select.Trigger>
								{_EgyptianTransliteration(newSettings.Egyptian.TransliterationForRead)}
							</Select.Trigger>

							<Select.Content>
								<Select.Item value={EgyptianTransliteration.Egyptology}>
									{_EgyptianTransliteration(EgyptianTransliteration.Egyptology)}
								</Select.Item>
								<Select.Item value={EgyptianTransliteration.Wiktionary}>
									{_EgyptianTransliteration(EgyptianTransliteration.Wiktionary)}
								</Select.Item>
								<Select.Separator/>
								<Select.Group>
									<Select.Label>ASCII</Select.Label>
									<Select.Item value={EgyptianTransliteration.ManuelDeCodage}>
										{_EgyptianTransliteration(EgyptianTransliteration.ManuelDeCodage)}
									</Select.Item>
									<Select.Item value={EgyptianTransliteration.Chen}>
										{_EgyptianTransliteration(EgyptianTransliteration.Chen)}
									</Select.Item>
								</Select.Group>
							</Select.Content>

						</Select.Root>

						<div class="text-2xl text-center font-egy-trans">
							{$egyptianTransliterationSampleTextForRead}
						</div>

					</section>

				</article>

				<article>

					<header>
						{$_.settings.egyptian.transliteration_for_edit}
					</header>

					<section>

						<Select.Root bind:value={newSettings.Egyptian.TransliterationForEdit} type="single">

							<Select.Trigger>
								{_EgyptianTransliteration(newSettings.Egyptian.TransliterationForEdit)}
							</Select.Trigger>

							<Select.Content>
								<Select.Group>
									<Select.Label>ASCII</Select.Label>
									<Select.Item value={EgyptianTransliteration.ManuelDeCodage}>
										{_EgyptianTransliteration(EgyptianTransliteration.ManuelDeCodage)}
									</Select.Item>
									<Select.Item value={EgyptianTransliteration.Chen}>
										{_EgyptianTransliteration(EgyptianTransliteration.Chen)}
									</Select.Item>
								</Select.Group>
								<Select.Separator/>
								<Select.Item value={EgyptianTransliteration.Egyptology}>
									{_EgyptianTransliteration(EgyptianTransliteration.Egyptology)}
								</Select.Item>
								<Select.Item value={EgyptianTransliteration.Wiktionary}>
									{_EgyptianTransliteration(EgyptianTransliteration.Wiktionary)}
								</Select.Item>
							</Select.Content>

						</Select.Root>

						<div class="text-2xl text-center font-egy-trans">
							{$egyptianTransliterationSampleTextForEdit}
						</div>
					</section>

				</article>

				<article>

					<header>{$_.settings.hieroglyphs_style._}</header>

					<section>

						<Select.Root bind:value={newSettings.Egyptian.HieroglyphsFont} type="single">

							<Select.Trigger>
								{_HieroglyphsFont(newSettings.Egyptian.HieroglyphsFont)}
							</Select.Trigger>

							<Select.Content>
								<Select.Item value={HieroglyphsFont.NewGardiner}>
									{$_.settings.hieroglyphs_style.sans_serif}
								</Select.Item>
								<Select.Item value={HieroglyphsFont.SemiessessiColourful}>
									{$_.settings.hieroglyphs_style.colourful}
								</Select.Item>
							</Select.Content>

						</Select.Root>

						<div class="text-center" style="font-size: 2.5rem">
							<EgyptianText t={[h(v(g("𓂋"), g("𓏤"), g("𓈖")), h(g("𓆎"), g("𓅓"), v(g("𓏏"), g("𓊖"))))]}/>
						</div>

					</section>

				</article>

			</section>

			<Separator/>

			<section>

				<article>

					<header>{$_.settings.customise_voices._}</header>

					<section>

						<p class="text-sm text-foreground/50">
							{$_.settings.customise_voices.tip}
						</p>

						<div class="flex flex-col gap-2">
							{#each LivingLanguages as lang}
								{@const names = $voices.filter(v => v.lang == lang).map(v => v.name)}
								{@const value = newSettings.PreferredVoice[lang]}

								<div class="flex flex-col gap-1">

									<div class="flex items-center">
										<Checkbox
											id="set-preferred-voice-{lang}"
											checked={newSettings.PreferredVoice[lang] != null}
											disabled={value == null && names.length == 0}
											onCheckedChange={c => {
											newSettings.PreferredVoice[lang] = c ? names[0] : null
											UpdateSettings()
										}}
										/>
										<Label class="pl-3" for="set-preferred-voice-{lang}" {lang}>
											{_Language(lang)}
										</Label>
									</div>

									{#if value != null}
										<Select.Root {value} type="single" onValueChange={v => {
											newSettings.PreferredVoice[lang] = v
											UpdateSettings()
										}}>

											<Select.Trigger>{value}</Select.Trigger>

											<Select.Content>
												{#each new Set([...names, value]) as name}
													<Select.Item value={name}>
														{name}
													</Select.Item>
												{/each}
											</Select.Content>

										</Select.Root>
									{/if}

								</div>
							{/each}
						</div>

					</section>

				</article>

			</section>

		</main>

	</Dialog.Content>

</Dialog.Root>

<style lang="postcss">
	@reference "tailwindcss";

	main {
		@apply flex flex-col gap-4;

		& > section {
			@apply flex flex-col gap-2;

			& > header {
				@apply ml-3 text-lg font-bold;
			}

			& > article {

				& > header {
					@apply ml-3 mb-1 text-sm uppercase;
				}

				& > section {
					@apply p-3 bg-white dark:bg-white/8 shadow rounded-lg flex flex-col gap-2;
				}
			}
		}
	}
</style>
