<script lang="ts">
	import * as Resizable from "$lib/components/ui/resizable"
	import RenderBlockEditor from "$lib/block-editor/RenderDocumentEditor.svelte"
	import RenderDocument from "$lib/block-editor/RenderDocument.svelte"
	import {BlockEditor} from "."

	let {content = $bindable()}: {content: BlockEditor.Document} = $props()
</script>

<Resizable.PaneGroup
	class="w-full h-full rounded outline-1 bg-card"
	direction="horizontal"
>
	<Resizable.Pane defaultSize={50}>
      <div class="p-2 h-full w-full overflow-auto">
         <RenderBlockEditor bind:content />
      </div>
	</Resizable.Pane>

	<Resizable.Handle withHandle />

	<Resizable.Pane defaultSize={50} class="pt-8">
      <div class="m-auto max-w-2xl p-4 lg:p-12 lg:outline-1 shadow-black/20 dark:shadow-black shadow-lg">
         <RenderDocument {content} />
      </div>
	</Resizable.Pane>
</Resizable.PaneGroup>
