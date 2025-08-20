<script lang="ts">
	import {_} from "$lib/i18n"
	import {Button} from "$lib/components/ui/button"
	import Settings from "$lib/Settings.svelte"
	import {Settings as Gear} from "@lucide/svelte"

	let {data} = $props()

	let loading = $state(false)
	let settingsOpened = $state(false)

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
	<title>
		Words Trolley
	</title>
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

			<Button href="/new">
				{$_.home.create_a_new_set}
			</Button>

			<Button href="/creator/{data.user.id}" variant="outline">
				{$_.home.browse_my_sets}
			</Button>

		{/if}

		<div class="flex gap-4">
			<Button onclick={() => settingsOpened = true} variant="outline">
				<Gear />
				{$_.settings._}
			</Button>

			{#if data.user}

				<Button disabled={loading} onclick={SignOut} variant="destructive">
					{$_.logout}
				</Button>

			{:else}

				<Button href="/auth">
					{$_.login_and_signup}
				</Button>

			{/if}
		</div>

	</div>

</main>

<Settings bind:open={settingsOpened}/>
