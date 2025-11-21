<script lang=ts>
   import {_} from "$lib/i18n/store"
   import * as T from "$lib/components/ui/table"

   const t = $derived($_.learning_resources.tibetan.alphabet.inner)

   const consonantTable = [
      [
         ["ཀ", "k"],
         ["ཁ", "kh"],
         ["ག", "g"],
         ["ང", "ng"],
      ],
      [
         ["ཅ", "c"],
         ["ཆ", "ch"],
         ["ཇ", "j"],
         ["ཉ", "ny"],
      ],
      [
         ["ཏ", "t"],
         ["ཐ", "th"],
         ["ད", "d"],
         ["ན", "n"],
      ],
      [
         ["པ", "p"],
         ["ཕ", "ph"],
         ["བ", "b"],
         ["མ", "m"],
      ],
      [
         ["ཙ", "ts"],
         ["ཚ", "tsh"],
         ["ཛ", "dz"],
         ["ཝ", "w"],
      ],
      [
         ["ཞ", "zh"],
         ["ཟ", "z"],
         ["འ", "’"],
         ["ཡ", "y"],
      ],
      [
         ["ར", "r"],
         ["ལ", "l"],
         ["ཤ", "sh"],
         ["ས", "s"],
      ],
      [
         ["ཧ", "h"],
         ["ཨ", "∅"],
         ["", ""],
         ["", ""],
      ],
   ]

   const vowelTable = [
      ["ཨ", "a"],
      ["ཨི", "i"],
      ["ཨུ", "u"],
      ["ཨེ", "e"],
      ["ཨོ", "o"],
   ]
</script>

<svelte:head>
   <title>{t.title}</title>
   <meta name="description" content={t.meta_description}>
</svelte:head>

<header class="p-4 text-center text-3xl">
   {t.title}
</header>

<main class="mx-auto p-4 w-full max-w-xl">

   <T.Root lang="bo" class="m-auto w-fit caption-top">

      <T.Caption class="text-xl text-foreground">
         {$_.linguistics.consonant}
      </T.Caption>

      <T.Body>
         {#each consonantTable as row}
            <T.Row>
               {#each row as [tibetan, transliteration]}
                  <T.Cell class="px-6">
                     <span class="inline-flex flex-col items-center">
                        <span class="text-xl">
                           {transliteration}
                        </span>
                        <span class="inline-flex text-4xl">
                           {tibetan}
                        </span>
                     </span>
                  </T.Cell>
               {/each}
            </T.Row>
         {/each}
      </T.Body>

   </T.Root>

   <T.Root lang="bo" class="m-auto w-fit caption-top">

      <T.Caption class="text-xl text-foreground mt-8">
         {$_.linguistics.vowel}
      </T.Caption>

      <T.Body>
         <T.Row>
            {#each vowelTable as [tibetan, transliteration]}
            <T.Cell class="px-4">
               <span class="inline-flex flex-col items-center">
                  <span class="text-xl">
                     {transliteration}
                  </span>
                  <span class="inline-flex text-4xl">
                     {tibetan}
                  </span>
               </span>
            </T.Cell>
            {/each}
         </T.Row>
      </T.Body>

   </T.Root>

</main>
