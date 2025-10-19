<script lang="ts">
	import * as Item from "$lib/components/ui/item"
   import {_} from "$lib/i18n/store"
</script>

<svelte:head>
   <title>{$_.learning_resources._}</title>
</svelte:head>

<header class="text-center p-4 text-3xl">
   {$_.learning_resources._}
</header>

<main class="mx-auto p-4 w-full max-w-xl">

   <section class="space-y-4">

      <header>
         {$_.learning_resources.egyptian._}
      </header>

      <Item.Root variant="outline">
         {#snippet child({props})}
            <a href="/tool/egyptian/alphabet" {...props} tabindex={0}>
               <Item.Content>
                  <Item.Title>
                     {$_.learning_resources.egyptian.alphabet._}
                  </Item.Title>
                  <Item.Description>
                     {$_.learning_resources.egyptian.alphabet.description}
                  </Item.Description>
               </Item.Content>
            </a>
         {/snippet}
      </Item.Root>

      <Item.Root variant="outline">
         {#snippet child({props})}
            <a href="/tool/egyptian/typewriter" {...props} tabindex={0}>
               <Item.Content>
                  <Item.Title>
                     {$_.learning_resources.egyptian.typewriter._}
                  </Item.Title>
                  <Item.Description>
                     {$_.learning_resources.egyptian.typewriter.description}
                  </Item.Description>
               </Item.Content>
            </a>
         {/snippet}
      </Item.Root>

   </section>

</main>

<style lang="postcss">
   @reference "tailwindcss";

   section > header {
      @apply text-2xl;
   }
</style>
