<script lang="ts" module>
	export interface EditorNavProps
	{
		online: boolean
		id: string | null
		origin: string | null
		mainLanguage: Language | null
		isMine: boolean
		saving: boolean
		saved: boolean
		deleting: boolean
		renaming: boolean
		forking: boolean
		changingMainLanguage: boolean
		showWordOperations: boolean
		showExtraOptions: boolean
		OpenSettings: () => any
		OpenInitialisation: () => any
		Save: () => any
		Fork: () => any
		Import: () => any
		Export: () => any
		Delete: () => any
		Rename: () => any
		ChangeMainLanguage: (language: Language | null) => Promise<any>
	}
</script>

<script lang="ts">
	import * as M from "$lib/components/ui/menubar"
	import {Button} from "$lib/components/ui/button"
	import {goto} from "$app/navigation"
	import {Language} from "$lib/i18n/Language"
	import {_} from "$lib/i18n/store"

	import Home from "@lucide/svelte/icons/home"
	import BookOpen from "@lucide/svelte/icons/book-open"
	import BookCheck from "@lucide/svelte/icons/book-check"
	import Settings from "@lucide/svelte/icons/settings"
	import SaveIcon from "@lucide/svelte/icons/save"
	import SquarePen from "@lucide/svelte/icons/square-pen"
	import ListPlus from "@lucide/svelte/icons/list-plus"
	import FolderInput from "@lucide/svelte/icons/folder-input"
	import FolderOutput from "@lucide/svelte/icons/folder-output"
	import Trash2 from "@lucide/svelte/icons/trash-2"
	import Copy from "@lucide/svelte/icons/copy"
	import ArrowBigLeft from "@lucide/svelte/icons/arrow-big-left"
	import Ban from "@lucide/svelte/icons/ban"
	import Check from "@lucide/svelte/icons/check"

	let {
		OpenSettings,
		OpenInitialisation,
		showWordOperations = $bindable(),
		showExtraOptions = $bindable(),
		online,
		isMine,
		id,
		origin,
		mainLanguage,
		saving,
		saved,
		deleting,
		renaming,
		forking,
		changingMainLanguage,
		Save,
		Import,
		Export,
		Delete,
		Rename,
		Fork,
		ChangeMainLanguage
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

	async function GuardedAction(action: () => any)
	{
		if (! saved)
		{
			const ok = confirm($_.editor.you_have_unsaved_changes)

			if (! ok)
				return
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

				<M.Item disabled={saving || saved || ! online || ! isMine} onclick={Save}>
					<SaveIcon />
					{#if saving}
						{$_.editor.saving}
					{:else if saved}
						{$_.editor.saved}
					{:else}
						{$_.editor.save}
					{/if}
				</M.Item>

				<M.Item disabled={renaming || ! online} onclick={Rename}>
					<SquarePen />
					{$_.editor.rename}
				</M.Item>

				<M.Sub>

					<M.SubTrigger disabled={changingMainLanguage || ! online}>
						{$_.set.main_language}
					</M.SubTrigger>

					<M.SubContent>

						<M.Item
							disabled={mainLanguage == null || changingMainLanguage}
							onclick={() => ChangeMainLanguage(null)}
						>
							{#if mainLanguage == null}
								<Check />
							{:else}
								<Ban />
							{/if}
							{$_.not_specified}
						</M.Item>

						<M.Separator />

						{#each Object.values(Language) as language}
							<M.Item
								disabled={mainLanguage === language || changingMainLanguage}
								onclick={() => ChangeMainLanguage(language)}
							>
								{#if mainLanguage === language}
									<Check />
								{/if}
								{$_.language[language]}
							</M.Item>
						{/each}

					</M.SubContent>

				</M.Sub>

				<M.Item onclick={OpenInitialisation}>
					<ListPlus />
					{$_.editor.initialise}
				</M.Item>

				<M.Separator />

				<M.Item disabled={! online || forking} onclick={() => GuardedAction(Fork)}>
					<Copy />
					{$_.editor.fork._}
				</M.Item>

				<M.Item onclick={Import}>
					<FolderInput />
					{$_.editor.import._}
				</M.Item>

				<M.Item onclick={Export}>
					<FolderOutput />
					{$_.editor.export}
				</M.Item>

				<M.Separator />

				<M.Item disabled={deleting || ! online} onclick={Delete} variant="destructive">
					<Trash2 />
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

					<M.Item onclick={() => GuardedGoto(`/word-set/${id}/learn`)}>
						<BookOpen />
						{$_.set.learn}
					</M.Item>

					<M.Item onclick={() => GuardedGoto(`/word-set/${id}/test`)}>
						<BookCheck />
						{$_.set.test}
					</M.Item>

					<M.Item disabled={origin == null} onclick={() => GuardedGoto(`/edit/${origin}`)}>
						<ArrowBigLeft />
						{$_.set.origin}
					</M.Item>

				</M.Content>

			</M.Menu>

		{/if}

		{#if ! saved && isMine}

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
			<Settings />
			{$_.settings._}
		</Button>
	</div>

	<div class="hidden sm:block">
		<Button onclick={() => GuardedGoto("/")} variant="secondary">
			<Home />
			{$_.home._}
		</Button>
	</div>

	<div class="sm:hidden">
		<Button aria-label={$_.settings._} onclick={OpenSettings} size="icon" variant="outline">
			<Settings />
		</Button>
	</div>

	<div class="sm:hidden">
		<Button aria-label={$_.home._} onclick={() => GuardedGoto("/")} size="icon" variant="secondary">
			<Home />
		</Button>
	</div>

</nav>
