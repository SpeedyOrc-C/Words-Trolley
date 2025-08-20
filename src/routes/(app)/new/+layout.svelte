<script lang="ts">
	const {children} = $props()
</script>

<div class="relative w-svw h-svh flex flex-col">
	{@render children()}
</div>
