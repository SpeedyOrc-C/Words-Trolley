<script lang="ts">
   import {_} from "$lib/i18n/store"
   import * as T from "$lib/components/ui/table"
   import Switch from "$lib/components/ui/switch/switch.svelte"
	import Label from "$lib/components/ui/label/label.svelte"

   const t = $derived($_.learning_resources.mandarin.alphabet)

   let useSingleLayerFont = $state(false)

   const initialTable = [
      ["b", "p", "m", "f"],
      ["d", "t", "n", "l"],
      ["g", "k", "h", ""],
      ["j", "q", "x", ""],
      ["zh", "ch", "sh", "r"],
      ["z", "c", "s", ""],
      ["y", "w", "", ""],
   ]

   const finalTable = $derived([
      ["a", "o", "e", "", ""],
      ["i", "u", "ü", "", ""],
      ["ai", "ei", "ui", "", ""],
      ["ao", "ou", "iu", "", ""],
      ["ie", "üe", "er", "", ""],
      ["an", "en", "in", "un", "ün"],
      ["ang", "eng", "ing", "ong", ""],
   ])

   const atomicTable = [
      ["zhi", "chi", "shi", "ri"],
      ["zi", "ci", "si", ""],
      ["yi", "wu", "yu", ""],
      ["ye", "yue", "yuan", ""],
      ["yin", "yun", "ying", ""],
   ]
</script>

<svelte:head>
   <title>{t.inner.title}</title>
   <meta name="description" content={t.inner.meta_description}>
</svelte:head>

<header class="p-4 text-center text-3xl">
   {t.inner.title}
</header>

<main class="mx-auto p-4 max-w-4xl w-full">

   <div class="flex justify-around print:hidden">
      <Label>
         {t.inner.use_single_layer_ag}
         <Switch bind:checked={useSingleLayerFont}/>
      </Label>
   </div>

   <div class="flex flex-col md:flex-row md:gap-8">

      <T.Root class="mx-auto max-w-xs caption-top">
         <T.Caption class="text-xl text-foreground">
            {t.inner.initial}
         </T.Caption>
         <T.Body class="font-pinyin {useSingleLayerFont ? 'single-ag' : ''}">
            {#each initialTable as row}
               <T.Row>
                  {#each row as cell}
                     <T.Cell class="text-3xl text-center">
                        {cell}
                     </T.Cell>
                  {/each}
               </T.Row>
            {/each}
         </T.Body>
      </T.Root>

      <T.Root class="mx-auto max-w-sm caption-top">
         <T.Caption class="text-xl text-foreground">
            {t.inner.final}
         </T.Caption>
         <T.Body class="font-pinyin {useSingleLayerFont ? 'single-ag' : ''}">
            {#each finalTable as row}
               <T.Row>
                  {#each row as cell}
                     <T.Cell class="text-3xl text-center">
                        {cell}
                     </T.Cell>
                  {/each}
               </T.Row>
            {/each}
         </T.Body>
      </T.Root>

   </div>

   <T.Root class="mx-auto mt-8 max-w-xs caption-top">
      <T.Caption class="text-xl text-foreground">
         {t.inner.atomic}
      </T.Caption>
      <T.Body class="font-pinyin {useSingleLayerFont ? 'single-ag' : ''}">
         {#each atomicTable as row}
            <T.Row>
               {#each row as cell}
                  <T.Cell class="text-3xl text-center">
                     {cell}
                  </T.Cell>
               {/each}
            </T.Row>
         {/each}
      </T.Body>
   </T.Root>

</main>

<style lang="postcss">
   @reference "tailwindcss";
</style>