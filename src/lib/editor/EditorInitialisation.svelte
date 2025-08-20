<script lang="ts">
	import SelectWordType from "$lib/editor/SelectWordType.svelte"
	import {_} from "$lib/i18n"
	import {WordType} from "$lib"
	import * as Dialog from "$lib/components/ui/dialog"
	import * as Select from "$lib/components/ui/select"
	import {Button} from "$lib/components/ui/button"
	import {Label} from "$lib/components/ui/label"
	import {Input} from "$lib/components/ui/input"

	let {
		open = $bindable(false),
		ReplaceWithEmptyWords,
		SetAllCardsTypes,
	}: {
		open: boolean
		ReplaceWithEmptyWords: (card: WordType, count: number) => void
		SetAllCardsTypes: (card: WordType) => void
	} = $props()

	let wordCount = $state(5)
	let cardType = $state(WordType.Simple)
</script>

<Dialog.Root bind:open>

	<Dialog.Content>

		<Dialog.Header>
			<Dialog.Title>
				{$_.editor.initialisation._}
			</Dialog.Title>
		</Dialog.Header>

		<div class="flex flex-col gap-6">

			<div class="flex flex-col gap-2">

            <Label>{$_.editor.initialisation.word_count}</Label>

				<div class="flex gap-2 w-full">

               <Input bind:value={wordCount} type="number" min={1}/>

					{#each [5, 10, 20] as count}
                  <Button variant="outline" class="btn btn-lg flex-1" onclick={() => wordCount = count}>
                     {count}
                  </Button>
               {/each}

            </div>

				<p class="text-sm text-red-400">
					{$_.editor.initialisation.create_blank.tip}
				</p>

				<Button onclick={() => {
						 ReplaceWithEmptyWords(WordType.Simple, wordCount)
						 open = false
					}}>
					{$_.editor.initialisation.create_blank._(wordCount)}
				</Button>

			</div>

			<div class="flex flex-col gap-2">

            <Label>{$_.editor.initialisation.word_language}</Label>

				<SelectWordType bind:value={cardType} onchange={undefined} />

				<p class="text-sm text-red-400">
					{$_.editor.initialisation.set_all_languages.tip}
				</p>

				<Button onclick={() => {
						SetAllCardsTypes(cardType)
						open = false
					}}>
					{$_.editor.initialisation.set_all_languages._}
				</Button>

			</div>

			<Button variant="secondary" onclick={() => {
					ReplaceWithEmptyWords(WordType.Simple, wordCount)
					SetAllCardsTypes(cardType)
					open = false
				}}>
				{$_.editor.initialisation.create_and_set_languages}
			</Button>

		</div>

	</Dialog.Content>

</Dialog.Root>
