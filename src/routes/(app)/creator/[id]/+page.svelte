<script lang="ts">
	import {_} from "$lib/i18n"
	import {Button} from "$lib/components/ui/button"
	import {settingsOpened} from "$lib/settings/store"

	import House from "@lucide/svelte/icons/house"
	import Settings from "@lucide/svelte/icons/settings"
	import Plus from "@lucide/svelte/icons/plus"

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

	<Button href="/" tabindex={0} variant="outline">
		<House />
		{$_.home._}
	</Button>

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

<header class="p-4 text-lg text-center">
	{data.creator?.name ?? "***"}
</header>

<main class="mx-auto py-4 pl-2 pr-4 w-full max-w-xl flex flex-col items-center">
	{#each data.sets as {name, id}}
		<a href="/word-set/{id}" class="word-set" tabindex="0">
			{name}
		</a>
	{/each}
</main>

<div style="height: 30vh"></div>

<style>
	@reference "tailwindcss";

	.word-set {
		@apply w-full py-2 px-3 text-xl rounded-r-md border-l-3 outline-none transition-all duration-100;

		&:hover, &:focus {
			background-color: var(--secondary);
			border-color: var(--ring);
		}
	}
</style>
