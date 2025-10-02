<script lang="ts">
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import {Separator} from "$lib/components/ui/separator"
	import {Language} from "$lib/i18n/Language"
	import {_} from "$lib/i18n/store"
	import {EgyptianTransliteration, HieroglyphsFont, type ISettings, MandarinScript} from "$lib/settings"
	import {LivingLanguages} from "$lib/i18n"
	import * as Dialog from "$lib/components/ui/dialog"
	import * as Select from "$lib/components/ui/select"
	import * as RadioGroup from "$lib/components/ui/radio-group"
	import {Label} from "$lib/components/ui/label"
	import {settings} from "$lib/settings/store"
	import {egyptianTransliterationSampleText} from "$lib/settings/store/egyptian"
	import {mandarinSpellingSampleText} from "$lib/settings/store/mandarin"
	import Languages from "@lucide/svelte/icons/languages"
	import {voices} from "$lib/speak"
	import {Checkbox} from "$lib/components/ui/checkbox"
	import {g, v, h} from "$lib/word/egyptian/hieroglyphs"
	import Settings from "@lucide/svelte/icons/settings";

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
</script>

<Dialog.Root bind:open>

	<Dialog.Content class="max-h-1/1 overflow-y-auto">

		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2">
				<Settings/>
				<div class="text-2xl">
					{$_.settings._}
				</div>
			</Dialog.Title>
		</Dialog.Header>

		<article class="flex flex-col gap-4">

			<section class="flex flex-col gap-2">

				<header>{$_.settings.ui_language}</header>

				<Select.Root bind:value={newSettings.Language} type="single">

					<Select.Trigger>
						<Languages/>
						{_Language(newSettings.Language)}
					</Select.Trigger>

					<Select.Content>

						<Select.Item value="auto">
							{$_.settings.follows_your_system}
						</Select.Item>

						<Select.Item value={Language.ZhCn}>
							{_Language(Language.ZhCn)}
						</Select.Item>

						<Select.Item value={Language.EnGb}>
							{_Language(Language.EnGb)}
						</Select.Item>

					</Select.Content>

				</Select.Root>

			</section>

			<Separator/>

			<section class="flex flex-col gap-2">

				<header>{$_.settings.mandarin_spelling_scheme}</header>

				<RadioGroup.Root
					bind:value={newSettings.MandarinScript}
					class="flex gap-4"
				>

					<div class="flex items-center">

						<RadioGroup.Item
							id="set-mandarin-script-pinyin"
							value={MandarinScript.Pinyin}
						/>

						<Label class="pl-2" for="set-mandarin-script-pinyin">
							{$_.linguistics.pinyin}
						</Label>

					</div>

					<div class="flex items-center">

						<RadioGroup.Item
							id="set-mandarin-script-bopomofo"
							value={MandarinScript.Bopomofo}
						/>

						<Label class="pl-2" for="set-mandarin-script-bopomofo">
							{$_.linguistics.bopomofo}
						</Label>

					</div>

				</RadioGroup.Root>

				<div class="text-2xl text-center">
					{$mandarinSpellingSampleText}
				</div>

			</section>

			<Separator/>

			<section class="flex flex-col gap-2">

				<header>{$_.settings.egyptian_transliteration_scheme}</header>

				<RadioGroup.Root
					bind:value={newSettings.EgyptianTransliteration}
					class="flex gap-4 flex-wrap"
				>

					<div class="flex items-center">

						<RadioGroup.Item
							id="set-egyptian-transliteration-mdc"
							value={EgyptianTransliteration.ManuelDeCodage}
						/>

						<Label class="pl-2 flex flex-col items-center" for="set-egyptian-transliteration-mdc">
							<abbr title="Manuel de Codage">
								MdC
							</abbr>
						</Label>

					</div>

					<div class="flex items-center">

						<RadioGroup.Item
							id="set-egyptian-transliteration-chen"
							value={EgyptianTransliteration.Chen}
						/>

						<Label class="pl-2 flex flex-col items-center" for="set-egyptian-transliteration-chen">
							陈
						</Label>

					</div>

					<div class="flex items-center">

						<RadioGroup.Item
							id="set-egyptian-transliteration-egyptology"
							value={EgyptianTransliteration.Egyptology}
						/>

						<Label class="pl-2 flex flex-col items-center" for="set-egyptian-transliteration-egyptology">
							{$_.egyptian.egyptology}
						</Label>

					</div>

				</RadioGroup.Root>

				<div class="text-2xl text-center">
					{$egyptianTransliterationSampleText}
				</div>

			</section>

			<section class="flex flex-col gap-2">

				<header>{$_.settings.hieroglyphs_style._}</header>

				<RadioGroup.Root
					bind:value={newSettings.HieroglyphsFont}
					class="flex gap-4 flex-wrap"
				>

					<div class="flex items-center">

						<RadioGroup.Item
							id="set-hieroglyphs-new-gardiner"
							value={HieroglyphsFont.NewGardiner}
						/>

						<Label class="pl-2" for="set-hieroglyphs-new-gardiner">
							{$_.settings.hieroglyphs_style.sans_serif}
						</Label>

					</div>

					<div class="flex items-center">

						<RadioGroup.Item
							id="set-hieroglyphs-semiessessi-colourful"
							value={HieroglyphsFont.SemiessessiColourful}
						/>

						<Label class="pl-2" for="set-hieroglyphs-semiessessi-colourful">
							{$_.settings.hieroglyphs_style.colourful}
						</Label>

					</div>

				</RadioGroup.Root>

				<div class="text-center" style="font-size: 2.5rem">
					<EgyptianText t={[h(v(g("𓂋"), g("𓏤"), g("𓈖")), h(g("𓆎"), g("𓅓"), v(g("𓏏"), g("𓊖"))))]}/>
				</div>

			</section>

			<Separator/>

			<section class="flex flex-col gap-3">

				<header>{$_.settings.customise_voices._}</header>

				<p class="text-sm text-foreground/50">
					{$_.settings.customise_voices.tip}
				</p>

				<div class="flex flex-col gap-2">
					{#each LivingLanguages as lang}
						{@const names = $voices.filter(v => v.lang === lang).map(v => v.name)}
						{@const value = newSettings.PreferredVoice[lang]}

						<div class="flex flex-col gap-1">

							<div class="flex items-center">
								<Checkbox
									id="set-preferred-voice-{lang}"
									checked={newSettings.PreferredVoice[lang] != null}
									disabled={value == null && names.length === 0}
									onCheckedChange={c => {
									newSettings.PreferredVoice[lang] = c ? names[0] : null
									UpdateSettings()
								}}
								/>
								<label class="pl-3" for="set-preferred-voice-{lang}">
									{_Language(lang)}
								</label>
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

	</Dialog.Content>

</Dialog.Root>

<style lang="postcss">
	@reference "tailwindcss";

	article > section > header {
		@apply font-bold;
	}
</style>
