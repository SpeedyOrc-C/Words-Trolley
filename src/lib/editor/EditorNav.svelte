<script lang="ts">
    import {_} from "$lib/i18n"
    import type EditorNavProps from "$lib/editor/EditorNavProps"

    let {
        settingsOpened = $bindable(),
        online, saving, saved, deleting,
        Save, Import, Export, Delete,
    }: EditorNavProps = $props()
</script>

<aside class="shadow-base-300 shadow-md z-10 select-none">

   <ul class="menu menu-horizontal">

      <li>
         <button class="btn btn-ghost" disabled={saving || saved} onclick={Save}>
            {#if saving}
               <span class="loading loading-spinner"></span>
               {$_.editor.saving}
            {:else if saved}
               {$_.editor.saved}
            {:else}
               {$_.editor.save}
            {/if}
         </button>
      </li>

      <li>
         <details>
            <summary class="btn btn-ghost">
               {$_.more}
            </summary>
            <ul>

               <li>
                  <button class="btn btn-ghost" onclick={() => settingsOpened = true}>
                     {$_.settings._}
                  </button>
               </li>

               <li>
                  <button class="btn btn-ghost" disabled={saving} onclick={Import}>
                     {$_.editor.import}
                  </button>
               </li>

               <li>
                  {#if online}
                     <button class="btn btn-ghost" onclick={Export}>
                        {$_.editor.export}
                     </button>
                  {/if}
               </li>

               <li></li>
               <li>
                  <a class="btn btn-ghost" href="/" title={$_.home._}>
                     {$_.home._}
                  </a>
               </li>

               {#if online}
                  <li></li>
                  <li>
                     <button class="btn btn-soft btn-error" disabled={deleting} onclick={Delete}>
                        {#if deleting}
                           <span class="loading loading-spinner"></span>
                           {$_.editor.deleting}
                        {:else}
                           {$_.editor.delete}
                        {/if}
                     </button>
                  </li>
               {/if}

            </ul>
         </details>
      </li>

   </ul>

</aside>

<style>
</style>