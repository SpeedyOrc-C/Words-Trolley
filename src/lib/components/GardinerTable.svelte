<script lang="ts" module>
   import * as Card from "$lib/components/ui/card"
   import {GardinerPrefixes, Gardiner2Literal} from "$lib/word/egyptian/gardiner/gardiner-literal"
   import Button from "./ui/button/button.svelte"
   import EgyptianText from "$lib/components/EgyptianText.svelte"
   import {g} from "$lib/word/egyptian/hieroglyphs"
</script>

<script lang="ts">
	import Separator from "./ui/separator/separator.svelte"

   const {OnSelect}: {OnSelect?: (symbol: string) => void} = $props()

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
</script>

<Card.Root class="w-full p-1">
   <Card.Content class="p-1 flex flex-col gap-2">

      <div class="inline-flex flex-wrap">
         {#each GardinerPrefixes as prefix}
            <Button
               size="icon-lg"
               variant={prefix == selectedPrefix ? "outline" : "ghost"}
               onclick={() => selectedPrefix = prefix}
               class="text-2xl"
            >
               {prefix}
            </Button>
         {/each}
      </div>

      <Separator/>

      <div class="inline-flex flex-wrap">
         {#each selectedSymbolGroup as [code, symbol]}
            <Button
               size="icon-lg"
               variant="ghost"
               onclick={() => OnSelect?.(symbol)}
               class="text-2xl"
               title={code}
            >
               <EgyptianText t={[g(symbol)]} />
            </Button>
         {/each}
      </div>

   </Card.Content>
</Card.Root>
