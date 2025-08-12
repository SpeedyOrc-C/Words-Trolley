<script lang="ts">
    import type {Words} from "$lib"
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
        flipped = !flipped
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

<svelte:window onkeydown={onkeydown} />

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
        <div class="select-all">
            {flipped ? word.meaning : word.word}
        </div>
    </main>

    <ProgressAtBottom index={i} length={words.length} />

    <div id="control" class="w-full flex flex-col p-2 gap-2">

        <div class="flex justify-between gap-2">

            <button onclick={Previous} class="btn btn-xl h-24 flex-1">
                上一个
            </button>

            <button onclick={Next} class="btn btn-xl h-24 flex-1">
                下一个
            </button>

        </div>

        <button onclick={Flip} class="btn btn-xl h-24">
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
