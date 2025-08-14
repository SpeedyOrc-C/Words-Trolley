<script lang="ts">
    import JustHomeNavbar from "$lib/JustHomeNavbar.svelte"
    import {_} from "$lib/i18n"

    const {data} = $props()
</script>

<JustHomeNavbar/>

<main class="mx-auto w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3">
   {#each data.sets as {name, id}}

      <article class="m-2 rounded shadow flex flex-col">

         <header class="m-4 grow flex items-center justify-around">
            <div class="text-xl text-center">
               {name}
            </div>
         </header>

         <div class="w-full flex items-center join">

            <a href="/learn/{id}" tabindex="0" class="btn btn-lg flex-1 join-item">
               {$_.set.learn}
            </a>

            <a href="/test/{id}" tabindex="0" class="btn btn-lg flex-1 join-item">
               {$_.set.test}
            </a>

            <a href="/edit/{id}" tabindex="0" class="btn btn-lg flex-1 join-item">
               {$_.edit}
            </a>

         </div>

      </article>

   {/each}
</main>
