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

	let {
		content = $bindable(),
	}: {
		content: BlockEditor.Document
	} = $props()
</script>

{#snippet InsertButton(index: number)}
	<DM.Root>
		<DM.Trigger>
			{#snippet child({props})}
				<Button
					{...props}
					variant="ghost"
					size="sm"
					class="w-full opacity-50 hover:opacity-100"
				>
					{$_.insert}
				</Button>
			{/snippet}
		</DM.Trigger>
		<DM.Content>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["p", {class: ""}, [["text", ""]]])
				}}
			>
				<Pilcrow />
				段落
			</DM.Item>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["text", ""])
				}}
			>
				<TextAlignStart />
				文本
			</DM.Item>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["span", {class: ""}, [["text", ""]]])
				}}
			>
				内联
			</DM.Item>
			<DM.Separator />
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["b", {class: ""}, [["text", ""]]])
				}}
			>
				<Bold />
				加粗
			</DM.Item>
			<DM.Separator />
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["h1", {class: ""}, [["text", ""]]])
				}}
			>
				<Heading1 />
				大标题
			</DM.Item>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, ["h2", {class: ""}, [["text", ""]]])
				}}
			>
				<Heading2 />
				副标题
			</DM.Item>
			<DM.Separator />
			<DM.Item
				onclick={() => {
					content.splice(index, 0, "br")
				}}
			>
				<CornerDownLeft />
				换行
			</DM.Item>
			<DM.Item
				onclick={() => {
					content.splice(index, 0, "hr")
				}}
			>
				<Minus />
				分割线
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
			size="icon"
			onclick={() => content?.splice(i, 1)}
		>
			<Trash />
		</Button>
	{/snippet}

	<RenderBlockEditor bind:block={content[i]} {DeleteButton} />
{/each}

{@render InsertButton(content.length)}
