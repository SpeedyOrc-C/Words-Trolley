<script lang="ts">
	import * as M from "$lib/components/ui/menubar"
	import {goto} from "$app/navigation"
	import {_} from "$lib/i18n/store"

	import BookOpen from "@lucide/svelte/icons/book-open"
	import BookCheck from "@lucide/svelte/icons/book-check"
	import SaveIcon from "@lucide/svelte/icons/save"
	import ListPlus from "@lucide/svelte/icons/list-plus"
	import FolderInput from "@lucide/svelte/icons/folder-input"
	import FolderOutput from "@lucide/svelte/icons/folder-output"
	import Trash2 from "@lucide/svelte/icons/trash-2"
	import Copy from "@lucide/svelte/icons/copy"
	import ArrowBigLeft from "@lucide/svelte/icons/arrow-big-left"
	import ScanEye from "@lucide/svelte/icons/scan-eye"
	import Info from "@lucide/svelte/icons/info"
	import EditorNavRightButtons from "../EditorNavRightButtons.svelte"

	let {
		OpenInitialisation,
		showWordOperations = $bindable(),
		showExtraOptions = $bindable(),
		propertiesSheetOpen = $bindable(),
		online,
		isMine,
		id,
		origin,
		saving,
		saved,
		deleting,
		forking,
		Save,
		Import,
		Export,
		Delete,
		Fork,
	}: {
		online: boolean
		id: string | null
		origin: string | null
		isMine: boolean
		saving: boolean
		saved: boolean
		deleting: boolean
		forking: boolean
		showWordOperations: boolean
		showExtraOptions: boolean
		propertiesSheetOpen: boolean
		OpenInitialisation: () => any
		Save: () => any
		Fork: () => any
		Import: () => any
		Export: () => any
		Delete: () => any
	} = $props()

	async function GuardedGoto(url: string) {
		if (!saved) {
			const ok = confirm($_.editor.you_have_unsaved_changes)

			if (!ok) return
		}

		await goto(url)
	}

	async function GuardedAction(action: () => any) {
		if (!saved) {
			const ok = confirm($_.editor.you_have_unsaved_changes)

			if (!ok) return
		}

		action()
	}
</script>

<nav class="sticky top-0 p-2 z-10 flex gap-2 backdrop-blur-xs">
	<M.Root class="grow">
		<M.Menu>
			<M.Trigger>
				{$_.word_set}
			</M.Trigger>

			<M.Content>
				{#if online}
					<M.Item
						disabled={saving || saved || !online || !isMine}
						onclick={Save}
					>
						<SaveIcon />
						{#if saving}
							{$_.editor.saving}
						{:else if saved}
							{$_.editor.saved}
						{:else}
							{$_.editor.save}
						{/if}
					</M.Item>
				{/if}

				{#if online}
					<M.Item onclick={() => propertiesSheetOpen = true}>
						<Info />
						{$_.file.properties}
					</M.Item>
				{/if}

				<M.Item onclick={OpenInitialisation}>
					<ListPlus />
					{$_.editor.initialise}
				</M.Item>

				<M.Separator />

				{#if online}
					<M.Item
						disabled={forking}
						onclick={() => GuardedAction(Fork)}
					>
						<Copy />
						{$_.editor.fork._}
					</M.Item>
				{/if}

				<M.Item onclick={Import}>
					<FolderInput />
					{$_.file.import._}
				</M.Item>

				<M.Item onclick={Export}>
					<FolderOutput />
					{$_.file.export}
				</M.Item>

				{#if online}
					<M.Separator />

					<M.Item
						disabled={deleting}
						onclick={Delete}
						variant="destructive"
					>
						<Trash2 />
						{$_.editor.delete}
					</M.Item>
				{/if}
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
					<M.Item onclick={() => GuardedGoto(`/word-set/${id}/learn`)}>
						<BookOpen />
						{$_.set.learn}
					</M.Item>

					<M.Item onclick={() => GuardedGoto(`/word-set/${id}/test`)}>
						<BookCheck />
						{$_.set.test}
					</M.Item>

					<M.Item onclick={() => GuardedGoto(`/word-set/${id}`)}>
						<ScanEye />
						{$_.set.preview}
					</M.Item>

					<M.Separator />

					<M.Item
						disabled={origin == null}
						onclick={() => GuardedGoto(`/edit/${origin}`)}
					>
						<ArrowBigLeft />
						{$_.set.origin}
					</M.Item>
				</M.Content>
			</M.Menu>
		{/if}

		{#if online && !saved && isMine}
			<M.Menu>
				<M.Trigger disabled={saving || saved} onclick={Save}>
					{#if saving}
						{$_.editor.saving}
					{:else}
						{$_.editor.save}
					{/if}
				</M.Trigger>
			</M.Menu>
		{/if}
	</M.Root>

	<EditorNavRightButtons {saved} />
</nav>
