<script lang="ts">
   import {_} from "$lib/i18n/store"
   import {Button} from "$lib/components/ui/button"
   import House from "@lucide/svelte/icons/house"
   import Settings from "@lucide/svelte/icons/settings"
   import Plus from "@lucide/svelte/icons/plus"
   import Search from "@lucide/svelte/icons/search"
   import {settingsOpened} from "$lib/settings/store"

   const {data} = $props()

   $inspect(data)
</script>

<svelte:head>
	<title>{$_.home.saved_by_me}</title>
</svelte:head>

<nav class="sticky top-0 p-2 z-10 flex items-center justify-between backdrop-blur-xs">

   <div class="flex gap-2">

		<Button href="/" tabindex={0} variant="outline">
			<House />
			{$_.home._}
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

<main class="mx-auto py-4 pl-2 pr-4 w-full max-w-xl flex flex-col items-center">
	{#each data.saved_word_sets as {name, id}}
		<a href="/word-set/{id}" class="word-set" tabindex="0">
			{name}
		</a>
	{/each}
</main>

<div style="height: 30vh"></div>

<style lang="postcss">
	@reference "tailwindcss";

	.word-set {
		@apply w-full py-2 px-3 text-xl rounded-r-md border-l-3 outline-none transition-all duration-100;

		&:hover, &:focus {
			background-color: var(--secondary);
			border-color: var(--ring);
		}
	}
</style>
