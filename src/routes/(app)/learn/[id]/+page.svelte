<script lang="ts">
	import {LangFromWord, type Words} from "$lib"
	import {_} from "$lib/i18n"
	import ProgressAtBottom from "$lib/ProgressWithLabel.svelte"

	const {data} = $props()
	const words = data.set.words as Words

	let i = $state(0)
	let flipped = $state(false)

	const word = $derived(words[i])

	function Next()
	{
		flipped = false

		if (i < words.length - 1)
			i += 1
	}

	function Previous()
	{
		flipped = false

		if (i > 0)
			i -= 1
	}

	function Flip()
	{
		flipped = ! flipped
	}

	function onkeydown(e: KeyboardEvent)
	{
		// Shortcut keys only work when the user isn't focused on anything.
		if (e.target != document.body)
			return

		// Don't interfere with browser's default shortcuts.
		if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)
			return

		// Gamers, VIMers, and other keyboard warriors will appreciate this.
		switch (e.code)
		{
		case "ArrowLeft":
		case "ArrowUp":
		case "KeyA":
		case "KeyW":
		case "KeyK":
		case "KeyH":
			Previous()
			break

		case "ArrowRight":
		case "ArrowDown":
		case "KeyD":
		case "KeyS":
		case "KeyJ":
		case "KeyL":
			Next()
			break

		case "Space":
		case "Enter":
			Flip()
			break
		}
	}
</script>

<svelte:window onkeydown={onkeydown}/>

<a href="/">
	<button class="btn btn-ghost btn-sm m-2 absolute text-base-content/50">
		{$_.home._}
	</button>
</a>

<a href="https://en.wiktionary.org/w/index.php?search={encodeURIComponent(word.word)}" target="_blank">
	<button class="btn btn-ghost btn-sm m-2 absolute right-0 text-base-content/50">
		Wiktionary
	</button>
</a>

<div class="w-svw h-svh flex flex-col items-center select-none">

	<main class="grow flex items-center justify-around px-4 text-3xl md:text-5xl lg:text-7xl">
		<!-- Select the whole text with a single click -->
		{#if flipped}
			<div class="select-all">
				{word.meaning}
			</div>
		{:else}
			<div class="select-all" lang={LangFromWord(word)}>
				{word.word}
			</div>
		{/if}
	</main>

	<ProgressAtBottom index={i} length={words.length}/>

	<div class="w-full flex flex-col p-2 gap-2" id="control">

		<div class="flex justify-between gap-2">

			<button class="btn btn-xl h-24 flex-1" onclick={Previous}>
				上一个
			</button>

			<button class="btn btn-xl h-24 flex-1" onclick={Next}>
				下一个
			</button>

		</div>

		<button class="btn btn-xl h-24" onclick={Flip}>
			翻面
		</button>

	</div>

</div>

<style>
    #control {
        /*display: none;*/
        @media (pointer: fine) {
            /*display: none;*/
        }
    }
</style>
