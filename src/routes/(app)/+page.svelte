<script lang="ts">
	import {_} from "$lib/i18n"
	import {Button} from "$lib/components/ui/button"
	import {settingsOpened} from "$lib/settings/store"

	import Gear from "@lucide/svelte/icons/settings"
	import Plus from "@lucide/svelte/icons/plus"
	import Github from "@lucide/svelte/icons/github"
	import Bug from "@lucide/svelte/icons/bug"

	let {data} = $props()

	let loading = $state(false)

	async function SignOut()
	{
		loading = true

		const {error} = await data.db.auth.signOut()

		if (error)
		{
			console.error(error)
			alert("Cannot log out.")
		}

		loading = false
	}
</script>

<svelte:head>
	<title>Words Trolley</title>
</svelte:head>

<main>

	<header class="my-4 text-center text-2xl">

		{#if data.user}

			{$_.home.welcome_back}
			<br>
			{data.user.email}

		{:else}

			{$_.home.welcome_to_words_trolley}

		{/if}

	</header>

	<div class="w-full flex flex-col gap-4 items-center">

		{#if data.user}

			<Button href="/new" size="lg">
				<Plus/>
				{$_.home.create_a_new_set}
			</Button>

			<Button href="/creator/{data.user.id}" size="lg" variant="outline">
				{$_.home.browse_my_sets}
			</Button>

		{/if}

		<div class="flex gap-4">
			<Button onclick={() => settingsOpened.set(true)} size="lg" variant="outline">
				<Gear/>
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
			<Button href="https://github.com/SpeedyOrc-C/Words-Trolley" target="_blank" variant="ghost">
				<Github/>
				GitHub
			</Button>
			<Button href="/debug" variant="ghost">
				<Bug/>
				Debug
			</Button>
		</div>

	</div>

</main>
