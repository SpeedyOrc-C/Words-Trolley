<script lang="ts">
	import JustHomeNavbar from "$lib/JustHomeNavbar.svelte"

	const {children} = $props()
</script>

<div class="relative w-svw h-svh flex flex-col">
	{@render children()}
</div>
