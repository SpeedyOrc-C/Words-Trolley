<script lang="ts">
    const {children} = $props()
</script>

{@render children()}

<style>
    :global(body) {
        perspective: 800px;
    }
</style>