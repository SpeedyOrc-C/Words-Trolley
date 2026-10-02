<script lang="ts">
	import { cn } from "../../../utils";
	import type { ComponentProps } from "svelte";
	import { Separator } from "../separator";

	let {
		class: className,
		orientation = "vertical",
		...restProps
	}: ComponentProps<typeof Separator> = $props();
</script>

<Separator
	data-slot="button-group-separator"
	{orientation}
	class={cn("bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto", className)}
	{...restProps}
/>
