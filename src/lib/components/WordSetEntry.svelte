<script lang="ts">
   import {_} from "$lib/i18n/store"
   import * as Item from "$lib/components/ui/item"
	import type {Database} from "$lib/service/types"

   const {id, name, language}: {
      id: string
      name: string
      language: Database["public"]["Tables"]["sets"]["Row"]["language"]
   } = $props()
</script>

<Item.Root variant="outline" class="w-full">
   {#snippet child({props})}
      <a href="/word-set/{id}" {...props} tabindex={0}>
         <Item.Content>
            <Item.Title>
               {name}
            </Item.Title>
            {#if language != null}
               <Item.Description>
                  {$_.language[language]}
               </Item.Description>
            {/if}
         </Item.Content>
      </a>
   {/snippet}
</Item.Root>
