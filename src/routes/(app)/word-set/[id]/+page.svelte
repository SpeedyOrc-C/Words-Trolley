<script lang="ts">
	import {goto} from "$app/navigation"
	import {LangFromWord} from "$lib"
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import {Button} from "$lib/components/ui/button"
	import {_} from "$lib/i18n/store"
	import {settings, settingsOpened} from "$lib/settings/store"
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem
	} from "$lib/components/ui/dropdown-menu"
	import {
		Table,
		TableHeader,
		TableBody,
		TableRow,
		TableHead,
		TableCell
	} from "$lib/components/ui/table"
	import {WordType} from "$lib/word/types"
	import {toast} from "svelte-sonner"

	import House from "@lucide/svelte/icons/house"
	import BookOpen from "@lucide/svelte/icons/book-open"
	import BookCheck from "@lucide/svelte/icons/book-check"
	import Plus from "@lucide/svelte/icons/plus"
	import Settings from "@lucide/svelte/icons/settings"
	import SquarePen from "@lucide/svelte/icons/square-pen"
	import Copy from "@lucide/svelte/icons/copy"
	import Ellipsis from "@lucide/svelte/icons/ellipsis"
	import Search from "@lucide/svelte/icons/search"
	import Trash2 from "@lucide/svelte/icons/trash-2"
	import Bookmark from "@lucide/svelte/icons/bookmark"
	import BookmarkX from "@lucide/svelte/icons/bookmark-x"
	import {preferredSentenceTransliterationDumperForRead, preferredSentenceTransliterationParserForRead} from "$lib/settings/store/egyptian"
	import {preferredMandarinDumper} from "$lib/settings/store/mandarin"
	import {MandarinScript} from "$lib/settings"

	const {data} = $props()

	const {saved: _saved, word_set, creator_profile, service} = $derived(data)

	const isMine = $derived(
		data.user != null &&
		creator_profile != null &&
		data.user.id == creator_profile.id
	)

	const allEgyptian = $derived(
		word_set.words.length > 0 &&
		word_set.words.every(word => word.type == WordType.Egyptian)
	)

	const allMandarin = $derived(
		word_set.words.length > 0 &&
		word_set.words.every(word => word.type == WordType.Mandarin)
	)

	let saving = $state(false)
	let saved = $derived(_saved)
	let forking = $state(false)
	let deleting = $state(false)

	async function Fork()
	{
		forking = true
		const newId = await service.WordSet.Fork(word_set.id)
		forking = false

		if (newId instanceof Error)
		{
			console.error(newId)
			toast.error(newId.message)
			return
		}

		toast.success($_.editor.fork.success)
		await goto(`/word-set/${newId}`)
	}

	async function Delete()
	{
		const ok = confirm(`${$_.editor.delete_confirm.this_will_be_deleted}\n${word_set.name}\n${$_.editor.delete_confirm.are_you_sure}`)

		if (! ok)
			return

		deleting = true
		const error = await service.WordSet.Delete(word_set.id)
		deleting = false

		if (error instanceof Error)
		{
			console.error(error)
			toast.error(error.message)
			return
		}

		if (creator_profile != null)
			await goto(`/creator/${creator_profile.id}`)
	}

	async function Save()
	{
		saving = true
		const error = await service.Save.Put(word_set.id)
		saving = false

		if (error)
		{
			console.error(error)
			toast.error(error.message)
			return
		}

		saved = true
	}

	async function Unsave()
	{
		saving = true
		const error = await service.Save.Delete(word_set.id)
		saving = false

		if (error)
		{
			console.error(error)
			toast.error(error.message)
			return
		}

		saved = false
	}
</script>

<svelte:head>
	<title>{$_.set.title(word_set.name)}</title>
</svelte:head>

<nav class="sticky top-0 z-20 p-2 flex justify-between backdrop-blur-xs print:hidden">

	<div class="flex gap-2">

		<Button href="/" tabindex={0} variant="outline" size="icon" title={$_.home._}>
			<House />
		</Button>

		<Button href="/search" variant="outline" tabindex={0}>
			<Search />
			{$_.search}
		</Button>

	</div>

	<div class="flex items-center gap-2">

		<Button onclick={() => settingsOpened.set(true)} variant="outline">
			<Settings />
			{$_.settings._}
		</Button>

		<Button href="/new" tabindex={0} variant="outline">
			<Plus />
			{$_.new._}
		</Button>

	</div>

</nav>

<header class="m-4 text-center flex flex-col gap-1">

	<div class="text-3xl">
		{word_set.name}
	</div>

	{#if word_set.language == null}
		<div class="text-muted-foreground">
			{$_.set.main_language_missing}
		</div>
	{:else}
		<div>
			{$_.set.main_language_label($_.language[word_set.language])}
		</div>
	{/if}

	<div class="print:hidden">
		{#if creator_profile == null}
			<span class="text-muted-foreground">
				{$_.set.creator_profile_missing}
			</span>
		{:else}
			<a href="/creator/{creator_profile.id}" tabindex="0">
				{$_.set.creator_label(creator_profile.name)}
			</a>
		{/if}
	</div>

</header>

<main>

	<div class="mx-auto my-4 px-2 w-full max-w-md flex gap-4 print:hidden">

		<Button class="flex-1" href="/word-set/{word_set.id}/learn" tabindex={0}>
			<BookOpen />
			{$_.set.learn}
		</Button>

		<Button class="flex-1" href="/word-set/{word_set.id}/test" tabindex={0} variant="outline">
			<BookCheck />
			{$_.set.test}
		</Button>

		<Button class="flex-1" disabled={saving} onclick={saved ? Unsave : Save} variant={saved ? "secondary" : "outline"}>
			{#if saved}
				<BookmarkX />
				{$_.set.unsave}
			{:else}
				<Bookmark />
				{$_.set.save}
			{/if}
		</Button>

		<DropdownMenu>

			<DropdownMenuTrigger>
				{#snippet child({props})}
					<Button {...props} variant="secondary">
						<Ellipsis />
						{$_.more}
					</Button>
				{/snippet}
			</DropdownMenuTrigger>

			<DropdownMenuContent>

				<DropdownMenuItem onclick={Fork} disabled={forking}>
					<Copy />
					{$_.editor.fork._}
				</DropdownMenuItem>

				<DropdownMenuItem disabled={!isMine} onclick={() => goto(`/edit/${word_set.id}`)}>
					<SquarePen />
					{$_.edit}
				</DropdownMenuItem>

				<DropdownMenuItem disabled={!isMine || deleting} onclick={Delete} variant="destructive">
					<Trash2 />
					{$_.editor.delete}
				</DropdownMenuItem>

			</DropdownMenuContent>

		</DropdownMenu>

	</div>

	<Table class="mx-auto my-4 w-full max-w-md print:max-w-full">

		<TableHeader>
			<TableRow>
				<TableHead class="text-muted-foreground">
					{$_.editor.word}
				</TableHead>

				{#if allEgyptian}
					<TableHead class="text-muted-foreground">
						{$_.linguistics.transliteration}
					</TableHead>
				{/if}

				{#if allMandarin}
					<TableHead class="text-muted-foreground">
						{$settings.MandarinScript == MandarinScript.Pinyin ? $_.linguistics.pinyin : $_.linguistics.bopomofo}
					</TableHead>
				{/if}

				<TableHead class="text-muted-foreground">
					{$_.editor.meaning}
				</TableHead>
			</TableRow>
		</TableHeader>

		<TableBody>
			{#each word_set.words as word}
				<TableRow>

					<TableCell lang={LangFromWord(word)}>
						{#if word.type == WordType.Egyptian}
							<EgyptianText t={word.word} wrap={false} />
						{:else}
							{word.word}
						{/if}
					</TableCell>

					{#if allEgyptian && word.type == WordType.Egyptian}
						<TableCell class="italic">
							{$preferredSentenceTransliterationDumperForRead(word.trans)}
						</TableCell>
					{/if}

					{#if allMandarin && word.type == WordType.Mandarin}
						<TableCell>
							<span class:italic={$settings.MandarinScript == MandarinScript.Pinyin}>
								{word.syllables.map($preferredMandarinDumper).join(" ")}
							</span>
						</TableCell>
					{/if}

					<TableCell>
						{word.meaning}
					</TableCell>
				</TableRow>
			{/each}
		</TableBody>

	</Table>

</main>

<div class="h-8"></div>
