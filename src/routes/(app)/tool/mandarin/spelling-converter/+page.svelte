<script lang="ts">
	import InputBopomofoLight from "$lib/components/InputBopomofoLight.svelte"
	import InputPinyinLight from "$lib/components/InputPinyinLight.svelte"
   import * as Field from "$lib/components/ui/field"
   import {_} from "$lib/i18n/store"
	import type {ISyllable} from "$lib/word/mandarin"

   const t = $derived($_.learning_resources.mandarin.spelling_converter)

   let value: ISyllable[] = $state([])
</script>

<svelte:head>
   <title>{t.inner.title}</title>
   <meta name="description" content={t.inner.meta_description}>
</svelte:head>

<header class="p-4 text-center text-3xl">
   {t.inner.title}
</header>

<main class="mx-auto p-4 w-full max-w-xl">

   <Field.Set>

      <Field.Group>

         <Field.Field>
            <Field.Label for=pinyin>
               {$_.linguistics.pinyin}
            </Field.Label>
            <InputPinyinLight bind:value id="pinyin"/>
         </Field.Field>

         <Field.Field>
            <Field.Label for=bopomofo>
               {$_.linguistics.bopomofo}
            </Field.Label>
            <InputBopomofoLight bind:value id="bopomofo"/>
         </Field.Field>

      </Field.Group>

   </Field.Set>

</main>
