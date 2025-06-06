<script lang="ts">
    import JustHomeNavbar from "$lib/JustHomeNavbar.svelte"

    const {children} = $props()
</script>

<JustHomeNavbar/>

{@render children()}
