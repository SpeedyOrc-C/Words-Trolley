<script lang="ts">
    const data = {
        Source: "你好",
        Target: "hello",
    }

    let response = $state("")
    let showAnswer = $state(false)

    $effect(() =>
    {
        const normalisedResponse = response
            .trim()

        if (!showAnswer && data.Target == normalisedResponse)
            showAnswer = true
    })
</script>

<h1 class="my-4 text-2xl font-light text-center">
    {data.Source}
</h1>

{#if showAnswer}
    <div class="w-fit mx-auto my-4 border-2 border-green-500/70 p-2 text-3xl font-light text-center rounded-xl">
        {data.Target}
    </div>
{:else}
    <input type="text" required
        class="input input-lg block m-auto max-w-80 w-full text-3xl text-center"
        autocorrect="off"
        autocomplete="off"
        autocapitalize="off"
        bind:value={response}
    >
{/if}
