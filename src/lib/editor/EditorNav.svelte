<script lang="ts">
	import {_} from "$lib/i18n"
	import type EditorNavProps from "$lib/editor/EditorNavProps"
	import * as M from "$lib/components/ui/menubar"
	import {Button} from "$lib/components/ui/button"

	let {
		OpenSettings, OpenInitialisation,
		online, saving, saved, deleting, renaming,
		Save, Import, Export, Delete, Rename,
	}: EditorNavProps = $props()
</script>

<div id="editor-nav" class="sticky top-0 p-2 z-10 flex gap-2 md:gap-4 backdrop-blur-md">

	<M.Root class="grow">

		<M.Menu>

			<M.Trigger>
				{$_.word_set}
			</M.Trigger>

			<M.Content>

				<M.Item disabled={saving || saved || ! online} onclick={Save}>
					{#if saving}
						{$_.editor.saving}
					{:else if saved}
						{$_.editor.saved}
					{:else}
						{$_.editor.save}
					{/if}
				</M.Item>

				<M.Item disabled={renaming || ! online} onclick={Rename}>
					{$_.editor.rename}
				</M.Item>

				<M.Item onclick={OpenInitialisation}>
					{$_.editor.initialise}
				</M.Item>

				<M.Separator/>

				<M.Item onclick={Import}>
					{$_.editor.import}
				</M.Item>

				<M.Item onclick={Export}>
					{$_.editor.export}
				</M.Item>

				<M.Separator/>

				<M.Item disabled={deleting || ! online} onclick={Delete} variant="destructive">
					{$_.editor.delete}
				</M.Item>

			</M.Content>

		</M.Menu>

	</M.Root>

	<Button onclick={OpenSettings} variant="outline">
		{$_.settings._}
	</Button>

	<Button href="/" variant="secondary">
		{$_.home._}
	</Button>

</div>
