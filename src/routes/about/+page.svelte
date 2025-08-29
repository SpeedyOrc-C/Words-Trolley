<script lang="ts">
	import {Language, language} from "$lib/i18n"
	import AboutZhCn from "./AboutZhCn.svelte"

	const About = AboutZhCn
</script>

<article class="mx-auto p-4 w-full max-w-xl">
	{#if $language === Language.ZhCn}
		<About/>
	{/if}
</article>

<style>
    @reference "tailwindcss";

    :global(body) {
        @apply font-serif;
    }

    :global(h1) {
        @apply text-3xl my-6 font-bold;
    }

    :global(h2) {
        @apply text-2xl my-4 font-medium;
    }

	 :global(h3) {
		  @apply text-xl my-2 font-bold;
	 }

	 :global(p) {
		  @apply indent-8;
	 }

	 :global(a:hover) {
		  @apply underline underline-offset-4;
	 }
</style>
