<script lang="ts">
   import {_, language} from "$lib/i18n/store"

   import BadgeWhiteZhCn from "./Developed-By-Human-Not-By-AI-Badge-white-ZhCn.svg.svelte"
   import BadgeBlackZhCn from "./Developed-By-Human-Not-By-AI-Badge-black-ZhCn.svg.svelte"
   import BadgeWhiteEn from "./Developed-By-Humans-Not-By-AI-Badge-white-En.svg.svelte"
   import BadgeBlackEn from "./Developed-By-Humans-Not-By-AI-Badge-black-En.svg.svelte"
	import {Language} from "$lib/i18n/Language"
	import {actualColourScheme} from "$lib/settings/store/colour-scheme"
	import {ColourScheme} from "$lib/settings"
</script>

<a
   href="https://notbyai.fyi/app/words-trolley"
   title={$_.not_by_ai.developer}
   class="block opacity-70 hover:opacity-100 focus:opacity-100"
   target="_blank" tabindex={0}
>
   {#if $language == Language.ZhCn}
      {#if $actualColourScheme == ColourScheme.Light}
         <BadgeWhiteZhCn/>
      {:else}
         <BadgeBlackZhCn/>
      {/if}
   {:else}
      {#if $actualColourScheme == ColourScheme.Light}
         <BadgeWhiteEn/>
      {:else}
         <BadgeBlackEn/>
      {/if}
   {/if}
</a>
