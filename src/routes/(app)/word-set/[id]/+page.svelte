<script lang="ts">
	import {goto} from "$app/navigation"
	import {LangFromWord} from "$lib"
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import {Button} from "$lib/components/ui/button"
	import {_} from "$lib/i18n/store"
	import {settingsOpened} from "$lib/settings/store"
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
	import {Service} from "$lib/service"

	import House from "@lucide/svelte/icons/house"
	import BookOpen from "@lucide/svelte/icons/book-open"
	import BookCheck from "@lucide/svelte/icons/book-check"
	import Plus from "@lucide/svelte/icons/plus"
	import Settings from "@lucide/svelte/icons/settings"
	import SquarePen from "@lucide/svelte/icons/square-pen"
	import Copy from "@lucide/svelte/icons/copy"
	import Ellipsis from "@lucide/svelte/icons/ellipsis"
	import Trash2 from "@lucide/svelte/icons/trash-2"
	import PenLine from "@lucide/svelte/icons/pen-line"

	const {data} = $props()

	const service = new Service(data.db)

	let forking = $state(false)

	const isMine =
		data.user != null &&
		data.creator_profile != null &&
		data.user.id == data.creator_profile.id

	async function Fork()
	{
		forking = true
		const newId = await service.WordSet.Fork(data.word_set.id)
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
</script>

<svelte:head>
	<title>{$_.set.title(data.word_set.name)}</title>
</svelte:head>

<nav class="sticky top-0 z-20 p-2 flex justify-between backdrop-blur-xs">

	<Button href="/" tabindex={0} variant="outline">
		<House />
		{$_.home._}
	</Button>

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

<header class="my-4 px-4 text-center">

	<div class="text-3xl">
		{data.word_set.name}
	</div>

	{#if data.creator_profile == null}
		<div class="text-muted-foreground text-sm">
			{$_.set.creator_profile_missing}
		</div>
	{:else}
		<div>
			<a href="/creator/{data.creator_profile.id}" tabindex="0">
				{$_.set.creator_label(data.creator_profile.name)}
			</a>
		</div>
	{/if}

	{#if data.word_set.language == null}
		<div class="text-muted-foreground text-sm">
			{$_.set.main_language_missing}
		</div>
	{:else}
		<div>
			{$_.language[data.word_set.language]}
		</div>
	{/if}

</header>

<main>

	<div class="mx-auto my-4 px-4 w-full max-w-md flex gap-4">

		<Button class="flex-1" href="/word-set/{data.word_set.id}/learn" tabindex={0}>
			<BookOpen />
			{$_.set.learn}
		</Button>

		<Button class="flex-1" href="/word-set/{data.word_set.id}/test" tabindex={0} variant="outline">
			<BookCheck />
			{$_.set.test}
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

				<!--				<DropdownMenuItem disabled={!isMine}>-->
				<!--					<PenLine />-->
				<!--					{$_.editor.rename}-->
				<!--				</DropdownMenuItem>-->

				<DropdownMenuItem disabled={!isMine} onclick={() => goto(`/edit/${data.word_set.id}`)}>
					<SquarePen />
					{$_.edit}
				</DropdownMenuItem>

				<!--				<DropdownMenuItem disabled={!isMine} variant="destructive">-->
				<!--					<Trash2 />-->
				<!--					{$_.editor.delete}-->
				<!--				</DropdownMenuItem>-->

			</DropdownMenuContent>

		</DropdownMenu>

	</div>

	<div class="mx-2">
		<Table class="mx-auto my-4 w-full max-w-md">

			<TableHeader>
				<TableRow>
					<TableHead class="text-muted-foreground">
						{$_.editor.word}
					</TableHead>
					<TableHead class="text-muted-foreground">
						{$_.editor.meaning}
					</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{#each data.word_set.words as word}
					<TableRow>
						<TableCell>
							{#if word.type === WordType.Egyptian}
								<EgyptianText t={word.word} />
							{:else}
								<span lang={LangFromWord(word)}>
									{word.word}
								</span>
							{/if}
						</TableCell>
						<TableCell>
							{word.meaning}
						</TableCell>
					</TableRow>
				{/each}
			</TableBody>

		</Table>
	</div>

</main>
