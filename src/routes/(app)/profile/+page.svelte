<script lang="ts">
	import {invalidate} from "$app/navigation"
	import {_} from "$lib/i18n/store"
	import {Button} from "$lib/components/ui/button"
	import House from "@lucide/svelte/icons/house"
	import Settings from "@lucide/svelte/icons/settings"
	import {settingsOpened} from "$lib/settings/store"
	import {Input} from "$lib/components/ui/input"
	import {ButtonGroup} from "$lib/components/ui/button-group"
	import {toast} from "svelte-sonner"
	import * as Field from "$lib/components/ui/field"

	const {data} = $props()

	let name = $state(data.profile.name)
	let email = $state(data.user.email)

	let loading = $state(false)

	async function PutName()
	{
		if (loading)
			return

		loading = true
		const error = await data.service.Profile.PutName(data.user.id, name)
		loading = false

		if (error)
		{
			console.error(error)
			toast.error(error.message)
			return
		}

		await invalidate("supabase:auth")
		toast.success($_.my_profile.save.win)
	}
</script>

<svelte:head>
	<title>{$_.my_profile._}</title>
</svelte:head>

<nav class="p-2 sticky top-0 z-20 flex items-center justify-between backdrop-blur-xs">

	<Button href="/" tabindex={0} variant="outline">
		<House />
		{$_.home._}
	</Button>

	<Button onclick={() => settingsOpened.set(true)} variant="outline">
		<Settings />
		{$_.settings._}
	</Button>

</nav>

<main class="m-auto px-4 w-full max-w-md">

	<Field.Group>
		<Field.Set>

			<Field.Legend>
				{$_.my_profile._}
			</Field.Legend>

			<form onsubmit={PutName}>
				<Field.Field>
					<Field.Label for="name">
						{$_.my_profile.name}
					</Field.Label>
					<ButtonGroup>
						<Input bind:value={name} id="name" required type="text" />
						<Button disabled={loading} type="submit">
							{$_.my_profile.save._}
						</Button>
					</ButtonGroup>
				</Field.Field>
			</form>

			<form>
				<Field.Field>
					<Field.Label for="email">
						{$_.email}
					</Field.Label>
					<ButtonGroup>
						<Input bind:value={email} id="email" disabled type="email" />
					</ButtonGroup>
				</Field.Field>
			</form>

		</Field.Set>
	</Field.Group>

</main>
