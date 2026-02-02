<script lang="ts">
	import {_} from "$lib/i18n/store"
	import * as DM from "$lib/components/ui/dropdown-menu"
	import Button from "$lib/components/ui/button/button.svelte"
	import type {BlockEditor} from "."

	import Trash from "@lucide/svelte/icons/trash"
	import Bold from "@lucide/svelte/icons/bold"
	import Pilcrow from "@lucide/svelte/icons/pilcrow"
	import TextAlignStart from "@lucide/svelte/icons/text-align-start"
	import CornerDownLeft from "@lucide/svelte/icons/corner-down-left"
	import Minus from "@lucide/svelte/icons/minus"
	import Pyramid from "@lucide/svelte/icons/pyramid"
	import RenderBlockEditor from "./RenderBlockEditor.svelte"
	import Heading1 from "@lucide/svelte/icons/heading-1"
	import Heading2 from "@lucide/svelte/icons/heading-2"

	let {content = $bindable()}: {content: BlockEditor.Document} = $props()
</script>

{#snippet InsertButton(index: number)}
	<DM.Root>
		<DM.Trigger>
			{#snippet child({props})}
				<div {...props} class="insert-btn" tabindex={0} role="button" title={$_.insert}>
					<hr/>
				</div>
			{/snippet}
		</DM.Trigger>
		<DM.Content>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["p", {class: ""}, [["text", ""]]])
				}}
			>
				<Pilcrow />
				{$_.block_editor.paragraph}
			</DM.Item>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["text", ""])
				}}
			>
				<TextAlignStart />
				{$_.block_editor.raw_text}
			</DM.Item>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["span", {class: ""}, [["text", ""]]])
				}}
			>
				{$_.block_editor.inlined}
			</DM.Item>
			<DM.Separator />
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["b", {class: ""}, [["text", ""]]])
				}}
			>
				<Bold />
				{$_.block_editor.bold}
			</DM.Item>
			<DM.Separator />
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["h1", {class: ""}, [["text", ""]]])
				}}
			>
				<Heading1 />
				{$_.block_editor.heading}
			</DM.Item>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["h2", {class: ""}, [["text", ""]]])
				}}
			>
				<Heading2 />
				{$_.block_editor.subheading}
			</DM.Item>
			<DM.Separator />
			<DM.Item
				onclick={() => {
					content.splice(index, 0, "br")
				}}
			>
				<CornerDownLeft />
				{$_.block_editor.new_line}
			</DM.Item>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, "hr")
				}}
			>
				<Minus />
				{$_.block_editor.divider}
			</DM.Item>
			<DM.Separator></DM.Separator>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["egyptian", []])
				}}
			>
				<Pyramid />
				{$_.language.egy}
			</DM.Item>
		</DM.Content>
	</DM.Root>
{/snippet}

{#each content as _, i}
	{@render InsertButton(i)}

	{#snippet DeleteButton()}
		<Button
			variant="outline"
			size="icon-sm"
			onclick={() => content?.splice(i, 1)}
		>
			<Trash />
		</Button>
	{/snippet}

	<RenderBlockEditor bind:block={content[i]} {DeleteButton} />
{/each}

{@render InsertButton(content.length)}

<style lang="postcss">
	@reference "tailwindcss";
	@reference "$lib/../routes/layout.css";

	.insert-btn {
		@apply p-1;

		@media (pointer: coarse) {
			@apply p-3;
		}

		cursor: copy;

		& > hr {
			@apply bg-transparent border-transparent;
		}

		&:focus, &:hover, &:active {
			& > hr {
				@apply bg-foreground;
			}
		}
	}
</style>