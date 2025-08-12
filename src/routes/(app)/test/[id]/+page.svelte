<script lang="ts">
    import type {Words} from "$lib"
    import {_} from "$lib/i18n"
    import ProgressWithLabel from "$lib/ProgressWithLabel.svelte"
    import QSimple from "$lib/QSimple.svelte"

    const {data} = $props()
    const words = data.set.words as Words

    const score: Array<null | false | true> = $state(new Array(words.length).fill(null))

    let i = $state(0)
    let showAnswer = $state(false)

    const word = $derived(words[i])
    const hasNext = $derived(i < words.length - 1)

    function OnWin()
    {
        showAnswer = true
        score[i] = true
    }

    function ShowAnswer()
    {
        if (showAnswer)
            return

        showAnswer = true
        score[i] = false
    }

    function Next()
    {
        if (!hasNext)
            return

        showAnswer = false
        i += 1
    }

    function onkeydown(e: KeyboardEvent)
    {
        // Shortcut keys only work when the user isn't focused on anything.
        if (e.target != document.body)
            return

        // Don't interfere with browser's default shortcuts.
        if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)
            return

        switch (e.code)
        {
        case "Space":
        case "Enter":
            if (showAnswer)
                if (hasNext)
                    Next()
                else
                    Finish()
            else
                ShowAnswer()
            break
        }
    }

    function Finish()
    {

    }
</script>

<svelte:window onkeydown={onkeydown}/>


<div class="w-svw h-svh flex flex-col items-center justify-between select-none">

    <nav class="w-full px-4 flex items-center justify-between">

        <a href="/" class="flex-1">
            <button class="btn btn-ghost btn-sm text-base-content/50">
                {$_.home._}
            </button>
        </a>

        <div class="grow">
            <ProgressWithLabel index={i} length={words.length}/>
        </div>

        <div class="flex-1"></div>

    </nav>


    <div>

        <div class="text-3xl mb-4 text-center">
            {word.meaning}
        </div>

        {#if showAnswer}
            <div class="text-3xl">
                {word.word}
            </div>
        {:else}
            <QSimple {word} {OnWin}/>
        {/if}

    </div>

    <div class="grow">

    </div>

    <div class="w-full p-2">
        {#if showAnswer}
            {#if hasNext}
                <button onclick={Next} class="btn btn-xl w-full h-24">
                    {$_.test.next}
                </button>
            {:else}
                <button onclick={Finish} class="btn btn-xl w-full h-24">
                    {$_.test.finish}
                </button>
            {/if}
        {:else}
            <button onclick={ShowAnswer} class="btn btn-xl w-full h-24">
                {$_.test.show_answer}
            </button>
        {/if}
    </div>

</div>
