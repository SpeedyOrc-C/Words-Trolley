<script lang="ts">
   import Checkbox from "../checkbox/checkbox.svelte"
	import Input from "../input/input.svelte"
import Self from "./json-editor.svelte"

   const {value = $bindable()}: {value: object} = $props()

   function IsSingleLine(x: any)
   {
      return typeof x == "string"
         || typeof x == "number"
         || typeof x == "boolean"
         || x === null
   }
</script>

{#if typeof value == "string"}
   <Input {value} readonly class="font-mono" />
{:else if typeof value == "number"}
   <pre>{value}</pre>
{:else if typeof value == "boolean"}
   <Checkbox checked={value} readonly />
{:else if value === null}
   <pre class="text-muted-foreground">null</pre>
{:else if value instanceof Array}
   <ol>
      {#each value as item}
         <li>{item}</li>
      {/each}
   </ol>
{:else}
   <div class="flex flex-col gap-1">
      {#each Object.entries(value) as [key, val]}
         {#if IsSingleLine(val)}
            <div class="flex items-center gap-3">
               <pre>{key}</pre>
               <span><Self value={val} /></span>
            </div>
         {:else}
            <div>
               <pre>{key}</pre>
               <div class="pl-4 border-l border-accent-foreground">
                  <Self value={val} />
               </div>
            </div>
         {/if}
      {/each}
   </div>
{/if}
