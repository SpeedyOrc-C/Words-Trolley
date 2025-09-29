<script lang="ts">
	import {_} from "$lib/i18n/store"
	import {settingsOpened} from "$lib/settings/store"
	import Button from "$lib/components/ui/button/button.svelte"
	import Input from "$lib/components/ui/input/input.svelte"
	import {Table, TableHeader, TableHead, TableBody, TableRow, TableCell} from "$lib/components/ui/table"
	import {Service} from "$lib/service"

	import House from "@lucide/svelte/icons/house"
	import Settings from "@lucide/svelte/icons/settings"

	const {data} = $props()
	const service = new Service(data.db)

	let query = $state("")
	let _query = $derived(query.trim())
	let searching = $state(false)
	let result: Awaited<ReturnType<typeof service.WordSet.Search>> = $state([])

	if (data.query != null)
		query = data.query

	if (data.preFetchedResult != null)
		result = data.preFetchedResult

	async function Search()
	{
		searching = true
		result = await service.WordSet.Search(_query)
		searching = false
	}
</script>

<svelte:head>
	<title>{$_.search}</title>
</svelte:head>

<nav class="sticky top-0 z-20 p-2 flex gap-2 justify-between backdrop-blur-xs">

	<Button href="/" tabindex={0} variant="outline">
		<House />
		{$_.home._}
	</Button>

	<form onsubmit={Search} class="flex max-w-sm grow gap-2">
		<Input bind:value={query} autofocus />
		<Button
			onclick={Search}
			disabled={searching || _query.length == 0}
			type="submit"
		>
			{$_.search}
		</Button>
	</form>

	<Button onclick={() => settingsOpened.set(true)} variant="outline">
		<Settings />
		{$_.settings._}
	</Button>

</nav>

<main class="m-auto w-full max-w-xl">
	{#if result instanceof Error}

		Error

	{:else if result.length > 0}

		<Table>

			<TableHeader>

				<TableRow>
					<TableHead>
						{$_.word_set}
					</TableHead>
					<TableHead>
						{$_.set.main_language}
					</TableHead>
				</TableRow>

			</TableHeader>

			<TableBody>
				{#each result as {id, name, language}}
					<TableRow>

						<TableCell>
							<a href="/word-set/{id}" class="text-xl">
								{name}
							</a>
						</TableCell>

						<TableCell>
							{#if language != null}
								{$_.language[language]}
							{/if}
						</TableCell>

					</TableRow>
				{/each}
			</TableBody>

		</Table>

	{/if}

	<div style="height: 50dvh"></div>
</main>
