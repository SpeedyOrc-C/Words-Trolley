<script lang="ts">
	import { Separator } from "../separator";
	import { cn } from "../../../utils";
	import type { ComponentProps } from "svelte";

	let { class: className, ...restProps }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
	data-slot="item-separator"
	orientation="horizontal"
	class={cn("my-0", className)}
	{...restProps}
/>
