<script lang="ts">
	import {_} from "$lib/i18n"
	import type EditorNavProps from "$lib/editor/EditorNavProps"
	import * as M from "$lib/components/ui/menubar"
	import {Button} from "$lib/components/ui/button"
	import {Home, BookOpen, BookCheck, Settings, SaveIcon, SquarePen, ListPlus, FolderInput, FolderOutput, Trash2} from "@lucide/svelte"
	import {goto} from "$app/navigation"

	let {
		OpenSettings, OpenInitialisation,
		showWordOperations = $bindable(),
		showExtraOptions = $bindable(),
		online, id, saving, saved, deleting, renaming,
		Save, Import, Export, Delete, Rename,
	}: EditorNavProps = $props()

	async function GuardedGoto(url: string)
	{
		if (! saved)
		{
			const ok = confirm($_.editor.you_have_unsaved_changes)

			if (! ok)
				return
		}

		await goto(url)
	}
</script>

<div class="sticky top-0 p-2 z-10 flex gap-2 md:gap-4 backdrop-blur-md" id="editor-nav">

	<M.Root class="grow">

		<M.Menu>

			<M.Trigger>
				{$_.word_set}
			</M.Trigger>

			<M.Content>

				<M.Item disabled={saving || saved || ! online} onclick={Save}>
					<SaveIcon/>
					{#if saving}
						{$_.editor.saving}
					{:else if saved}
						{$_.editor.saved}
					{:else}
						{$_.editor.save}
					{/if}
				</M.Item>

				<M.Item disabled={renaming || ! online} onclick={Rename}>
					<SquarePen/>
					{$_.editor.rename}
				</M.Item>

				<M.Item onclick={OpenInitialisation}>
					<ListPlus/>
					{$_.editor.initialise}
				</M.Item>

				<M.Separator/>

				<M.Item onclick={Import}>
					<FolderInput/>
					{$_.editor.import}
				</M.Item>

				<M.Item onclick={Export}>
					<FolderOutput/>
					{$_.editor.export}
				</M.Item>

				<M.Separator/>

				<M.Item disabled={deleting || ! online} onclick={Delete} variant="destructive">
					<Trash2/>
					{$_.editor.delete}
				</M.Item>

			</M.Content>

		</M.Menu>

		<M.Menu>

			<M.Trigger>
				{$_.editor.view._}
			</M.Trigger>

			<M.Content>

				<M.CheckboxItem bind:checked={showWordOperations}>
					{$_.editor.view.word_operations}
				</M.CheckboxItem>

				<M.CheckboxItem bind:checked={showExtraOptions}>
					{$_.editor.view.extra_options}
				</M.CheckboxItem>

			</M.Content>

		</M.Menu>

		{#if online}

			<M.Menu>

				<M.Trigger>
					{$_.goto}
				</M.Trigger>

				<M.Content>

					<M.Item onclick={() => GuardedGoto(`/learn/${id}`)}>
						<BookOpen/>
						{$_.set.learn}
					</M.Item>

					<M.Item onclick={() => GuardedGoto(`/test/${id}`)}>
						<BookCheck/>
						{$_.set.test}
					</M.Item>

				</M.Content>

			</M.Menu>

		{/if}

		{#if !saved}

			<M.Menu>

				<M.Trigger disabled={saving || saved || !online} onclick={Save}>
					{#if saving}
						{$_.editor.saving}
					{:else}
						{$_.editor.save}
					{/if}
				</M.Trigger>

			</M.Menu>

		{/if}

	</M.Root>

	<div class="hidden sm:block">
		<Button onclick={OpenSettings} variant="outline">
			<Settings/>
			{$_.settings._}
		</Button>
	</div>

	<div class="hidden sm:block">
		<Button onclick={() => GuardedGoto("/")} variant="secondary">
			<Home/>
			{$_.home._}
		</Button>
	</div>

	<div class="sm:hidden">
		<Button onclick={OpenSettings} variant="outline" size="icon">
			<Settings/>
		</Button>
	</div>

	<div class="sm:hidden">
		<Button onclick={() => GuardedGoto("/")} variant="secondary" size="icon">
			<Home/>
		</Button>
	</div>

</div>
