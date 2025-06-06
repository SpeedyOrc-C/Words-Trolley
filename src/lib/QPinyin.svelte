<script lang="ts">
    import {Final, Initial, Syllable, SyllablesEqual, Tone} from "$lib/word/mandarin"
    import {onMount} from "svelte";
    import InputPinyin from "$lib/InputPinyin.svelte";
    import {type Writable, writable} from "svelte/store";

    const data = {
        Source: "the quick brown fox",
        Target: "敏捷的棕狐",
        TargetAuxiliary: [
            new Syllable(Initial.M, Final.In, 3),
            new Syllable(Initial.J, Final.Ie, 2),
            new Syllable(Initial.D, Final.E, 0),
            new Syllable(Initial.Z, Final.Ong, 1),
            new Syllable(Initial.H, Final.U, 2),
        ]
    }

    const toneWriter: Writable<{ tone: Tone } | undefined> = writable(undefined)

    let visualViewportHeight = $state(0)
    let response: Array<Syllable> = $state([])
    let showAnswer: boolean = $state(false)

    onMount(() =>
    {
        setInterval(() =>
        {
            const vvp = window.visualViewport

            if (vvp == null)
                return

            visualViewportHeight = vvp.height
        }, 250)
    })

    $effect(() =>
    {
        if (!showAnswer && SyllablesEqual(response, data.TargetAuxiliary))
            showAnswer = true
    })
</script>

<h1 class="my-4 text-2xl font-light text-center">
    {data.Source}
</h1>

{#if showAnswer}
    <div class="w-fit mx-auto my-4 border-2 border-green-500/70 p-2 text-6xl font-light text-center rounded-xl"
         lang="zh_CN">
        {#each data.Target as c, i (c)}
            <ruby>
                {c}<rt>{data.TargetAuxiliary[i].Pinyin}</rt>
            </ruby>
        {/each}
    </div>
{:else}
    <div class="w-fit m-auto">
        <InputPinyin bind:value={response} length={data.TargetAuxiliary.length} {toneWriter}/>
    </div>

    <div class="fixed w-full join"
         style:top="{visualViewportHeight}px"
         style:transform="translateY(-100%)"
    >
        <button title="Add 1st tone's mark"
                onclick={() => toneWriter.set({tone: 1})}
                class="aux-btn" tabindex="0"
        >
            <span>1</span>
            <span>¯</span>
        </button>

        <button title="Add 2nd tone's mark"
                onclick={() => toneWriter.set({tone: 2})}
                class="aux-btn" tabindex="0"
        >
            <span>2</span>
            <span>´</span>
        </button>

        <button title="Add 3rd tone's mark"
                onclick={() => toneWriter.set({tone: 3})}
                class="aux-btn" tabindex="0"
        >
            <span>3</span>
            <span>ˇ</span>
        </button>

        <button title="Add 4th tone's mark"
                onclick={() => toneWriter.set({tone: 4})}
                class="aux-btn" tabindex="0"
        >
            <span>4</span>
            <span>`</span>
        </button>

    </div>
{/if}

<style>
    @import "../../node_modules/.pnpm/tailwindcss@4.1.6/node_modules/tailwindcss/dist/lib.d.mts";

    @plugin "daisyui";

    .aux-btn {
        @apply join-item btn btn-xl border-b-0 grow cursor-pointer px-0 inline-flex justify-evenly;

        &:first-child {
            @apply rounded-tl-3xl;
        }

        &:last-child {
            @apply rounded-tr-3xl;
        }

        @media (hover: hover) and (any-pointer: fine) {
            & {
                display: none;
            }
        }
    }

    rt {
        ruby-align: center;
        font-size: 0.3em;
        @apply px-1 text-base-content/50;
    }
</style>
