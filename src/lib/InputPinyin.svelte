<script lang="ts">
    import * as Mandarin from "$lib/word/mandarin"
    import {onMount} from "svelte"
    import {type MandarinInputOverrider, PinyinOverrider} from "$lib/MandarinInputOverrider"
    import {writable, type Writable} from "svelte/store";
    import {Tone} from "$lib/word/mandarin";

    let {
        value = $bindable([]),
        length = null,
        toneWriter = writable(undefined),
    }: {
        value: Array<Mandarin.Syllable>,
        length: number | null,
        toneWriter: Writable<{ tone: Tone } | undefined>,
    } = $props()

    const elements: Array<HTMLElement | HTMLInputElement> = []
    const inputOverrider: MandarinInputOverrider = new PinyinOverrider()

    let syllables: Array<Mandarin.Syllable | null> = $state(new Array(length ?? 0).fill(null))
    let focusedBufferIndex: number | null = null

    onMount(() =>
    {
        for (const syllable of value)
            syllables.push(syllable)

        if (syllables.length == 0)
            syllables.push(null)

        toneWriter?.subscribe(e =>
        {
            if (e == undefined || focusedBufferIndex == null)
                return

            const {tone} = e
            const element = elements[focusedBufferIndex]

            if (element == null)
                return

            if (element instanceof HTMLInputElement)
            {
                ConfirmSyllable(focusedBufferIndex, element.value + tone.toString())
            } else
            {
                const focusedSyllable = syllables[focusedBufferIndex]

                if (focusedSyllable == null)
                    return

                focusedSyllable.Tone = tone

                syllables = [...syllables]

                element.focus()
            }
        })
    })


    function ConfirmSyllable(i: number, raw: string)
    {
        const syllable = inputOverrider.Parse(raw)

        if (syllable == null)
            return

        syllables[i] = syllable

        Save()

        const nextElement = elements[i + 1]

        if (i < syllables.length - 1)
        {
            if (nextElement != null)
                nextElement.focus()
            else
                setTimeout(() => elements[i + 1]?.focus(), 0)
        } else if (length == null)
        {
            syllables.push(null)

            if (nextElement != null)
                nextElement.focus()
            else
                setTimeout(() => elements[i + 1]?.focus(), 0)
        }
    }

    function Save()
    {
        const newValue: Array<Mandarin.Syllable> = []

        for (const buffer of syllables)
            if (buffer != null)
                newValue.push(buffer)

        value = newValue
    }

    function OnInputKeyUp(e: KeyboardEvent)
    {
        if (e.code == "Enter")
            Save()
    }

    function OnSyllableKeyDown(i: number, e: KeyboardEvent)
    {
        switch (e.code)
        {
        case "ArrowLeft":
            if (i > 0)
                elements[i - 1]?.focus()
            return

        case "ArrowRight":
            if (i < syllables.length - 1)
                elements[i + 1]?.focus()
            return

        case "Backspace":
            syllables[i] = null
            setTimeout(() => elements[i]?.focus(), 0)
            return

        case "Space":
            if (length == null)
            {
                syllables = syllables.slice(0, i).concat([null]).concat(syllables.slice(i))
                setTimeout(() => elements[i]?.focus(), 0)
            }
            return
        }
    }

    function OnSyllableKeyUp(i: number, e: KeyboardEvent)
    {
    }

    function OnSyllableDoubleClick(i: number, e: MouseEvent)
    {
        syllables[i] = null
        setTimeout(() => elements[i]?.focus(), 0)
    }

    function OnBufferKeyDown(i: number, e: KeyboardEvent & { currentTarget: HTMLInputElement })
    {
        const {currentTarget: t} = e

        switch (e.code)
        {
        case "ArrowLeft":
            if (i > 0 && t.selectionStart == 0)
                elements[i - 1]?.focus()
            return

        case "ArrowRight":
            if (i < syllables.length - 1 && t.selectionEnd == t.value.length)
                elements[i + 1]?.focus()
            return

        case "Backspace":
            if (length == null)
            {
                if (syllables.length > 1 && t.value.length == 0)
                {
                    if (i != syllables.length - 1)
                    {
                        syllables = syllables.slice(0, i).concat(syllables.slice(i + 1, syllables.length))

                        if (i > 0)
                            setTimeout(() => elements[i - 1]?.focus(), 0)
                        else
                            setTimeout(() => elements[0]?.focus(), 0)
                    } else
                    {
                        syllables.pop()
                        syllables[i - 1] = null
                        setTimeout(() => elements[i - 1]?.focus(), 0)
                    }
                }
            } else if (i > 0)
            {
                const be = elements[i]

                if ((be as HTMLInputElement).value.length > 0)
                    return

                syllables[i - 1] = null
                setTimeout(() => elements[i - 1]?.focus(), 0)
            }

            return
        }

        inputOverrider.OnKeyDown(e)
    }

    function OnBufferKeyUp(i: number, e: KeyboardEvent & { currentTarget: HTMLInputElement })
    {
        const shouldConfirm = inputOverrider.OnKeyUp(e)

        if (shouldConfirm)
            ConfirmSyllable(i, e.currentTarget.value)
    }

    function OnElementFocusIn(i: number, e: FocusEvent)
    {
        focusedBufferIndex = i
    }

    function AttachBuffer(e: HTMLInputElement, i: number)
    {
        elements[i] = e
    }

    function AttachSyllable(e: HTMLElement, i: number)
    {
        elements[i] = e
    }
</script>

<div class="flex flex-wrap text-3xl gap-3 items-center"
     role="textbox"
     tabindex="0"
     onkeyup={OnInputKeyUp}
>

    {#each syllables as buffer, i (i)}

        {#if buffer != null}

            <div class="syllable"
                 tabindex="0"
                 role="textbox"
                 onkeydown={e => OnSyllableKeyDown(i, e)}
                 onkeyup={e => OnSyllableKeyUp(i, e)}
                 ondblclick={e => OnSyllableDoubleClick(i, e)}
                 onfocusin={e => OnElementFocusIn(i, e)}
                 use:AttachSyllable={i}
            >
                {buffer.Pinyin}
            </div>

        {:else}

            <input type="text" required maxlength="7"
                   class="input input-lg w-12 valid:w-30 px-0 text-3xl text-center"
                   autocorrect="off"
                   autocomplete="off"
                   autocapitalize="off"
                   onkeydown={e => OnBufferKeyDown(i, e)}
                   onkeyup={e => OnBufferKeyUp(i, e)}
                   onfocusin={e => OnElementFocusIn(i, e)}
                   use:AttachBuffer={i}
            />

        {/if}

    {/each}

</div>

<style>
    @import "tailwindcss";

    @keyframes ani-blinking-underline {
        0% {
            text-decoration-color: var(--color-gray-500);
        }
        50% {
            text-decoration-color: transparent;
        }
        100% {
            text-decoration-color: transparent;
        }
    }

    .syllable:focus {
        outline: none;

        text-decoration: underline;
        text-decoration-color: #999;

        animation-name: ani-blinking-underline;
        animation-duration: 1s;
        animation-timing-function: step-end;
        animation-iteration-count: infinite;
    }
</style>
