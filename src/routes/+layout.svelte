<script lang="ts">
    import "../app.css"
    import {onMount} from "svelte"
    import {AutoDetectLanguage, language} from "$lib/i18n"

    const {children} = $props()

    onMount(() =>
    {
        return language.subscribe(lang => document.documentElement.lang = lang)
    })
</script>

<svelte:window onlanguagechange={() => AutoDetectLanguage(navigator.language)}/>

{@render children()}
