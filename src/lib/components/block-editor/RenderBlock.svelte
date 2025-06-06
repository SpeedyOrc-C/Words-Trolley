<script lang="ts">
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import type {BlockEditor} from "."
	import RenderDocument from "./RenderDocument.svelte"

	const {block}: {block: BlockEditor.Block} = $props()
</script>

{#if typeof block == "string"}
	{#if block == "br"}
		<br />
	{:else if block == "hr"}
		<hr />
	{/if}
{:else if block instanceof Array}
	{#if block[0] == "text"}
		{block[1]}
	{:else if block[0] == "h1"}
		<h1 class={block[1].class}>
			<RenderDocument content={block[2]} />
		</h1>
	{:else if block[0] == "h2"}
		<h2 class={block[1].class}>
			<RenderDocument content={block[2]} />
		</h2>
	{:else if block[0] == "p"}
		<p class={block[1].class}>
			<RenderDocument content={block[2]} />
		</p>
	{:else if block[0] == "span"}
		<span class={block[1].class}>
			<RenderDocument content={block[2]} />
		</span>
	{:else if block[0] == "b"}
		<b>
			<RenderDocument content={block[2]} />
		</b>
	{:else if block[0] == "egyptian"}
		<EgyptianText t={block[1]} />
	{/if}
{/if}
