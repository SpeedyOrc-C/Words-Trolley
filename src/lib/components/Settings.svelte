<script lang="ts">
	import {type ISettings, MandarinScript, settings} from "$lib/Settings"
	import {_, Language} from "$lib/i18n"
	import * as Dialog from "$lib/components/ui/dialog"
	import * as Select from "$lib/components/ui/select"
	import * as RadioGroup from "$lib/components/ui/radio-group"
	import * as Table from "$lib/components/ui/table"
	import {Label} from "$lib/components/ui/label"
	import {Languages} from "@lucide/svelte"
	import {voices} from "$lib/speak"
	import {Checkbox} from "$lib/components/ui/checkbox"

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
			return "中文（中华人民共和国）"
		case Language.ZhTw:
			return "中文（中華民國）"
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
			<Dialog.Title>
				{$_.settings._}
			</Dialog.Title>
		</Dialog.Header>

		<div class="flex flex-col gap-6">

			<div class="flex flex-col gap-2">

				<div class="set-item">
					{$_.settings.ui_language}
				</div>

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

			</div>

			<div class="flex flex-col gap-2">

				<div class="set-item">
					{$_.settings.mandarin_script}
				</div>

				<RadioGroup.Root
					bind:value={newSettings.MandarinScript}
					class="flex gap-4"
				>

					<div class="radio-group-with-box flex items-center gap-2">

						<RadioGroup.Item
							id="set-mandarin-script-pinyin"
							value={MandarinScript.Pinyin}
						/>

						<Label class="flex flex-col items-center" for="set-mandarin-script-pinyin">
							<div>
								{$_.linguistics.pinyin}
							</div>
							<div style="font-size: 1.25em">
								pīn yīn
							</div>
						</Label>

					</div>

					<div class="radio-group-with-box flex items-center gap-2">

						<RadioGroup.Item
							id="set-mandarin-script-bopomofo"
							value={MandarinScript.Bopomofo}
						/>

						<Label class="flex flex-col items-center" for="set-mandarin-script-bopomofo">
							<div>
								{$_.linguistics.bopomofo}
							</div>
							<div style="font-size: 1.25em">
								ㄓㄨˋ ㄧㄣ
							</div>
						</Label>

					</div>

				</RadioGroup.Root>

			</div>

			<div class="flex flex-col gap-3">

				<div class="set-item">
					{$_.settings.customise_voices._}
				</div>

				<p class="text-sm text-foreground/50">
					{$_.settings.customise_voices.tip}
				</p>

				<div class="flex flex-col gap-2">
					{#each Object.values(Language) as lang}
						{@const names = $voices.filter(v => v.lang === lang).map(v => v.name)}
						{@const value = newSettings.PreferredVoice[lang]}

						<div class="flex flex-col gap-1">

							<div class="flex items-center gap-3">
								<Checkbox
									checked={newSettings.PreferredVoice[lang] != null}
									disabled={value == null && names.length === 0}
									onCheckedChange={c => {
									newSettings.PreferredVoice[lang] = c ? names[0] : null
									UpdateSettings()
								}}
								/>
								<div>{_Language(lang)}</div>
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

			</div>

		</div>

	</Dialog.Content>

</Dialog.Root>

<style>
	@reference "tailwindcss";

	.radio-group-with-box {
		@apply p-2 rounded-md border-2 border-transparent;

		&:has(:global(button[data-state="checked"])) {
			@apply border-gray-400;
		}
	}

	.set-item {
		@apply font-bold;
	}
</style>
