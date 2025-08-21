<script lang="ts">
	import {goto} from "$app/navigation"
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {Label} from "$lib/components/ui/label"
	import {_} from "$lib/i18n"
	import {HouseIcon} from "@lucide/svelte"
	import * as M from "$lib/components/ui/navigation-menu"
	import * as Card from "$lib/components/ui/card"

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

<M.Root class="m-2">
	<M.List>
		<M.Item>
			<M.Link href="/">
				<div class="flex items-center gap-2">
					<HouseIcon/>
					<div>{$_.home._}</div>
				</div>
			</M.Link>
		</M.Item>
	</M.List>
</M.Root>

<Card.Root class="m-auto mt-6 w-full max-w-sm">

	<Card.Header>
		<Card.Title>
			{$_.new.create_a_new_set_of_words}
		</Card.Title>
	</Card.Header>

	<Card.Content>
		<form class="flex flex-col gap-6" method="POST" action="?/do" {onsubmit}>

			<div class="flex flex-col gap-2">
				<Label>{$_.name}</Label>
				<Input bind:value={name} id="name" name="name" required type="text"/>
			</div>

			<Button {disabled} type="submit">
				{$_.new._}
			</Button>

		</form>
	</Card.Content>

</Card.Root>
