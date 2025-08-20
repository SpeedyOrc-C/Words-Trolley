<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {Label} from "$lib/components/ui/label"
	import {_} from "$lib/i18n"
	import JustHomeNavbar from "$lib/JustHomeNavbar.svelte"
</script>

<JustHomeNavbar/>

<main>
	<header>
		<h1 class="text-2xl text-center m-4">
			{$_.new.create_a_new_set_of_words}
		</h1>
	</header>

	<form action="?/do" class="m-auto px-2 w-full max-w-md flex flex-col gap-6" method="post">

		<div class="flex flex-col gap-2">
			<Label>{$_.name}</Label>
			<Input id="name" name="name" required type="text"/>
		</div>

		<Button type="submit">{$_.submit}</Button>

	</form>

</main>
