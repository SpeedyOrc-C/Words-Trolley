<script lang="ts">
    import {Syllable, SyllablesEqual, Tone} from "$lib/word/mandarin"
    import {onMount} from "svelte"
    import InputPinyin from "$lib/InputPinyin.svelte"
    import {type Writable, writable} from "svelte/store"
    import type {MandarinWord, Word} from "$lib/index"

    const {word, OnWin}: { word: Word & MandarinWord, OnWin: () => any } = $props()

    const toneWriter: Writable<{ tone: Tone } | undefined> = writable(undefined)

    let visualViewportHeight = $state(0)
    let value: Array<Syllable> = $state([])
    let showToneInput = $state(false)

    onMount(() =>
    {
        const setHeightInterval = setInterval(() =>
        {
            if (! showToneInput)
                return

            const vvp = window.visualViewport

            if (vvp == null)
                return

            visualViewportHeight = vvp.height
        }, 250)

        return () =>
        {
            clearInterval(setHeightInterval)
        }
    })

    $effect(() =>
    {
        if (SyllablesEqual(value, word.syllables))
            OnWin()
    })
</script>

<div class="w-fit m-auto">
   <InputPinyin
      bind:value
      length={word.syllables.length}
      onfocusin={() => showToneInput = true}
      onfocusout={() => showToneInput = false}
      {toneWriter}
   />
</div>

<!--<div class="tone-buttons fixed w-full join"-->
<!--     class:hidden={!showToneInput}-->
<!--     style:top="{visualViewportHeight}px"-->
<!--     style:transform="translateY(-100%)"-->
<!--&gt;-->

<!--   <button class="aux-btn"-->
<!--           onclick={() => toneWriter.set({tone: 1})}-->
<!--           tabindex="0" title="Add 1st tone's mark"-->
<!--   >-->
<!--      <span>1</span>-->
<!--      <span>¯</span>-->
<!--   </button>-->

<!--   <button class="aux-btn"-->
<!--           onclick={() => toneWriter.set({tone: 2})}-->
<!--           tabindex="0" title="Add 2nd tone's mark"-->
<!--   >-->
<!--      <span>2</span>-->
<!--      <span>´</span>-->
<!--   </button>-->

<!--   <button class="aux-btn"-->
<!--           onclick={() => toneWriter.set({tone: 3})}-->
<!--           tabindex="0" title="Add 3rd tone's mark"-->
<!--   >-->
<!--      <span>3</span>-->
<!--      <span>ˇ</span>-->
<!--   </button>-->

<!--   <button class="aux-btn"-->
<!--           onclick={() => toneWriter.set({tone: 4})}-->
<!--           tabindex="0" title="Add 4th tone's mark"-->
<!--   >-->
<!--      <span>4</span>-->
<!--      <span>`</span>-->
<!--   </button>-->

<!--</div>-->

<style>
    @import "tailwindcss";

    @plugin "daisyui";

    .tone-buttons {
        @media (hover: hover) and (any-pointer: fine) {
            & {
                display: none;
            }
        }
    }

    .aux-btn {
        @apply join-item btn btn-xl border-b-0 grow cursor-pointer px-0 inline-flex justify-evenly;

        &:first-child {
            @apply rounded-tl-3xl;
        }

        &:last-child {
            @apply rounded-tr-3xl;
        }
    }

    rt {
        ruby-align: center;
        font-size: 0.3em;
        @apply px-1 text-base-content/50;
    }
</style>
