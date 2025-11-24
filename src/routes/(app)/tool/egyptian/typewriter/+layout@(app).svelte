<script lang="ts">
   import {_, language} from "$lib/i18n/store"
   import {settingsOpened} from "$lib/settings/store"

   import {Button} from "$lib/components/ui/button"
   import ArrowBigLeft from "@lucide/svelte/icons/arrow-big-left"
   import Settings from "@lucide/svelte/icons/settings"
   import CircleQuestionMark from "@lucide/svelte/icons/circle-question-mark"

   const {children} = $props()
</script>

<nav class="p-2 sticky top-0 z-20 flex items-center justify-between backdrop-blur-xs">

   <Button href=".." tabindex={0} variant="outline">
		<ArrowBigLeft />
		{$_.return}
	</Button>

   <div class="flex gap-2">
      <Button
         href="https://github.com/SpeedyOrc-C/Words-Trolley/wiki/Egyptian-IME.{$language}"
         target="_blank" tabindex={0} variant="outline"
      >
         <CircleQuestionMark/>
         {$_.help}
      </Button>

      <Button onclick={() => settingsOpened.set(true)} variant="outline">
         <Settings />
         {$_.settings._}
      </Button>
   </div>

</nav>

{@render children()}

<div class="h-4"></div>

<style>
   @media print {
      nav {
         display: none;
      }
   }
</style>
