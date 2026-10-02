<script lang="ts">
   import {_} from "../i18n/store"
   import * as Item from "./ui/item"
	import type {Database} from "../service/types"

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
