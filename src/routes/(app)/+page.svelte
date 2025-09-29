<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {_} from "$lib/i18n/store"
	import {settingsOpened} from "$lib/settings/store"

	import Settings from "@lucide/svelte/icons/settings"
	import Plus from "@lucide/svelte/icons/plus"
	import Github from "@lucide/svelte/icons/github"
	import Bug from "@lucide/svelte/icons/bug"
	import Search from "@lucide/svelte/icons/search"

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

	{#if data.user}

		{$_.home.welcome_back}
		<br>
		{data.profile?.name ?? "***"}

	{:else}

		{$_.home.welcome_to_words_trolley}

	{/if}

</header>

<main class="w-full flex flex-col gap-4 items-center">

	<Button href="/search" size="lg" tabindex={0}>
		<Search />
		{$_.search}
	</Button>

	{#if data.user}

		<Button href="/new" size="lg" variant="outline" tabindex={0}>
			<Plus/>
			{$_.home.create_a_new_set}
		</Button>

		<Button href="/creator/{data.user.id}" size="lg" variant="outline" tabindex={0}>
			{$_.home.browse_my_sets}
		</Button>

	{/if}

	<div class="flex gap-4">

		<Button onclick={() => settingsOpened.set(true)} size="lg" variant="outline">
			<Settings/>
			{$_.settings._}
		</Button>

		{#if data.user}

			<Button disabled={loading} onclick={SignOut} size="lg" variant="destructive">
				{$_.logout}
			</Button>

		{:else}

			<Button href="/auth" size="lg">
				{$_.login_and_signup}
			</Button>

		{/if}

	</div>

	<div class="flex gap-4">

		<Button href="https://github.com/SpeedyOrc-C/Words-Trolley" target="_blank" variant="ghost" tabindex={0}>
			<Github/>
			GitHub
		</Button>

		<Button href="/debug" variant="ghost" tabindex={0}>
			<Bug/>
			Debug
		</Button>

	</div>

</main>
