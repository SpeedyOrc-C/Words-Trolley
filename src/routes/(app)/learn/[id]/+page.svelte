<script lang="ts">
	import {LangFromWord, Speak, type Words} from "$lib"
	import WordProgressNav from "$lib/components/WordProgressNav.svelte"
	import {_} from "$lib/i18n"
	import {Button} from "$lib/components/ui/button"

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

<svelte:head>
	<title>
		{$_.learn.title(data.set.name)}
	</title>
</svelte:head>

<WordProgressNav index={i} {words} progressTitle={$_.learn.progress}/>

<main class="grow flex items-center justify-around px-4 text-5xl">
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

<div class="w-full p-3 flex flex-col gap-3" id="control">

	<div class="flex gap-3">
		<Button class="h-24 text-xl flex-1" onclick={() => Speak(word)} variant="secondary">
			{$_.learn.speak}
		</Button>

		<Button class="h-24 text-xl flex-1" onclick={Previous} variant="secondary">
			{$_.learn.previous}
		</Button>
	</div>

	<div class="flex gap-3">
		<Button class="h-24 text-xl flex-1" onclick={Flip} variant="secondary">
			{$_.learn.flip}
		</Button>

		<Button class="h-24 text-xl flex-1" onclick={Next} variant="outline">
			{$_.learn.next}
		</Button>
	</div>

</div>
