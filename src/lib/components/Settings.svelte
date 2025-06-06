<script lang="ts">
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import {Separator} from "$lib/components/ui/separator"
	import {Language} from "$lib/i18n/Language"
	import {_} from "$lib/i18n/store"
	import {
		ColourScheme,
		EgyptianImeMode,
		EgyptianTransliteration,
		HieroglyphsFont,
		type ISettings,
		MandarinScript
	} from "$lib/settings"
	import {LivingLanguages} from "$lib/i18n"
	import * as Dialog from "$lib/components/ui/dialog"
	import * as NS from "$lib/components/ui/native-select"
	import {Switch} from "$lib/components/ui/switch"
	import {Label} from "$lib/components/ui/label"
	import {settings, settingsOpened} from "$lib/settings/store"
	import {
		egyptianTransliterationSampleTextForRead,
		egyptianTransliterationSampleTextForEdit,
		preferredSentenceTransliterationDumperForRead,
		egyptianSoundChanger
	} from "$lib/settings/store/egyptian"
	import {mandarinSpellingSampleText} from "$lib/settings/store/mandarin"
	import Languages from "@lucide/svelte/icons/languages"
	import {voices} from "$lib/speak"
	import {Checkbox} from "$lib/components/ui/checkbox"
	import {g, v, h} from "$lib/word/egyptian/hieroglyphs"
	import Settings from "@lucide/svelte/icons/settings"
	import {Phoneme} from "$lib/word/egyptian"
	import SettingSubList from "./ui/setting/SettingSubList.svelte"
	import Button from "./ui/button/button.svelte"
	import ButtonGroup from "./ui/button-group/button-group.svelte"
	import {EgyptianDeterminativeScheme} from "$lib/word/egyptian/IME/determinative"

	let {open = $bindable(false)}: {open?: boolean} = $props()
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
</script>

<Dialog.Root bind:open={$settingsOpened}>
	<Dialog.Content
		class="max-h-1/1 max-w-1/1 overflow-y-auto p-3 sm:p-6 bg-gray-100 dark:bg-background"
	>
		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2">
				<Settings />
				<header class="text-2xl">
					{$_.settings._}
				</header>
			</Dialog.Title>
		</Dialog.Header>

		<main>
			<section>
				<article>
					<header>{$_.settings.appearance._}</header>

					<SettingSubList>
						<div class="flex justify-between gap-2 flex-wrap">
							<Label for="language">
								{$_.settings.appearance.ui_language}
								<Languages class="stroke-muted-foreground" />
							</Label>

							<NS.Root bind:value={newSettings.Language} id="language">
								<NS.Option value="auto">
									{$_.settings.follows_your_system}
								</NS.Option>
								<NS.Option lang="zh-CN" value={Language.ZhCn}>
									{_Language(Language.ZhCn)}
								</NS.Option>
								<NS.Option lang="en-GB" value={Language.EnGb}>
									{_Language(Language.EnGb)}
								</NS.Option>
								<NS.Option lang="ja-JP" value={Language.JaJp}>
									{_Language(Language.JaJp)}
								</NS.Option>
								<NS.Option lang="ar" value={Language.Ar}>
									{_Language(Language.Ar)}
								</NS.Option>
							</NS.Root>
						</div>

						<Separator />

						<div class="flex justify-between gap-2 flex-wrap">
							<Label for="colour-scheme">
								{$_.settings.appearance.colour_scheme._}
							</Label>

							<ButtonGroup>
								{@const s = $settings.ColourScheme}
								<Button
									disabled={s == ColourScheme.Light}
									onclick={() =>
										(newSettings.ColourScheme = ColourScheme.Light)}
									variant={s == ColourScheme.Light
										? "default"
										: "outline"}
								>
									{$_.settings.appearance.colour_scheme.light}
								</Button>
								<Button
									disabled={s == ColourScheme.Dark}
									onclick={() =>
										(newSettings.ColourScheme = ColourScheme.Dark)}
									variant={s == ColourScheme.Dark
										? "default"
										: "outline"}
								>
									{$_.settings.appearance.colour_scheme.dark}
								</Button>
								<Button
									disabled={s == ColourScheme.System}
									onclick={() =>
										(newSettings.ColourScheme = ColourScheme.System)}
									variant={s == ColourScheme.System
										? "default"
										: "outline"}
								>
									{$_.settings.follows_your_system}
								</Button>
							</ButtonGroup>
						</div>
					</SettingSubList>
				</article>

				<article>
					<header>{$_.settings.learning._}</header>

					<SettingSubList>

						<div class="flex items-center justify-between gap-2">
							<Label for="set-shuffle-words">
								{$_.settings.learning.shuffle_words}
							</Label>
							<Switch
								bind:checked={newSettings.Learning.ShuffleWords}
								id="set-shuffle-words"
							/>
						</div>

						<Separator />

						<div class="flex items-center justify-between gap-2">
							<Label for="set-show-meaning-in-the-front">
								{$_.settings.learning.show_meaning_in_the_front}
							</Label>
							<Switch
								bind:checked={
									newSettings.Learning.ShowMeaningAndWordAtTheSameTime
								}
								id="set-show-meaning-in-the-front"
							/>
						</div>

						<Separator />

						<div class="flex items-center justify-between gap-2">
							<Label for="set-show-pronunciation">
								{$_.settings.learning.show_pronunciation}
							</Label>
							<Switch
								bind:checked={newSettings.Learning.ShowPronunciation}
								id="set-show-pronunciation"
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

			<Separator />

			<section>
				<header>{$_.settings.mandarin._}</header>

				<article>
					<SettingSubList>
						<div class="flex justify-between gap-2">
							<Label for="mandarin-spelling-scheme">
								{$_.settings.mandarin.spelling_scheme}
							</Label>
							<NS.Root
								bind:value={newSettings.MandarinScript}
								id="mandarin-spelling-scheme"
							>
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

			<Separator />

			<section>
				<header>{$_.settings.egyptian._}</header>

				<article>
					<SettingSubList>
						<div class="flex justify-between gap-2">
							<Label for="hieroglyphs-style">
								{$_.settings.hieroglyphs_style._}
							</Label>

							<NS.Root
								bind:value={newSettings.Egyptian.HieroglyphsFont}
								id="hieroglyphs-style"
							>
								<NS.Option value={HieroglyphsFont.NewGardiner}>
									{$_.settings.hieroglyphs_style.sans_serif}
								</NS.Option>
								<NS.Option value={HieroglyphsFont.SemiessessiColourful}>
									{$_.settings.hieroglyphs_style.colourful}
								</NS.Option>
							</NS.Root>
						</div>

						<div class="text-center" style="font-size: 2.5rem">
							<EgyptianText
								t={[
									h(
										v(g("𓂋"), g("𓏤"), g("𓈖")),
										h(g("𓆎"), g("𓅓"), v(g("𓏏"), g("𓊖"))),
									),
								]}
							/>
						</div>
					</SettingSubList>
				</article>

				<article>
					<header>
						{$_.settings.egyptian.transliteration_scheme._}
					</header>

					<SettingSubList>
						<div class="flex justify-between gap-2">
							<Label for="set-fuzzy-sz">
								{$_.settings.egyptian.transliteration_scheme.fuzzy_sz}
							</Label>
							<Switch
								bind:checked={newSettings.Egyptian.FuzzySZ}
								id="set-fuzzy-sz"
							/>
						</div>

						<div class="inline-flex justify-evenly gap-4">
							<span class="flex gap-2 items-center">
								<span style:font-size="2rem">
									<EgyptianText t={[v(g("𓊃"), h(g("𓀀"), g("𓏤")))]} />
								</span>
								<span class="text-2xl">
									{$preferredSentenceTransliterationDumperForRead(
										[Phoneme.z].map($egyptianSoundChanger),
									)}
								</span>
							</span>
							<span class="flex gap-2 items-center">
								<span style:font-size="2rem">
									<EgyptianText t={[g("𓅭")]} />
								</span>
								<span class="text-2xl">
									{$preferredSentenceTransliterationDumperForRead(
										[Phoneme.z, Phoneme.a].map($egyptianSoundChanger),
									)}
								</span>
							</span>
							<span class="flex gap-2 items-center">
								<span style:font-size="2rem">
									<EgyptianText t={[g("𓏞")]} />
								</span>
								<span class="text-2xl">
									{$preferredSentenceTransliterationDumperForRead(
										[Phoneme.z, Phoneme.S].map($egyptianSoundChanger),
									)}
								</span>
							</span>
						</div>

						<Separator />

						<div class="flex justify-between gap-2">
							<Label for="egyptian-transliteration-scheme-for-read">
								{$_.settings.egyptian.transliteration_scheme.when_read}
							</Label>

							<NS.Root
								bind:value={newSettings.Egyptian.TransliterationForRead}
								id="egyptian-transliteration-scheme-for-read"
							>
								<NS.Option value={EgyptianTransliteration.Egyptology}>
									{$_.egyptian.transliteration.gardiner}
								</NS.Option>
								<NS.Option value={EgyptianTransliteration.Wiktionary}>
									{$_.wiktionary}
								</NS.Option>
								<NS.OptGroup label="ASCII">
									<NS.Option value={EgyptianTransliteration.ManuelDeCodage}>
										{$_.egyptian.transliteration.mdc}
									</NS.Option>
									<NS.Option value={EgyptianTransliteration.Chen}>
										{$_.egyptian.transliteration.chen}
									</NS.Option>
									<NS.Option value={EgyptianTransliteration.ChenNoCap}>
										{$_.egyptian.transliteration.chen_no_cap}
									</NS.Option>
								</NS.OptGroup>
							</NS.Root>
						</div>

						<div class="text-2xl text-center">
							{$egyptianTransliterationSampleTextForRead}
						</div>

						<Separator />

						<div class="flex justify-between gap-2">
							<Label for="egyptian-transliteration-scheme-for-edit">
								{$_.settings.egyptian.transliteration_scheme.when_edit}
							</Label>

							<NS.Root
								bind:value={newSettings.Egyptian.TransliterationForEdit}
								id="egyptian-transliteration-scheme-for-edit"
							>
								<NS.OptGroup label="ASCII">
									<NS.Option value={EgyptianTransliteration.ManuelDeCodage}>
										{$_.egyptian.transliteration.mdc}
									</NS.Option>
									<NS.Option value={EgyptianTransliteration.Chen}>
										{$_.egyptian.transliteration.chen}
									</NS.Option>
									<NS.Option value={EgyptianTransliteration.ChenNoCap}>
										{$_.egyptian.transliteration.chen_no_cap}
									</NS.Option>
								</NS.OptGroup>
								<NS.Option value={EgyptianTransliteration.Egyptology}>
									{$_.egyptian.transliteration.gardiner}
								</NS.Option>
								<NS.Option value={EgyptianTransliteration.Wiktionary}>
									{$_.wiktionary}
								</NS.Option>
							</NS.Root>
						</div>

						<div class="text-2xl text-center">
							{$egyptianTransliterationSampleTextForEdit}
						</div>
					</SettingSubList>
				</article>

				<article>
					<header>{$_.settings.egyptian.input_method._}</header>

					<SettingSubList>
						<div class="flex justify-between gap-2">
							<Label for="egyptian-determinative-scheme">
								{$_.settings.egyptian.transliteration_scheme.determinative_scheme._}
							</Label>

							<NS.Root
								bind:value={newSettings.Egyptian.DeterminativeScheme}
								id="egyptian-determinative-scheme"
							>
								<NS.Option value={EgyptianDeterminativeScheme.Xiaohuan}>
									小鹮
								</NS.Option>
								<NS.Option value={EgyptianDeterminativeScheme.Thomas}>
									Thomas
								</NS.Option>
							</NS.Root>
						</div>

						<Separator />

						<div class="flex justify-between gap-2">
							<Label for="egyptian-ime-mode">
								{$_.settings.egyptian.input_method.mode._}
							</Label>

							<NS.Root
								bind:value={newSettings.Egyptian.Mode}
								id="egyptian-ime-mode"
							>
								<NS.Option value={EgyptianImeMode.TextField}>
									{$_.settings.egyptian.input_method.mode.text_field}
								</NS.Option>
								<NS.Option value={EgyptianImeMode.VirtualKeyboard}>
									{$_.settings.egyptian.input_method.mode.virtual_keyboard}
								</NS.Option>
							</NS.Root>
						</div>
					</SettingSubList>
				</article>
			</section>

			<Separator />

			<section>
				<article>
					<header>{$_.settings.customise_voices._}</header>

					<SettingSubList>
						<p class="text-sm text-foreground/50">
							{$_.settings.customise_voices.tip}
						</p>

						<div class="flex flex-col gap-2">
							{#each LivingLanguages as lang}
								{@const names = $voices
									.filter(v => v.lang == lang)
									.map(v => v.name)}
								{@const value = newSettings.PreferredVoice[lang]}

								<div class="flex flex-col gap-1">
									<div class="flex gap-3 items-center">
										<Checkbox
											id="set-preferred-voice-{lang}"
											checked={newSettings.PreferredVoice[lang] !=
												null}
											disabled={value == null && names.length == 0}
											onCheckedChange={c => {
												newSettings.PreferredVoice[lang] = c
													? names[0]
													: null
												UpdateSettings()
											}}
										/>
										<Label for="set-preferred-voice-{lang}" {lang}>
											{_Language(lang)}
										</Label>
									</div>

									{#if value != null}
										<NS.Root
											{value}
											onchange={e => {
												newSettings.PreferredVoice[lang] = e.currentTarget.value
												UpdateSettings()
											}}
										>
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
