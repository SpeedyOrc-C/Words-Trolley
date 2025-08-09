<script lang="ts">
    import "../app.css"
    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'
    import {AutoDetectLanguage, language} from "$lib/i18n"

    const {data, children} = $props()
    const {session, supabase} = $derived(data)

    onMount(() =>
    {
        const u1 = language.subscribe(lang => document.documentElement.lang = lang)

        const {data: {subscription: {unsubscribe: u2}}} = supabase.auth.onAuthStateChange((_, newSession) =>
        {
            if (newSession?.expires_at !== session?.expires_at)
            {
                invalidate('supabase:auth')
            }
        })

        return [u1, u2].forEach(f => f())
    })
</script>

<svelte:window onlanguagechange={() => AutoDetectLanguage(navigator.language)}/>

{@render children()}
