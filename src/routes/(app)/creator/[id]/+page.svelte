<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {_} from "$lib/i18n/store"
	import {settingsOpened} from "$lib/settings/store"

	import House from "@lucide/svelte/icons/house"
	import Settings from "@lucide/svelte/icons/settings"
	import Plus from "@lucide/svelte/icons/plus"
	import Search from "@lucide/svelte/icons/search"
	import WordSetEntry from "$lib/components/WordSetEntry.svelte"

	const {data} = $props()

	const title =
		data.user != null &&
		data.creator != null &&
		data.user.id == data.creator.id
			? $_.creator.title_me
			: $_.creator.title(data.creator?.name ?? "***")
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<nav class="sticky top-0 p-2 z-10 flex items-center justify-between backdrop-blur-xs">

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

		<Button href="/new" tabindex={0}>
			<Plus />
			{$_.new._}
		</Button>

	</div>

</nav>

<header class="p-4 text-xl text-center">
	{data.creator?.name ?? "***"}
</header>

<main class="mx-auto py-4 px-2 w-full max-w-md flex flex-col gap-4 items-center">
	{#each data.sets as {name, id, language}}
		<WordSetEntry {name} {id} {language}/>
	{/each}
</main>

<div class="h-8"></div>
