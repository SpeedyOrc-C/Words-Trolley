<script lang="ts">
	import {online} from "svelte/reactivity/window"
	import {Button} from "$lib/components/ui/button"
	import {ButtonGroup} from "$lib/components/ui/button-group"
	import {_} from "$lib/i18n/store"
	import {settingsOpened} from "$lib/settings/store"

	import Settings from "@lucide/svelte/icons/settings"
	import Plus from "@lucide/svelte/icons/plus"
	import Github from "@lucide/svelte/icons/github"
	import Bug from "@lucide/svelte/icons/bug"
	import Search from "@lucide/svelte/icons/search"
	import LogIn from "@lucide/svelte/icons/log-in"
	import LogOut from "@lucide/svelte/icons/log-out"
	import Bookmark from "@lucide/svelte/icons/bookmark"
	import BookUser from "@lucide/svelte/icons/book-user"
	import LibraryBig from "@lucide/svelte/icons/library"
	import User from "@lucide/svelte/icons/user"
	import FileText from "@lucide/svelte/icons/file-text"
	import Layers from "@lucide/svelte/icons/layers"
	import NotByAiBadge from "$lib/components/not-by-ai/NotByAiBadge.svelte"

	let {data} = $props()
	let loading = $state(false)

	async function SignOut()
	{
		loading = true
		const {error} = await data.db.auth.signOut()
		loading = false

		if (error)
		{
			console.error(error)
			alert(error.message)
		}
	}
</script>

<svelte:head>
	<title>Words Trolley</title>
</svelte:head>

<header class="my-4 text-center text-2xl">

	{#if data.user && online.current}

		{$_.home.welcome_back}
		<br>
		{data.profile?.name ?? "***"}

	{:else}

		{$_.home.welcome_to_words_trolley}

	{/if}

</header>

<main class="mx-auto w-full max-w-xs flex flex-col gap-4 items-center">

	<ButtonGroup orientation="vertical" class="w-full">

		{#if online.current}

			<Button href="/search" variant="outline" size="lg" tabindex={0}>
				<Search />
				{$_.search}
			</Button>

			{#if data.user}

				<Button href="/new" size="lg" variant="outline" tabindex={0}>
					<Plus/>
					{$_.home.create_a_word_set}
				</Button>

				<Button href="/creator/{data.user.id}" size="lg" variant="outline" tabindex={0}>
					<BookUser />
					{$_.home.created_by_me}
				</Button>

				<Button href="/saved" size="lg" variant="outline" tabindex={0}>
					<Bookmark />
					{$_.home.saved_by_me}
				</Button>

			{/if}

		{/if}

	</ButtonGroup>

	<ButtonGroup class="w-full" orientation="vertical">
		<Button variant="outline" size="lg" href="/tool" tabindex={0}>
			<LibraryBig />
			{$_.learning_resources._}
		</Button>
		<Button variant="outline" size="lg" href="/word-set-editor" tabindex={0}>
			<Layers />
			{$_.editor._}
		</Button>
		<Button variant="outline" size="lg" href="/block-editor" tabindex={0}>
			<FileText />
			{$_.block_editor._}
		</Button>
	</ButtonGroup>

	{#if online.current && data.user && data.profile}
		<Button class="w-full" href="/profile" size="lg" variant="outline" tabindex={0}>
			<User/>
			{$_.my_profile._}
		</Button>
	{/if}

	<div class="w-full flex gap-4">

		<Button onclick={() => settingsOpened.set(true)} size="lg" variant="outline" class="flex-1">
			<Settings/>
			{$_.settings._}
		</Button>

		{#if online.current}
			{#if data.user}

				<Button disabled={loading || ! online.current} onclick={SignOut} size="lg" variant="secondary" class="flex-1">
					<LogOut />
					{$_.logout}
				</Button>

			{:else}

				<Button disabled={! online.current} href="/auth" size="lg" class="flex-1" tabindex={0}>
					<LogIn />
					{$_.login_and_signup}
				</Button>

			{/if}
		{/if}

	</div>

	<div class="w-full flex gap-4">

		<Button href="https://github.com/SpeedyOrc-C/Words-Trolley" target="_blank" variant="ghost" size="lg" tabindex={0} class="flex-1">
			<Github/>
			GitHub
		</Button>

		<Button href="/debug" variant="ghost" size="lg" tabindex={0} class="flex-1">
			<Bug/>
			Debug
		</Button>

	</div>

</main>

<footer class="my-4 mx-auto w-fit">
	<div>
		<NotByAiBadge/>
	</div>
</footer>
