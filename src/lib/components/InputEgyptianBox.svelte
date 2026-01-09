<script lang="ts">
	import RenderEgyptianHieroglyphs from "./RenderEgyptianHieroglyphs.svelte"
	import * as IME from "$lib/word/egyptian/IME"

	let {
		ctx = $bindable(),
		editing = $bindable(),
		height,
		color,
		OnFocus,
	}: {
		ctx: IME.State
		editing: boolean
		height: number
		color?: string
		OnFocus?: () => void
	} = $props()
</script>

{#if editing}
	<div
		class="border-ring ring-ring/50 ring-[3px]"
		style:color
		style:gap="{height * 0.1}px 0"
		onclick={() => ctx.cursor = ctx.value.length}
		role="none"
	>
		{#if ctx.value.length == 0}
			<span class="relative" style:height="{height}px">
				<span class="cursor left-0"></span>
			</span>
		{/if}
		{#each ctx.value as hie, i ([hie])}
			<span class="word" onclick={e => {ctx.cursor = i; e.stopPropagation()}} role="none">
				{#if i > 0}
					<span class="word-sep">
						{#if i == ctx.cursor - 1 || i == ctx.cursor - 2}
							<span></span>
						{/if}
					</span>
				{/if}
				<RenderEgyptianHieroglyphs {hie} lineHeight={height} />
				{#if i == 0 && 0 == ctx.cursor}
					<span class="cursor left-0"></span>
				{/if}
				{#if i == ctx.cursor - 1}
					<span class="cursor translate-x-[200%] right-0"></span>
				{/if}
			</span>
		{/each}
	</div>
{:else}
	<!-- TODO)) Magic number 0.1  -->
	<div
		style:color
		style:min-height="{height}px"
		style:gap="{height * 0.1}px"
		onclick={() => {
			editing = true
			OnFocus?.()
		}}
		onkeydown={e => {
			if (e.code == "Enter" || e.code == "Space") editing = true
		}}
		tabindex="0"
		role="textbox"
	>
      {#if ctx.value.length == 0}
         <span style="height: {height}px"></span>
      {/if}
		{#each ctx.value as hie ([hie])}
			<span class="relative inline-flex" style:height="{height}px">
				<RenderEgyptianHieroglyphs {hie} lineHeight={height} />
			</span>
		{/each}
	</div>
{/if}

<style lang="postcss">
   @reference "tailwindcss";
	@reference "$lib/../app.css";

	div {
		@apply inline-flex flex-wrap overflow-hidden;
		@apply
			border-input border
			rounded-md
			px-3 py-1
			bg-background dark:bg-input/30
			shadow-xs
			ring-offset-background
			cursor-text
			transition-[color,box-shadow]
		;
	}

	.word {
		@apply relative inline-flex items-center;
		height: var(--height);
	}

	.word-sep {
		@apply inline-flex items-center justify-around h-full;
		width: var(--height-10);

		& span {
			@apply h-full bg-yellow-700/50 dark:bg-yellow-500/50;
			width: 1px;
		}
	}

	.cursor {
		@apply absolute top-0 h-full w-0.5 rounded;
		backdrop-filter: invert(100%);
		animation: blink 1s step-start 0s infinite;
	}

   @keyframes blink {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
