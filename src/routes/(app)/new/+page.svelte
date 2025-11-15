<script lang="ts">
	import {goto} from "$app/navigation"
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import * as Field from "$lib/components/ui/field"
	import {_} from "$lib/i18n/store"

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
		{$_.new.create_a_new_word_set}
	</title>
</svelte:head>

<nav class="p-2">
	<Button href="/" variant="outline">
		<HouseIcon />
		<div>{$_.home._}</div>
	</Button>
</nav>

<main class="m-auto px-4 w-full max-w-sm">

	<form action="?/do" method="POST" {onsubmit}>
		<Field.Group>
			<Field.Set>
				<Field.Legend>
					{$_.new.create_a_new_word_set}
				</Field.Legend>
				<Field.Group>
					<Field.Field>
						<Field.Label for="name">{$_.name}</Field.Label>
						<Input bind:value={name} id="name" name="name" type="text" required/>
					</Field.Field>
					<Field.Field>
						<Button {disabled} type="submit">
							{$_.new._}
						</Button>
					</Field.Field>
				</Field.Group>
			</Field.Set>
		</Field.Group>
	</form>

</main>
