<script>
    import {_} from "$lib/i18n/index.svelte.js"
</script>

<main class="m-8">

    <form method="POST" action="?/login"
          class="m-auto w-full max-w-sm flex flex-col gap-4 relative">

        <label class="floating-label">
            <span>{$_.email}</span>
            <input name="email" type="email" placeholder={$_.email} required
                   class="input w-full"/>
        </label>

        <label class="floating-label">
            <span>{$_.password}</span>
            <input name="password" type="password" placeholder={$_.password} required
                   class="input w-full"/>
        </label>

        <div class="flex justify-between gap-4">
            <button type="submit" class="btn flex-1/2">
                {$_.login}
            </button>

            <button formaction="?/signup" class="btn flex-1/2">
                {$_.signup}
            </button>
        </div>

    </form>

</main>
