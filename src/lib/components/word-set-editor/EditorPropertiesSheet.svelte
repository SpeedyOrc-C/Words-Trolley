<script lang="ts">
   import {_} from "$lib/i18n/store"
	import * as Sheet from "$lib/components/ui/sheet"
	import * as Field from "$lib/components/ui/field"
   import * as NS from "$lib/components/ui/native-select"
   import Input from "$lib/components/ui/input/input.svelte"
   import Button from "$lib/components/ui/button/button.svelte"
   import type {Service} from "$lib/service"
	import {Language} from "$lib/i18n/Language"
	import {toast} from "svelte-sonner"

   let {
      open = $bindable(),
      name = $bindable(),
      mainLanguage = $bindable(),
      service,
      id,
   }: {
      open: boolean
      name: string
      mainLanguage: Language | null
      service: Service
      id: string
   } = $props()

   let loading = $state(false)
   let newName = $state(name)
   let newMainLanguage = $state(mainLanguage)

   async function Save()
   {
      loading = true

      const error = await service.WordSet.PutMetadata(id, {
         name: newName,
         language: newMainLanguage,
      })

      loading = false

      if (error)
		{
			console.error(error)
			toast.error(error.message)
			return
		}

      name = newName
      mainLanguage = newMainLanguage

      open = false
   }
</script>

<Sheet.Root bind:open>
	<Sheet.Content side="left">
		<Sheet.Header>
			<Sheet.Title>{$_.file.properties}</Sheet.Title>
		</Sheet.Header>

		<div class="mx-4">
			<Field.Set>
				<Field.Field>
					<Field.Label>
                  {$_.name}
               </Field.Label>
					<Input bind:value={newName} />
				</Field.Field>

				<Field.Field>
					<Field.Label>
                  {$_.set.main_language}
               </Field.Label>
               <NS.Root bind:value={newMainLanguage}>
                  {#each Object.values(Language) as language}
                     <NS.Option value={language}>{$_.language[language]}</NS.Option>
                  {/each}
               </NS.Root>
				</Field.Field>
			</Field.Set>
		</div>

		<Sheet.Footer>
			<Button onclick={Save} disabled={loading}>
            {$_.editor.save}
         </Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
