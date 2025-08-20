<script lang="ts">
	const {children} = $props()
</script>

<div class="w-svw h-svh flex flex-col items-center justify-between select-none touch-none">
	{@render children()}
</div>
