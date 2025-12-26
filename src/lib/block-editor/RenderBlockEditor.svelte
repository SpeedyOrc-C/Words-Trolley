<script lang="ts">
	import type {BlockEditor} from "."
	import RenderDocumentEditor from "./RenderDocumentEditor.svelte"
	import Input from "$lib/components/ui/input/input.svelte"
	import Textarea from "$lib/components/ui/textarea/textarea.svelte"
	import InputEgyptianHieroglyphs from "$lib/components/InputEgyptianHieroglyphs.svelte"

	import type {Snippet} from "svelte"
	import Button from "$lib/components/ui/button/button.svelte"

	import ChevronUp from "@lucide/svelte/icons/chevron-up"
	import ChevronDown from "@lucide/svelte/icons/chevron-down"

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
				<header>埃及文</header>
				{@render DeleteButton()}
			</div>
			<InputEgyptianHieroglyphs height={20} bind:value={block[1]} />
		</section>
	{:else if !showFullControls && block[2] instanceof Array && block[2].length == 1 && block[2][0][0] == "text"}
		<section class="rounded flex flex-col gap-2">
			<div class="flex justify-between items-center gap-2">
				<header>{block[0]}</header>
				<Input bind:value={block[2][0][1]} class="flex-1" />
				<Button
					variant="ghost"
					size="icon"
					onclick={() => (showFullControls = !showFullControls)}
				>
					{#if showFullControls}
						<ChevronUp />
					{:else}
						<ChevronDown />
					{/if}
				</Button>
			</div>
		</section>
	{:else}
		<section class="p-2 outline-1 rounded flex flex-col gap-2">
			<div class="flex justify-between items-center gap-2">
				<header>{block[0]}</header>
				<Input
					bind:value={block[1].class}
					placeholder="class"
					class="flex-1 font-mono"
				/>
				{@render DeleteButton()}
				<Button
					variant="ghost"
					size="icon"
					onclick={() => (showFullControls = !showFullControls)}
				>
					{#if showFullControls}
						<ChevronUp />
					{:else}
						<ChevronDown />
					{/if}
				</Button>
			</div>
			<RenderDocumentEditor bind:content={block[2]} />
		</section>
	{/if}
{/if}
