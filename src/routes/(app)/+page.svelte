<script lang="ts">
	import {_} from "$lib/i18n"

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
	<title>
		Words Trolley
	</title>
</svelte:head>

<main class="bg-base-100">

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

			<a href="/new">
				<button class="btn btn-lg btn-soft btn-primary">
					{$_.home.create_a_new_set}
				</button>
			</a>

			<a href="/creator/{data.user.id}">
				<button class="btn btn-lg btn-soft">
					{$_.home.browse_my_sets}
				</button>
			</a>

			<button disabled={loading} onclick={SignOut} class="btn btn-lg btn-dash btn-error">
				{#if loading}
					<span class="loading loading-spinner"></span>
				{/if}
				{$_.logout}
			</button>

		{:else}

			<a href="/auth">
				<button class="btn btn-lg btn-soft btn-primary">
					{$_.login_and_signup}
				</button>
			</a>

		{/if}

	</div>

</main>
