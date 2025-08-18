<script lang="ts">
	import {MandarinScript, settings} from "$lib/Settings"
	import {_, Language} from "$lib/i18n"

	let {open = $bindable(false)}: { open: boolean } = $props()
	let newSettings = $state($settings)
	let dialog: HTMLDialogElement

	function UpdateSettings()
	{
		settings.set(structuredClone($state.snapshot(newSettings)))
	}

	$effect(() =>
	{
		if (open && ! dialog.open)
			dialog.showModal()
		else if (! open && dialog.open)
			dialog.close()
	})

	$effect(() =>
	{
		newSettings
		UpdateSettings()
	})
</script>

<dialog
	bind:this={dialog}
	class="modal select-none"
	onclose={() => open = false}
>

	<div class="modal-box">

		<form class="flex items-center justify-between gap-4" method="dialog">
			<header class="text-2xl">
				{$_.settings._}
			</header>
			<button class="btn btn-soft btn-error">
				{$_.close}
			</button>
		</form>

		<div class="h-4"></div>

		<div class="flex flex-col gap-8">

			<label class="flex flex-col items-start gap-2">

            <span class="text-lg">
               {$_.settings.ui_language}
            </span>

				<select bind:value={newSettings.Language} class="select w-full">
					<option selected value={null}>
						{$_.settings.follows_your_system}
					</option>
					<option value={Language.ZhCn}>
						简体中文（中华人民共和国）
					</option>
					<option value={Language.EnGb}>
						English (United Kingdom)
					</option>
				</select>

			</label>

			<fieldset class="flex flex-col items-start gap-2">

				<div class="text-lg">
					{$_.settings.mandarin_script}
				</div>

				<div class="flex gap-8">

					<label class="inline-flex items-center gap-2">

						<input
							bind:group={newSettings.MandarinScript}
							class="radio"
							name="set-mandarin-script"
							type="radio"
							value={MandarinScript.Pinyin}
						>

						<span class="inline-flex flex-col items-center">
                     <span>{$_.linguistics.pinyin}</span>
                     <span class="text-xl text-base-content/50">
                        pīn yīn
                     </span>
                  </span>

					</label>

					<label class="inline-flex items-center gap-2">

						<input
							bind:group={newSettings.MandarinScript}
							class="radio"
							name="set-mandarin-script"
							type="radio"
							value={MandarinScript.Bopomofo}
						>

						<span class="inline-flex flex-col items-center">
                     <span>{$_.linguistics.bopomofo}</span>
                     <span class="text-xl text-base-content/50">
                        ㄓㄨˋ ㄧㄣ
                     </span>
                  </span>

					</label>

				</div>

			</fieldset>

		</div>

	</div>

</dialog>

<style>
    dialog:focus {
        outline: none;
    }
</style>