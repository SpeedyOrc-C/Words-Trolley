<script lang="ts">
    import {_} from "$lib/i18n"
</script>

<header>
   <h1 class="text-2xl text-center m-4">
      {$_.new.create_a_new_set_of_words}
   </h1>
</header>

<main class="w-full flex flex-col gap-4 items-center">

   <form method="post" action="?/do" class="w-full max-w-sm flex flex-col gap-4">

      <label class="floating-label">
         <span>{$_.name}</span>
         <input name="name" type="text" required
                placeholder={$_.name} class="input w-full"/>
      </label>

      <button type="submit" class="btn btn-primary">
         {$_.submit}
      </button>

   </form>

</main>
