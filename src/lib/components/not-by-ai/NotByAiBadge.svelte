<script lang="ts">
   import {_, language} from "$lib/i18n/store"
   import {mode} from "mode-watcher"

   import BadgeWhiteZhCn from "./Developed-By-Human-Not-By-AI-Badge-white-ZhCn.svg.svelte"
   import BadgeBlackZhCn from "./Developed-By-Human-Not-By-AI-Badge-black-ZhCn.svg.svelte"
   import BadgeWhiteEn from "./Developed-By-Humans-Not-By-AI-Badge-white-En.svg.svelte"
   import BadgeBlackEn from "./Developed-By-Humans-Not-By-AI-Badge-black-En.svg.svelte"
	import {Language} from "$lib/i18n/Language"
</script>

<a
   href="https://notbyai.fyi/app/words-trolley"
   title={$_.not_by_ai.developer}
   class="block opacity-70 hover:opacity-100 focus:opacity-100"
   target="_blank" tabindex={0}
>
   {#if $language == Language.ZhCn}
      {#if mode.current != "dark"}
         <BadgeWhiteZhCn/>
      {:else}
         <BadgeBlackZhCn/>
      {/if}
   {:else}
      {#if mode.current != "dark"}
         <BadgeWhiteEn/>
      {:else}
         <BadgeBlackEn/>
      {/if}
   {/if}
</a>
