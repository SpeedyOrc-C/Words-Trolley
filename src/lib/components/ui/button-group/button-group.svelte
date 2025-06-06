<script lang="ts" module>
	import {tv, type VariantProps} from "tailwind-variants"

	const buttonGroupVariants = tv({
		base: "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
		variants: {
			orientation: {
				horizontal:
					"",
				vertical:
					"flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
			}
		},
		defaultVariants: {
			orientation: "horizontal"
		}
	})

	export type ButtonGroupOrientation = VariantProps<typeof buttonGroupVariants>["orientation"];
</script>

<script lang="ts">
	import {cn} from "$lib/utils.js"
	import type {HTMLAttributes} from "svelte/elements"

	let {
		class: className,
		children,
		orientation = "horizontal",
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		orientation?: ButtonGroupOrientation;
	} = $props()
</script>

<div
	{...restProps}
	class={cn(buttonGroupVariants({ orientation }), className)}
	data-orientation={orientation}
	data-slot="button-group"
	role="group"
>
	{@render children?.()}
</div>

<style lang="postcss">
	@reference "tailwindcss";
	div[data-orientation="horizontal"] {
		:global(*[dir="rtl"]) & {
			@apply [&>*:not(:first-child)]:rounded-r-none [&>*:not(:first-child)]:border-r-0 [&>*:not(:last-child)]:rounded-l-none;
		}

		:global(*[dir="ltr"]) & {
			@apply [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none;
		}
	}
</style>
