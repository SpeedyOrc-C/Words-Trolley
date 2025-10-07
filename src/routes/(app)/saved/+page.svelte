<script lang="ts">
   import {_} from "$lib/i18n/store"
   import {Button} from "$lib/components/ui/button"
   import House from "@lucide/svelte/icons/house"
   import Settings from "@lucide/svelte/icons/settings"
   import Plus from "@lucide/svelte/icons/plus"
   import Search from "@lucide/svelte/icons/search"
   import {settingsOpened} from "$lib/settings/store"
	import WordSetEntry from "$lib/components/WordSetEntry.svelte"

   const {data} = $props()
</script>

<svelte:head>
	<title>{$_.home.saved_by_me}</title>
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
	{$_.home.saved_by_me}
</header>

<main class="mx-auto py-4 px-4 w-full max-w-md flex flex-col gap-4">
	{#each data.saved_word_sets as {name, id, language}}
		<WordSetEntry {name} {id} {language} />
	{/each}
</main>

<div class="h-8"></div>
