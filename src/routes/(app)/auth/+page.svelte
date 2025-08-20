<script lang="ts">
    import {_} from "$lib/i18n"
    import * as Card from "$lib/components/ui/card"
    import {Input} from "$lib/components/ui/input"
    import {Button} from "$lib/components/ui/button"
    import {Label} from "$lib/components/ui/label"
</script>

<Card.Root class="m-auto mt-6 w-full max-w-sm">
	<Card.Content>

		<form action="?/login" method="POST" class="flex flex-col gap-6">

			<div class="flex flex-col gap-2">
				<Label for="email">{$_.email}</Label>
				<Input id="email" name="email" type="email" required/>
			</div>

			<div class="flex flex-col gap-2">
				<Label for="password">{$_.password}</Label>
				<Input id="password" name="password" type="password" required/>
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
