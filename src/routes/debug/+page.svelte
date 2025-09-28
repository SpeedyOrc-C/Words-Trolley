<script lang="ts">
	import * as T from "$lib/components/ui/table"
	import {settings} from "$lib/settings/store"
	import {onMount} from "svelte"
	import {Checkbox} from "$lib/components/ui/checkbox"
	import {voices} from "$lib/speak"

	onMount(() =>
	{
		console.debug($settings)
		console.debug(navigator.languages)
	})

	$effect(() => console.debug($voices))
</script>

<svelte:head>
	<title>DEBUG - Words Trolley</title>
</svelte:head>

<main class="p-2">

	<section>
		<h1>Settings</h1>

		<T.Root>

			<T.Header>
				<T.Row>
					<T.Head>Key</T.Head>
					<T.Head>Value</T.Head>
				</T.Row>
			</T.Header>

			<T.Body>
				{#each Object.entries($settings) as [key, value]}
					<T.Row>
						<T.Cell><code>{key}</code></T.Cell>
						<T.Cell><code>{JSON.stringify(value)}</code></T.Cell>
					</T.Row>
				{/each}
			</T.Body>

		</T.Root>

	</section>

	<section>
		<h1>Navigator Languages</h1>

		<p class="inline-flex gap-4 flex-wrap">
			{#each navigator.languages as lang}
				<code>{lang}</code>
			{/each}
		</p>
	</section>

	<section>
		<h1>Available TTS Voices</h1>

		<T.Root>

			<T.Header>
				<T.Row>
					<T.Head>Is default</T.Head>
					<T.Head>Is local</T.Head>
					<T.Head>Language</T.Head>
					<T.Head>Name</T.Head>
				</T.Row>
			</T.Header>

			<T.Body>
				{#each $voices as voice}
					<T.Row>
						<T.Cell>
							<Checkbox readonly checked={voice.default}/>
						</T.Cell>
						<T.Cell>
							<Checkbox readonly checked={voice.localService}/>
						</T.Cell>
						<T.Cell>
							<code>{voice.lang}</code>
						</T.Cell>
						<T.Cell>
							{voice.name}
						</T.Cell>
					</T.Row>
				{/each}
			</T.Body>

			<T.Footer>
				<T.Row>
					<T.Cell colspan={4}>
						Count: {$voices.length}
					</T.Cell>
				</T.Row>
			</T.Footer>

		</T.Root>
	</section>

</main>

<style>
	@reference "tailwindcss";

	h1 {
		@apply text-xl font-bold mb-2;
	}

	section {
		@apply mb-6;
	}
</style>
