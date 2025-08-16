<script lang="ts">
    import {_} from "$lib/i18n"
    import {Region} from "$lib/word/mandarin"

    const {
        onchange: _onchange,
        value: _value,
    }: {
        onchange: (c: Region) => any,
        value: Region
    } = $props()

    let value = $state(_value)
</script>

<select bind:value class="input flex-1" onchange={() => _onchange(value)}>

   <option value={Region.PRC}>
      {$_.mandarin.region.prc}
   </option>

   <option value={Region.ROC}>
      {$_.mandarin.region.roc}
   </option>

</select>
