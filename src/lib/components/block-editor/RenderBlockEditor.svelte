<script lang="ts">
	import {BlockEditor} from "."
	import RenderDocumentEditor from "./RenderDocumentEditor.svelte"
	import Input from "$lib/components/ui/input/input.svelte"
	import Textarea from "$lib/components/ui/textarea/textarea.svelte"
	import InputEgyptian from "$lib/components/InputEgyptian.svelte"

	import type {Snippet} from "svelte"
	import Button from "$lib/components/ui/button/button.svelte"

	import ChevronUp from "@lucide/svelte/icons/chevron-up"
	import ChevronDown from "@lucide/svelte/icons/chevron-down"
	import {_} from "$lib/i18n/store"

	let {
		block = $bindable(),
		DeleteButton,
	}: {
		block: BlockEditor.Block
		DeleteButton: () => ReturnType<Snippet>
	} = $props()

	let showFullControls = $state(false)
</script>

{#if typeof block == "string"}
	<section
		class="p-2 outline-1 rounded flex items-center justify-between gap-2"
	>
		<header>{block}</header>
		{@render DeleteButton()}
	</section>
{:else if block instanceof Array}
	{#if block[0] == "text"}
		<section class="rounded flex justify-between items-center gap-2">
			<Textarea bind:value={block[1]} />
			{@render DeleteButton()}
		</section>
	{:else if block[0] == "egyptian"}
		<section class="p-2 outline-1 rounded flex flex-col gap-2">
			<div class="flex justify-between items-center gap-2">
				<header>{$_.language.egy}</header>
				{@render DeleteButton()}
			</div>
			<InputEgyptian height={20} bind:value={block[1]}/>
		</section>
	{:else if !showFullControls && block[2] instanceof Array && block[2].length == 1 && block[2][0][0] == "text"}
		<section class="flex justify-between items-center gap-2">
			<header class="font-mono">{block[0]}</header>
			<Input bind:value={block[2][0][1]} class="flex-1" />
			{@render DeleteButton()}
			<Button
				variant="ghost"
				size="icon-sm"
				onclick={() => (showFullControls = !showFullControls)}
			>
				{#if showFullControls}
					<ChevronUp />
				{:else}
					<ChevronDown />
				{/if}
			</Button>
		</section>
	{:else}
		<section class="rounded flex flex-col" class:p-2={showFullControls} class:outline-1={showFullControls}>
			<div class="flex justify-between items-center gap-2">
				<div class="grow min-w-0 flex items-center gap-4">
					<header class="font-mono">{block[0]}</header>
					{#if !showFullControls}
						<div class="text-nowrap min-w-0 overflow-hidden text-ellipsis text-xs text-foreground/50">
							{BlockEditor.BlockAbstract(block)}
						</div>
					{:else}
						<Input bind:value={block[1].class} class="flex-1 font-mono" />
					{/if}
				</div>
				<div class="flex items-center gap-2">
					{#if showFullControls}
						{@render DeleteButton()}
					{/if}
					<Button
						variant="ghost"
						size="icon-sm"
						onclick={() => (showFullControls = !showFullControls)}
					>
						{#if showFullControls}
							<ChevronUp />
						{:else}
							<ChevronDown />
						{/if}
					</Button>
				</div>
			</div>
			{#if showFullControls}
				<RenderDocumentEditor bind:content={block[2]} />
			{/if}
		</section>
	{/if}
{/if}
