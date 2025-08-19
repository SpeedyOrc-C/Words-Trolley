<script lang="ts">
	import {_} from "$lib/i18n"

	const {data} = $props()
</script>

<nav class="shadow-base-300 shadow-md flex p-2 items-center bg-base-100">

	<a href="/">
		<button class="btn btn-lg btn-ghost">
			{$_.home._}
		</button>
	</a>

	{#if data.user?.id === data.creator}
		<a href="/new" class="btn btn-lg btn-primary">
			{$_.new._}
		</a>
	{/if}

</nav>

<main class="mx-auto w-full max-w-7xl grid md:grid-cols-2 xl:grid-cols-3">
	{#each data.sets as {name, id}}

		<article class="m-2 rounded shadow-md flex flex-col bg-base-100">

			<header class="m-4 grow flex items-center justify-around">
				<div class="text-xl text-center">
					{name}
				</div>
			</header>

			<div class="w-full flex items-center join">

				<a href="/learn/{id}" tabindex="0" class="btn btn-lg flex-1 join-item font-normal">
					{$_.set.learn}
				</a>

				<a href="/test/{id}" tabindex="0" class="btn btn-lg flex-1 join-item font-normal">
					{$_.set.test}
				</a>

				<a href="/edit/{id}" tabindex="0" class="btn btn-lg btn-dash flex-1 join-item font-light">
					{$_.edit}
				</a>

			</div>

		</article>

	{/each}
</main>
