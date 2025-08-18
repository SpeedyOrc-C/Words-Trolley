<script lang="ts">
	import {onMount} from "svelte"
	import {AutoDetectLanguage} from "$lib/i18n"

	const {children} = $props()

	onMount(() =>
	{
		AutoDetectLanguage(navigator.language)
	})
</script>

{@render children()}
