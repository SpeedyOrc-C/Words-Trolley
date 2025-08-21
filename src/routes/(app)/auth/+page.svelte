<script lang="ts">
	import {_} from "$lib/i18n"
	import * as Card from "$lib/components/ui/card"
	import * as M from "$lib/components/ui/navigation-menu"
	import {Input} from "$lib/components/ui/input"
	import {Button} from "$lib/components/ui/button"
	import {Label} from "$lib/components/ui/label"
	import {House} from "@lucide/svelte"
</script>

<svelte:head>
	<title>
		{$_.login_and_signup}
	</title>
</svelte:head>

<M.Root class="m-2">
	<M.List>
		<M.Item>
			<M.Link href="/">
				<div class="flex items-center gap-2">
					<House/>
					<div>{$_.home._}</div>
				</div>
			</M.Link>
		</M.Item>
	</M.List>
</M.Root>

<Card.Root class="m-auto mt-6 w-full max-w-sm">
	<Card.Content>

		<form action="?/login" class="flex flex-col gap-6" method="POST">

			<div class="flex flex-col gap-2">
				<Label for="email">{$_.email}</Label>
				<Input id="email" name="email" required type="email"/>
			</div>

			<div class="flex flex-col gap-2">
				<Label for="password">{$_.password}</Label>
				<Input id="password" name="password" required type="password"/>
			</div>

			<div class="flex flex-col gap-2">
				<Button type="submit">
					{$_.login}
				</Button>

				<Button formaction="?/signup" type="submit" variant="outline">
					{$_.signup}
				</Button>
			</div>

		</form>

	</Card.Content>
</Card.Root>
