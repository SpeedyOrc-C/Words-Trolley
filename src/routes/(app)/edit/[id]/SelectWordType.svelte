<script lang="ts">
    import {blankWordFromType, CardType, type Word} from "$lib"
    import {_} from "$lib/i18n"

    let {
        word,
        saved = $bindable(),
        i,
        onchange: _onchange,
    }: {
        word: Word
        saved: boolean
        i: number
        onchange: (word: Word) => any
    } = $props()

    let value = $state(word.type)

    function NewWordFromType(newType: CardType)
    {
        return {
            ...structuredClone(blankWordFromType[newType]),
            word: word.word,
            meaning: word.meaning,
        }
    }

    function onchange()
    {
        _onchange(NewWordFromType(value))
        saved = false
    }
</script>

<select
   aria-label={$_.editor.card_type_select_label(i + 1)}
   bind:value
   {onchange}
   class="select grow"
   id="t-{i}"
>

   <option value={CardType.Simple}>
      {$_.CardType.Simple}
   </option>

   <option value={CardType.Mandarin}>
      {$_.CardType.Mandarin}
   </option>

   <option value={CardType.FrenchNoun}>
      {$_.CardType.FrenchNoun}
   </option>

   <option value={CardType.GermanNoun}>
      {$_.CardType.GermanNoun}
   </option>

   <optgroup label={$_.CardType.Japanese}>

      <option value={CardType.Japanese}>
         {$_.CardType.Japanese}
      </option>

      <option value={CardType.JapaneseVerb}>
         {$_.CardType.JapaneseVerb}
      </option>

   </optgroup>

</select>
