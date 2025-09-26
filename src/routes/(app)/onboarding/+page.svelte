<script lang="ts">

	import {Button} from "$lib/components/ui/button"
	import {CardContent, CardHeader, CardTitle} from "$lib/components/ui/card/index.js"
	import {Input} from "$lib/components/ui/input"
	import {Card} from "$lib/components/ui/card"
	import {Label} from "$lib/components/ui/label"
	import {_} from "$lib/i18n/store"
</script>

<svelte:head>
	<title>{$_.onboarding.complete_your_profile}</title>
</svelte:head>

<Card class="m-auto mt-6 w-full max-w-sm">

	<CardHeader>
		<CardTitle class="text-center">
			{$_.onboarding.complete_your_profile}
		</CardTitle>
	</CardHeader>

	<CardContent>
		<form action="?/do" class="flex flex-col gap-6" method="POST">

			<div class="flex flex-col gap-2">
				<Label for="name">{$_.display_name}</Label>
				<Input id="name" name="name" required />
			</div>

			<Button type="submit">
				{$_.continue}
			</Button>

		</form>
	</CardContent>

</Card>
