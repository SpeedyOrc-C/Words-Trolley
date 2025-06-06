<script lang="ts">
   import {_} from "$lib/i18n/store"
	import {gardinerTablePromptOnSelect} from "$lib/word/egyptian/IME/store"
   import GardinerTable from "./GardinerTable.svelte"
   import * as Dialog from "$lib/components/ui/dialog"

   function OnSelect(symbol: string)
   {
      $gardinerTablePromptOnSelect?.(symbol)
      gardinerTablePromptOnSelect.set(null)
   }

   function onOpenChange(open: boolean)
   {
      if (!open)
         gardinerTablePromptOnSelect.set(null)
   }
</script>

<Dialog.Root open={$gardinerTablePromptOnSelect != null} {onOpenChange}>
   <Dialog.Content class="max-h-1/1 max-w-1/1 overflow-y-auto px-0 pb-0">
      <Dialog.Header class="px-6">
         {$_.input_egyptian.gardiner_table._}
      </Dialog.Header>
      <GardinerTable {OnSelect} />
   </Dialog.Content>
</Dialog.Root>
