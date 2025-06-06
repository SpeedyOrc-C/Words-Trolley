<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import {actualColourScheme} from "$lib/settings/store/colour-scheme"

	let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
	theme={$actualColourScheme}
	class="toaster group"
	style="--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border);"
	{...restProps}
/>
