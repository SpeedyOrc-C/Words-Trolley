<script lang="ts">
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import * as Item from "$lib/components/ui/item"
   import * as A from "$lib/components/ui/accordion"
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
               <Item.Media class="text-3xl" aria-hidden lang="ja-JP">
                  あ
               </Item.Media>
               <Item.Content>
                  <Item.Title>
                     {$_.learning_resources.japanese.alphabet._}
                  </Item.Title>
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
            <a href="/tool/mandarin/alphabet" {...props} tabindex={0}>
               <Item.Media class="text-2xl" aria-hidden>
                  hàn
               </Item.Media>
               <Item.Content>
                  <Item.Title>
                     {$_.learning_resources.mandarin.alphabet._}
                  </Item.Title>
               </Item.Content>
            </a>
         {/snippet}
      </Item.Root>

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
http://www.touregypt.net/ename
https://anythingtranslate.com/translators/ancient-egyptian-hieroglyphs-translator
https://caseconverter.tools/hieroglyphics-translator
https://c.r74n.com/converter/hieroglyphs
https://discoveringegypt.com/hieroglyphic-typewriter
https://discoveringegypt.com/hieroglyphic-typewriter-chinese
https://emojiuse.com/english-to-hieroglyphics
https://engdic.org/hieroglyphics-translator
https://eztouregypt.com/hieroglyphics-translator
https://funtranslations.com/hieroglyphics
https://github.com/AndriiVal/hieroglyphic-name
https://guardians.net/egypt/hieroglyphs/hiero-translator.htm
https://hieroglyphicstranslator.net
https://lingofreak.com/Hiero/hiero5.html
https://lingojam.com/HieroglyphicsTranslator
https://lingojam.com/EnglishtoEgyptianHieroglyphics
https://shakespearean-translator.com/hieroglyphics
https://www.fromcairo.com/hieroglyphics.htm
https://www.lexilogos.com/keyboard/hieroglyph.htm
https://www.mobilefish.com/services/hieroglyphs/hieroglyphs.php
https://www.penn.museum/cgi/hieroglyphsreal.php
https://www.transmonkey.ai/hieroglyphics-translator
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
               </Item.Content>
            </a>
         {/snippet}
      </Item.Root>

      <Item.Root variant="outline">
         {#snippet child({props})}
            <a href="/tool/egyptian/rte" {...props} tabindex={0}>
               <Item.Media style="font-size: 28px" aria-hidden>
                  <EgyptianText t={[g("𓏞")]}/>
               </Item.Media>
               <Item.Content>
                  <Item.Title>
                     {$_.egyptian.rte.title}
                  </Item.Title>
               </Item.Content>
            </a>
         {/snippet}

      </Item.Root>

      <Item.Root variant="outline">
         {#snippet child({props})}
            <a href="/tool/egyptian/transliteration-converter" {...props} tabindex={0}>
               <Item.Media class="text-2xl" aria-hidden>
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

      <A.Root type="multiple">
         <A.Item>
            <A.Trigger>
               {$_.learning_resources.egyptian.other_input_methods._}
            </A.Trigger>
            <A.Content class="flex flex-col space-y-3">

               <Item.Group>

                  <Item.Root size="sm">
                     {#snippet child({props})}
                        <a href="https://jsesh.qenherkhopeshef.org" target="_blank" tabindex={0} {...props}>
                           <Item.Content>
                              <Item.Title lang="en-GB" dir="ltr">
                                 JSesh
                              </Item.Title>
                           </Item.Content>
                        </a>
                     {/snippet}
                  </Item.Root>

                  <Item.Separator/>

                  <Item.Root size="sm">
                     {#snippet child({props})}
                        <a href="https://projetrosette.info" target="_blank" tabindex={0} {...props}>
                           <Item.Content>
                              <Item.Title lang="fr-FR" dir="ltr">
                                 Projet Rosette
                              </Item.Title>
                           </Item.Content>
                        </a>
                     {/snippet}
                  </Item.Root>

                  <Item.Separator/>

                  <Item.Root size="sm">
                     {#snippet child({props})}
                        <a href="https://somiyagawa.github.io/SINUHE-the-Hierotyper/" target="_blank" tabindex={0} {...props}>
                           <Item.Content>
                              <Item.Title lang="en-GB" dir="ltr">
                                 SINUHE the Hierotyper
                              </Item.Title>
                           </Item.Content>
                        </a>
                     {/snippet}
                  </Item.Root>

                  <Item.Separator/>

                  <Item.Root size="sm">
                     {#snippet child({props})}
                        <a href="https://hieroglyphica.com" target="_blank" tabindex={0} {...props}>
                           <Item.Content>
                              <Item.Title lang="en-GB" dir="ltr">
                                 Hieroglyphica
                              </Item.Title>
                           </Item.Content>
                        </a>
                     {/snippet}
                  </Item.Root>

                  <Item.Separator/>

                  <Item.Root size="sm">
                     {#snippet child({props})}
                        <a href="https://www.orientverlag.ch/VisualGlyph-for-PC" target="_blank" tabindex={0} {...props}>
                           <Item.Content>
                              <Item.Title lang="en-GB" dir="ltr">
                                 VisualGlyph+
                              </Item.Title>
                           </Item.Content>
                        </a>
                     {/snippet}
                  </Item.Root>

               </Item.Group>

            </A.Content>
         </A.Item>
      </A.Root>

   </section>

   <section>

      <header>
         <span>
            {$_.learning_resources.tibetan._}
         </span>
         <span class="text-muted-foreground" lang="bo">
            བོད་སྐད
         </span>
      </header>

      <Item.Root variant="outline">
         {#snippet child({props})}
            <a href="/tool/tibetan/alphabet" {...props} tabindex={0}>
               <Item.Media class="text-3xl" aria-hidden lang="bo">
                  ཨ
               </Item.Media>
               <Item.Content>
                  <Item.Title>
                     {$_.learning_resources.tibetan.alphabet._}
                  </Item.Title>
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
      @apply inline-flex items-center justify-between w-full text-2xl;
   }
</style>
