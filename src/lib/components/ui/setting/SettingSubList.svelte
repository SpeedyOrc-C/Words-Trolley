<script lang="ts">
	const {children} = $props()
</script>

<div class="p-3 bg-card border rounded-lg shadow-sm flex flex-col gap-2">
   {@render children()}
</div>
