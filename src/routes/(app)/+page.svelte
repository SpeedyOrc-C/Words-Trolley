<script lang="ts">
	import {Button} from "$lib/components/ui/button"
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
	<meta name="google-site-verification" content="LgylSiIsanuhSU46lPG1N7luYA1a1b8Q0qcaoD8xdhM">
</svelte:head>

<header class="my-4 text-center text-2xl">

	{#if data.user}

		{$_.home.welcome_back}
		<br>
		{data.profile?.name ?? "***"}

	{:else}

		{$_.home.welcome_to_words_trolley}

	{/if}

</header>

<main class="mx-auto w-full max-w-xs flex flex-col gap-4 items-center">

	<Button href="/search" variant="outline" size="lg" tabindex={0} class="w-full">
		<Search />
		{$_.search}
	</Button>

	{#if data.user}

		<Button href="/new" size="lg" variant="outline" tabindex={0} class="w-full">
			<Plus/>
			{$_.home.create_a_word_set}
		</Button>

		<Button href="/creator/{data.user.id}" size="lg" variant="outline" tabindex={0} class="w-full">
			<BookUser />
			{$_.home.created_by_me}
		</Button>

		<Button href="/saved" size="lg" variant="outline" tabindex={0} class="w-full">
			<Bookmark />
			{$_.home.saved_by_me}
		</Button>

	{/if}

	<div class="w-full flex gap-4">

		<Button onclick={() => settingsOpened.set(true)} size="lg" variant="outline" class="flex-1">
			<Settings/>
			{$_.settings._}
		</Button>

		{#if data.user}

			<Button disabled={loading} onclick={SignOut} size="lg" variant="secondary" class="flex-1">
				<LogOut />
				{$_.logout}
			</Button>

		{:else}

			<Button href="/auth" size="lg" class="flex-1">
				<LogIn />
				{$_.login_and_signup}
			</Button>

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
