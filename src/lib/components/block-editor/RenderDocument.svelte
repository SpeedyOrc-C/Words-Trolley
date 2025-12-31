<script lang="ts">
	import type {BlockEditor} from "."
	import RenderBlock from "./RenderBlock.svelte"

	const {content}: {content: BlockEditor.Document} = $props()
</script>

{#each content as block}
	<RenderBlock {block} />
{/each}
