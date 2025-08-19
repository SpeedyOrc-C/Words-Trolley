<script lang="ts">
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

	<form action="?/do" class="m-auto px-2 w-full max-w-md flex flex-col gap-4" method="post">

		<label class="floating-label">
			<span>{$_.name}</span>
			<input class="input input-lg w-full" name="name" placeholder={$_.name}
					 required type="text"/>
		</label>

		<button class="btn btn-lg btn-primary" type="submit">
			{$_.submit}
		</button>

	</form>

</main>
