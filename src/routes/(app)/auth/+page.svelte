<script lang="ts">
	import * as Card from "$lib/components/ui/card"
	import {Input} from "$lib/components/ui/input"
	import {Button} from "$lib/components/ui/button"
	import {Label} from "$lib/components/ui/label"
	import {_} from "$lib/i18n/store"

	import House from "@lucide/svelte/icons/house"
</script>

<svelte:head>
	<title>
		{$_.login_and_signup}
	</title>
</svelte:head>

<nav class="sticky top-0 z-20 p-2 flex justify-between backdrop-blur-xs">
	<Button href="/" tabindex={0} variant="ghost">
		<House />
		{$_.home._}
	</Button>
</nav>

<main>
	<Card.Root class="m-auto mt-6 w-full max-w-sm">
		<Card.Content>
			<form action="?/login" class="flex flex-col gap-6" method="POST">
				<div class="flex flex-col gap-2">
					<Label for="email">{$_.email}</Label>
					<Input id="email" name="email" required type="email" />
				</div>

				<div class="flex flex-col gap-2">
					<Label for="password">{$_.password}</Label>
					<Input id="password" name="password" required type="password" />
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
</main>
