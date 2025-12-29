<script lang="ts">
	import {_} from "$lib/i18n/store"
	import * as Resizable from "$lib/components/ui/resizable"
	import RenderBlockEditor from "$lib/block-editor/RenderDocumentEditor.svelte"
	import RenderDocument from "$lib/block-editor/RenderDocument.svelte"
	import {BlockEditor} from "."

	let {
		content = $bindable(),
		direction = "horizontal",
	}: {
		content: BlockEditor.Document
		direction?: "horizontal" | "vertical"
	} = $props()
</script>

<Resizable.PaneGroup
	class="w-full h-full rounded outline-1 bg-card"
	{direction}
>
	<Resizable.Pane defaultSize={50}>
		<div class="p-2 h-full w-full overflow-auto">
			{#if content.length == 0}
				<header class="m-auto max-w-lg">
					<h1 class="text-xl">
						{$_.block_editor.quick_start._}
					</h1>
					<p class="pointer-coarse:hidden">
						{$_.block_editor.quick_start.detail_fine_pointer}
					</p>
					<p class="pointer-fine:hidden">
						{$_.block_editor.quick_start.detail_coarse_pointer}
					</p>
				</header>
			{/if}
			<RenderBlockEditor bind:content />
		</div>
	</Resizable.Pane>

	<Resizable.Handle withHandle />

	<Resizable.Pane defaultSize={50} class="pt-8">
		<div
			class="m-auto max-w-2xl p-4 lg:p-12 lg:outline-1 shadow-black/20 dark:shadow-black shadow-lg"
		>
			<RenderDocument {content} />
		</div>
	</Resizable.Pane>
</Resizable.PaneGroup>
