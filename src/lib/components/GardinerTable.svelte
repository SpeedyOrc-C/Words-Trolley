<script lang="ts" module>
   import * as Card from "$lib/components/ui/card"
   import {GardinerPrefixes, Gardiner2Literal} from "$lib/word/egyptian/gardiner/gardiner-literal"
   import Button from "./ui/button/button.svelte"
   import EgyptianText from "$lib/components/EgyptianText.svelte"
   import {g} from "$lib/word/egyptian/hieroglyphs"
</script>

<script lang="ts">
   const {
      OnClickSymbol
   }: {
      OnClickSymbol?: (symbol: string) => void
   } = $props()

   let selectedPrefix: typeof GardinerPrefixes[number] = $state("A")

   const selectedSymbolGroup = $derived(
      Object
         .entries(Gardiner2Literal)
         .filter(([gardiner, _]) =>
         {
            if (selectedPrefix == "A")
               return gardiner.startsWith("A") && !gardiner.startsWith("Aa")
            return gardiner.startsWith(selectedPrefix)
         })
   )

   async function _OnClickSymbol(symbol: string)
   {
      OnClickSymbol?.(symbol)
      await navigator.clipboard.writeText(symbol)
   }
</script>

<div class="w-full flex flex-col space-y-2">

   <div class="inline-flex flex-wrap gap-2">
      {#each GardinerPrefixes as prefix}
         <Button
            size="icon-lg"
            variant={prefix == selectedPrefix ? "outline" : "ghost"}
            onclick={() => selectedPrefix = prefix}
            class="text-xl"
         >
            {prefix}
         </Button>
      {/each}
   </div>

   <Card.Root>
      <Card.Content>
         <div class="inline-flex flex-wrap">
            {#each selectedSymbolGroup as [code, symbol]}
               <Button
                  size="icon-lg"
                  variant="ghost"
                  onclick={() => _OnClickSymbol(symbol)}
                  class="text-2xl"
                  title={code}
               >
                  <EgyptianText t={[g(symbol)]} />
               </Button>
            {/each}
         </div>
      </Card.Content>
   </Card.Root>

</div>
