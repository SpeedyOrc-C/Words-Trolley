<script lang="ts">
	import {_, language} from "$lib/i18n/store"
	import * as T from "$lib/components/ui/table"
   import {Button} from "$lib/components/ui/button"

   const alphabet = [
      [
         ["あ", "ア", "a"],
         ["い", "イ", "i"],
         ["う", "ウ", "u"],
         ["え", "エ", "e"],
         ["お", "オ", "o"],
      ],
      [
         ["か", "カ", "ka"],
         ["き", "キ", "ki"],
         ["く", "ク", "ku"],
         ["け", "ケ", "ke"],
         ["こ", "コ", "ko"],
      ],
      [
         ["さ", "サ", "sa"],
         ["し", "シ", "shi"],
         ["す", "ス", "su"],
         ["せ", "セ", "se"],
         ["そ", "ソ", "so"],
      ],
      [
         ["た", "タ", "ta"],
         ["ち", "チ", "chi"],
         ["つ", "ツ", "tsu"],
         ["て", "テ", "te"],
         ["と", "ト", "to"],
      ],
      [
         ["な", "ナ", "na"],
         ["に", "ニ", "ni"],
         ["ぬ", "ヌ", "nu"],
         ["ね", "ネ", "ne"],
         ["の", "ノ", "no"],
      ],
      [
         ["は", "ハ", "ha"],
         ["ひ", "ヒ", "hi"],
         ["ふ", "フ", "fu"],
         ["へ", "ヘ", "he"],
         ["ほ", "ホ", "ho"],
      ],
      [
         ["ま", "マ", "ma"],
         ["み", "ミ", "mi"],
         ["む", "ム", "mu"],
         ["め", "メ", "me"],
         ["も", "モ", "mo"],
      ],
      [
         ["や", "ヤ", "ya"],
         ["", "", ""],
         ["ゆ", "ユ", "yu"],
         ["", "", ""],
         ["よ", "ヨ", "yo"],
      ],
      [
         ["ら", "ラ", "ra"],
         ["り", "リ", "ri"],
         ["る", "ル", "ru"],
         ["れ", "レ", "re"],
         ["ろ", "ロ", "ro"],
      ],
      [
         ["わ", "ワ", "wa"],
         ["ゐ", "ヰ", "wi"],
         ["", "", ""],
         ["ゑ", "ヱ", "we"],
         ["を", "ヲ", "wo"],
      ],
      [
         ["ん", "ン", "n"],
         ["", "", ""],
         ["", "", ""],
         ["", "", ""],
         ["", "", ""],
      ],
   ] as const

   const alphabetWithDiacritics = [
      [
         ["が", "ガ", "ga"],
         ["ぎ", "ギ", "gi"],
         ["ぐ", "グ", "gu"],
         ["げ", "ゲ", "ge"],
         ["ご", "ゴ", "go"],
      ],
      [
         ["ざ", "ザ", "za"],
         ["じ", "ジ", "ji"],
         ["ず", "ズ", "zu"],
         ["ぜ", "ゼ", "ze"],
         ["ぞ", "ゾ", "zo"],
      ],
      [
         ["だ", "ダ", "da"],
         ["ぢ", "ヂ", "ji"],
         ["づ", "ヅ", "zu"],
         ["で", "デ", "de"],
         ["ど", "ド", "do"],
      ],
      [
         ["ば", "バ", "ba"],
         ["び", "ビ", "bi"],
         ["ぶ", "ブ", "bu"],
         ["べ", "ベ", "be"],
         ["ぼ", "ボ", "bo"],
      ],
      [
         ["ぱ", "パ", "pa"],
         ["ぴ", "ピ", "pi"],
         ["ぷ", "プ", "pu"],
         ["ぺ", "ペ", "pe"],
         ["ぽ", "ポ", "po"],
      ],
   ] as const

   const t = $derived($_.learning_resources.japanese.alphabet.inner)

   let allowClickToSpeak = $state(false)
</script>

<svelte:head>
   <title>{t.title}</title>
   <meta name="description" content={t.meta_description}>
</svelte:head>

<header class="p-4 text-center text-3xl">
	{t.title}
</header>

<main class="mx-auto p-4 w-full max-w-2xl">

   <T.Root lang="ja">

      <T.Body>
         {#each alphabet as row}
            <T.Row>
               <T.Cell></T.Cell>
               {#each row as [hira, kata, romaji]}
                  <T.Cell>
                     {#if allowClickToSpeak}

                     {:else}
                        <span
                           class="inline-flex flex-col items-center"
                           class:opacity-30={hira == "ゐ" || hira == "ゑ"}
                        >
                           <span class="sm:text-xl">
                              {romaji}
                           </span>
                           <span class="text-xl sm:text-3xl">
                              <span>{hira}</span>
                              <span>{kata}</span>
                           </span>
                        </span>
                     {/if}
                  </T.Cell>
               {/each}
            </T.Row>
         {/each}
      </T.Body>

   </T.Root>

   <T.Root lang="ja" class="mt-8">

      <T.Body>
         {#each alphabetWithDiacritics as row}
            <T.Row>
               <T.Cell></T.Cell>
               {#each row as [hira, kata, romaji]}
                  <T.Cell>
                     <span class="inline-flex flex-col items-center">
                        <span class="sm:text-xl">
                           {romaji}
                        </span>
                        <span class="text-xl sm:text-3xl">
                           <span>{hira}</span>
                           <span>{kata}</span>
                        </span>
                     </span>
                  </T.Cell>
               {/each}
            </T.Row>
         {/each}
      </T.Body>

   </T.Root>

</main>
