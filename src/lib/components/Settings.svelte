<script lang="ts">
	import {type ISettings, MandarinScript, settings} from "$lib/Settings"
	import {_, Language} from "$lib/i18n"
	import * as Dialog from "$lib/components/ui/dialog"
	import * as Select from "$lib/components/ui/select"
	import * as RadioGroup from "$lib/components/ui/radio-group"
	import {Label} from "$lib/components/ui/label"
	import {Languages} from "@lucide/svelte"

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
			return "简体中文（中华人民共和国）"
		case Language.EnGb:
			return "English (United Kingdom)"
		case "auto":
			return $_.settings.follows_your_system
		}
	}
</script>

<Dialog.Root bind:open>

	<Dialog.Content>

		<Dialog.Header>
			<Dialog.Title>
				{$_.settings._}
			</Dialog.Title>
		</Dialog.Header>

		<div class="flex flex-col gap-6">

			<div class="flex flex-col gap-2">

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

						<Select.Item value={Language.ZhCn}>
							简体中文（中华人民共和国）
						</Select.Item>

						<Select.Item value={Language.EnGb}>
							English (United Kingdom)
						</Select.Item>

					</Select.Content>

				</Select.Root>

			</div>

			<div class="flex flex-col gap-2">

				<Label>{$_.settings.mandarin_script}</Label>

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
</style>
