<script lang="ts">
	import {goto} from "$app/navigation"
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {Label} from "$lib/components/ui/label"
	import {_} from "$lib/i18n"
	import * as M from "$lib/components/ui/navigation-menu"
	import * as Card from "$lib/components/ui/card"

	import HouseIcon from "@lucide/svelte/icons/house"

	const {data} = $props()
	const db = $derived(data.db)

	let disabled = $state(false)
	let name = $state("")

	async function onsubmit(e: SubmitEvent)
	{
		e.preventDefault()

		disabled = true

		const {data, error} = await db
			.from("sets")
			.insert({name, words: []})
			.select()

		if (error)
		{
			disabled = false
			console.error(error)
			return
		}

		await goto(`/edit/${data[0].id}`)
	}
</script>

<svelte:head>
	<title>
		{$_.new.create_a_new_set_of_words}
	</title>
</svelte:head>

<nav class="p-2">
	<Button href="/" variant="outline">
		<HouseIcon />
		<div>{$_.home._}</div>
	</Button>
</nav>

<Card.Root class="m-auto mt-6 w-full max-w-sm">

	<Card.Header>
		<Card.Title>
			{$_.new.create_a_new_set_of_words}
		</Card.Title>
	</Card.Header>

	<Card.Content>
		<form action="?/do" class="flex flex-col gap-6" method="POST" {onsubmit}>

			<div class="flex flex-col gap-2">
				<Label for="name">{$_.name}</Label>
				<Input bind:value={name} id="name" name="name" required type="text" />
			</div>

			<Button {disabled} type="submit">
				{$_.new._}
			</Button>

		</form>
	</Card.Content>

</Card.Root>
