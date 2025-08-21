<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {Label} from "$lib/components/ui/label"
	import {_} from "$lib/i18n"
	import {HouseIcon} from "@lucide/svelte"
	import * as M from "$lib/components/ui/navigation-menu"
	import * as Card from "$lib/components/ui/card"
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
		<form action="?/do" class="flex flex-col gap-6" method="POST">

			<div class="flex flex-col gap-2">
				<Label>{$_.name}</Label>
				<Input id="name" name="name" required type="text"/>
			</div>

			<Button type="submit">
				{$_.submit}
			</Button>

		</form>
	</Card.Content>

</Card.Root>
