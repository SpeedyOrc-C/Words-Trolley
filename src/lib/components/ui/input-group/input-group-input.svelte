<script lang="ts">
	import { cn } from "../../../utils";
	import type { ComponentProps } from "svelte";
	import { Input } from "../input";

	let {
		value = $bindable(),
		class: className,
		...props
	}: ComponentProps<typeof Input> = $props();
</script>

<Input
	data-slot="input-group-control"
	class={cn(
		"flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
		className
	)}
	bind:value
	{...props}
/>
