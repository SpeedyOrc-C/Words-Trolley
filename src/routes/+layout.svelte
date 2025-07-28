<script>
    import "../app.css"
    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'
    import {Language, language} from "$lib/i18n/index.svelte.js"

    let {data, children} = $props()
    let {session, supabase} = $derived(data)

    function SetLanguageFromNavigator() {
        if (navigator.language.startsWith("zh"))
            language.set(Language.ZhCn)
        else if (navigator.language.startsWith("en"))
            language.set(Language.EnGb)
        else
            language.set(undefined)
    }

    onMount(() => {
        SetLanguageFromNavigator()

        const {data} = supabase.auth.onAuthStateChange((_, newSession) => {
            if (newSession?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth')
            }
        })

        return () => data.subscription.unsubscribe()
    })
</script>

<svelte:window onlanguagechange={SetLanguageFromNavigator}/>

{@render children()}
