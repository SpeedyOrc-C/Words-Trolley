<script lang="ts">
    import {blankWordFromType, blankWordFromTypeAndCategory, Card, type MandarinWord, type Word} from "$lib"
    import {_} from "$lib/i18n"
    import SelectFrenchCategory from "./SelectFrenchCategory.svelte"
    import {French, Mandarin} from "$lib/word"
    import SelectMandarinRegion from "./SelectMandarinRegion.svelte"

    let {
        word = $bindable(),
        saved = $bindable(),
        i,
        onchange: _onchange,
    }: {
        word: Word
        saved: boolean
        i: number
        onchange: (word: Word) => any
    } = $props()

    let card = $state(word.type)

    function OnCardChange()
    {
        _onchange({
            ...structuredClone(blankWordFromType[card]),
            word: word.word,
            meaning: word.meaning,
        })

        saved = false
    }

    function OnFrenchCategoryChange(category: French.Category)
    {
        _onchange({
            ...structuredClone(blankWordFromTypeAndCategory.french[category]),
            word: word.word,
            meaning: word.meaning,
        })

        saved = false
    }

    function OnMandarinRegionChange(word: Word & MandarinWord, region: Mandarin.Region)
    {
        word.region = region

        saved = false
    }
</script>

<fieldset class="w-full flex justify-between gap-2">

   <select
      aria-label={$_.editor.card_type_select_label(i + 1)}
      bind:value={card}
      class="select flex-1 grow"
      id="t-{i}"
      onchange={OnCardChange}
   >

      <option value={Card.Simple}>
         {$_.Card.Simple}
      </option>

      <option value={Card.Japanese}>
         {$_.Card.Japanese}
      </option>

      <option value={Card.French}>
         {$_.Card.French}
      </option>

      <option value={Card.Mandarin}>
         {$_.Card.Mandarin}
      </option>

      <option value={Card.German}>
         {$_.Card.German}
      </option>

   </select>

   {#if word.type === Card.French}
      <SelectFrenchCategory
         value={word.category}
         onchange={OnFrenchCategoryChange}
      />
   {:else if word.type === Card.Mandarin}
      <SelectMandarinRegion
         value={word.region}
         onchange={region => OnMandarinRegionChange(word, region)}
      />
   {/if}

</fieldset>
