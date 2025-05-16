<script lang="ts">
    import * as Mandarin from "$lib/Mandarin";

    type Buffer = string | Mandarin.Syllable

    let focusedBufferIndex = $state(0)

    const buffers: Array<Buffer> = $state(["chuang"])

    function OnKeyDown(e: KeyboardEvent)
    {
        switch (e.key)
        {
            case "Backspace":
                if (typeof buffers[focusedBufferIndex] == "string")
                {
                    console.log(123)
                    buffers[focusedBufferIndex] = buffers[focusedBufferIndex].slice(0, buffers[focusedBufferIndex].length - 1)
                } else
                {

                }
                break;
        }
    }
</script>

<div class="text-5xl" tabindex="0" onkeydown={OnKeyDown} role="textbox">
    {#each buffers as buffer}
        {#if typeof buffer == "string"}
            <span class="blinking-right-border">
                {buffer}
            </span>
        {:else}
            <span class="">

            </span>
        {/if}
    {/each}
</div>

<style>
    @keyframes ani-blinking-right-border {
        from {
            border-right-color: #fff;
        }
        to {
            border-right-color: #000;
        }
    }

    .blinking-right-border {
        border-right-width: 0.08em;
        padding-right: 0.05em;

        animation-name: ani-blinking-right-border;
        animation-duration: 0.4s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
</style>