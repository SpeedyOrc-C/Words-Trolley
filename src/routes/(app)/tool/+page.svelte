<script lang="ts">
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import * as Item from "$lib/components/ui/item"
   import {_} from "$lib/i18n/store"
	import {ExampleWord} from "$lib/word/egyptian"
	import {g} from "$lib/word/egyptian/hieroglyphs"
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
         <span>
            {$_.learning_resources.japanese._}
         </span>
         <span class="text-muted-foreground" lang="ja">
            日本語
         </span>
      </header>

      <Item.Root variant="outline">
         {#snippet child({props})}
            <a href="/tool/japanese/alphabet" {...props} tabindex={0}>
               <Item.Media class="text-3xl" aria-hidden>
                  あ
               </Item.Media>
               <Item.Content>
                  <Item.Title>
                     {$_.learning_resources.japanese.alphabet._}
                  </Item.Title>
                  <Item.Description>
                     {$_.learning_resources.japanese.alphabet.description}
                  </Item.Description>
               </Item.Content>
            </a>
         {/snippet}
      </Item.Root>

   </section>

   <section>

      <header>
         <span>
            {$_.learning_resources.mandarin._}
         </span>
         <span class="text-muted-foreground" lang="zh-CN">
            现代汉语
         </span>
      </header>

      <Item.Root variant="outline">
         {#snippet child({props})}
            <a href="/tool/mandarin/spelling-converter" {...props} tabindex={0}>
               <Item.Media class="text-2xl" aria-hidden>
                  aㄚ
               </Item.Media>
               <Item.Content>
                  <Item.Title>
                     {$_.learning_resources.mandarin.spelling_converter._}
                  </Item.Title>
                  <Item.Description>
                     {$_.learning_resources.mandarin.spelling_converter.description}
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
         <span>
            {$_.learning_resources.egyptian._}
         </span>
         <span class="text-muted-foreground" lang="egy">
            <EgyptianText t={ExampleWord} />
         </span>
      </header>

      <Item.Root variant="outline">
         {#snippet child({props})}
            <a href="/tool/egyptian/alphabet" {...props} tabindex={0}>
               <Item.Media style="font-size: 28px" aria-hidden>
                  <EgyptianText t={[g("𓄿")]}/>
               </Item.Media>
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
               <Item.Media style="font-size: 28px" aria-hidden>
                  <EgyptianText t={[g("𓏞")]}/>
               </Item.Media>
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

      <Item.Root variant="outline">
         {#snippet child({props})}
            <a href="/tool/egyptian/transliteration-converter" {...props} tabindex={0}>
               <Item.Media class="text-2xl">
                  <span>A ꜣ</span>
               </Item.Media>
               <Item.Content>
                  <Item.Title>
                     {$_.learning_resources.egyptian.transliteration_converter._}
                  </Item.Title>
                  <Item.Description>
                     {$_.learning_resources.egyptian.transliteration_converter.description}
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
      @apply inline-flex justify-between w-full text-2xl;
   }
</style>
