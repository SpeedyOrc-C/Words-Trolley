<script lang="ts">
	import * as Item from "$lib/components/ui/item"
   import {_} from "$lib/i18n/store"
</script>

<svelte:head>
   <title>{$_.learning_resources._}</title>
   <meta name="description" content="{$_.learning_resources.meta_description}" />
</svelte:head>

<header class="text-center p-4 text-3xl">
   {$_.learning_resources._}
</header>

<main class="mx-auto p-4 w-full max-w-xl space-y-8">

   <section>

      <header>
         日语
      </header>

      <Item.Root variant="outline">
         {#snippet child({props})}
            <a href="/tool/japanese/alphabet" {...props} tabindex={0}>
               <Item.Content>
                  <Item.Title>
                     字母表
                  </Item.Title>
                  <Item.Description>
                     附带罗马字的平假名与片假名表。
                  </Item.Description>
               </Item.Content>
            </a>
         {/snippet}
      </Item.Root>

   </section>

   <section>

<!--
Fake Egyptian Hieroglyphs websites:
https://discoveringegypt.com/hieroglyphic-typewriter
https://discoveringegypt.com/hieroglyphic-typewriter-chinese
https://emojiuse.com/english-to-hieroglyphics
https://lingojam.com/HieroglyphicsTranslator
https://lingojam.com/EnglishtoEgyptianHieroglyphics
https://www.fromcairo.com/hieroglyphics.htm
https://www.lexilogos.com/keyboard/hieroglyph.htm
https://www.mobilefish.com/services/hieroglyphs/hieroglyphs.php
https://www.penn.museum/cgi/hieroglyphsreal.php
-->

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

   section {
      @apply space-y-4;
   }

   section > header {
      @apply text-2xl;
   }
</style>
