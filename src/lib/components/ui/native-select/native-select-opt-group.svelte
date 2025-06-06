<script lang="ts">
	import type { HTMLOptgroupAttributes } from "svelte/elements";
	import type { WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithElementRef<HTMLOptgroupAttributes> = $props();
</script>

<optgroup bind:this={ref} class="bg-foreground/10 dark:bg-background/85" data-slot="native-select-opt-group" {...restProps}>
	{@render children?.()}
</optgroup>
