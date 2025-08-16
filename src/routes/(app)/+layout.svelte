<script lang="ts">
    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'

    const {data, children} = $props()
    const {session, db} = $derived(data)

    onMount(() =>
    {
        const {data: {subscription: {unsubscribe}}} = db.auth.onAuthStateChange((_, newSession) =>
        {
            if (newSession?.expires_at !== session?.expires_at)
            {
                invalidate("supabase:auth")
            }
        })

        return unsubscribe
    })
</script>

{@render children()}
