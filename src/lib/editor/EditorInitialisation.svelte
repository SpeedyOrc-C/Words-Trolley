<script lang="ts">
	import {_} from "$lib/i18n"
	import {Card} from "$lib"

	let {
		open = $bindable(false),
		ReplaceWithEmptyWords,
	}: {
		open: boolean
		ReplaceWithEmptyWords: (card: Card, count: number) => void
	} = $props()
	let dialog: HTMLDialogElement

	let wordCount = $state(5)
	let cardType = $state(Card.Simple)

	$effect(() =>
	{
		if (open && ! dialog.open)
			dialog.showModal()
		else if (! open && dialog.open)
			dialog.close()
	})
</script>

<dialog
	bind:this={dialog}
	class="modal select-none"
	onclose={() => open = false}
>

	<div class="modal-box">

		<form class="flex items-center justify-between gap-4" method="dialog" onsubmit={console.log}>
			<header class="text-2xl">
				Initialisation
			</header>
			<button class="btn btn-soft btn-error">
				{$_.close}
			</button>
		</form>

		<div class="h-4"></div>

		<div class="flex flex-col gap-8">

			<label class="flex flex-col items-start gap-2">

            <span class="text-lg">
               Word count
            </span>

				<span class="inline-flex gap-2 w-full">
               <input bind:value={wordCount} class="input input-lg w-full" min={1} type="number">
					{#each [5, 10, 20] as count}
                  <button class="btn btn-lg flex-1" onclick={() => wordCount = count}>
                     {count}
                  </button>
               {/each}
            </span>

			</label>

			<button class="btn btn-primary" onclick={() => ReplaceWithEmptyWords(Card.Simple, wordCount)}>
				Replace existing with {wordCount} empty words
			</button>

			<label class="flex flex-col items-start gap-2">

            <span class="text-lg">
               Language
            </span>

				<select bind:value={cardType} class="select select-lg w-full">

					<option value={Card.Simple}>
						{$_.Card.Simple}
					</option>

					<option value={Card.Japanese}>
						{$_.Card.Japanese}
					</option>

					<option value={Card.French}>
						{$_.Card.French}
					</option>

					<option value={Card.Mandarin}>
						{$_.Card.Mandarin}
					</option>

					<option value={Card.German}>
						{$_.Card.German}
					</option>

				</select>

			</label>

			<button class="btn btn-primary">
				Set all words’ languages
			</button>

			<button class="btn btn-soft btn-primary">
				Replace and set languages
			</button>

		</div>


	</div>

</dialog>