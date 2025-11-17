<script lang="ts">
   import * as Field from "$lib/components/ui/field"
   import {_} from "$lib/i18n/store"
	import InputEgyptianTransliteration from "$lib/components/InputEgyptianTransliteration.svelte"
	import {EgyptianTransliteration} from "$lib/settings"
   import type {SentenceTransliteration} from "$lib/word/egyptian/transliteration"

   const t = $derived($_.learning_resources.egyptian.transliteration_converter)
   let value: SentenceTransliteration = $state([])
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
            <Field.Label for=mdc>
               {$_.egyptian.transliteration.mdc}
            </Field.Label>
            <InputEgyptianTransliteration class="text-xl" id=mdc
               bind:value scheme={EgyptianTransliteration.ManuelDeCodage}
            />
         </Field.Field>

         <Field.Field>
            <Field.Label for=chen>
               {$_.egyptian.transliteration.chen}
            </Field.Label>
            <InputEgyptianTransliteration class="text-xl" id=chen
               bind:value scheme={EgyptianTransliteration.Chen}
            />
         </Field.Field>

         <Field.Field>
            <Field.Label for=gardiner>
               {$_.egyptian.transliteration.gardiner}
            </Field.Label>
            <InputEgyptianTransliteration class="text-xl" id=gardiner
               bind:value scheme={EgyptianTransliteration.Egyptology}
            />
         </Field.Field>

         <Field.Field>
            <Field.Label for=wiktionary>
               {$_.wiktionary}
            </Field.Label>
            <InputEgyptianTransliteration class="text-xl" id=wiktionary
               bind:value scheme={EgyptianTransliteration.Wiktionary}
            />
         </Field.Field>

      </Field.Group>

   </Field.Set>

</main>
