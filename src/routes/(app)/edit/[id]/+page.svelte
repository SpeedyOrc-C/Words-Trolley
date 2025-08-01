<script lang="ts">
    import {blankWordFromType, blankWordSimple, CardType, type Words} from "$lib"
    import type {Json} from "$lib/database.types"
    import * as French from "$lib/word/french"
    import * as German from "$lib/word/german"
    import {goto} from "$app/navigation"
    import {_} from "$lib/i18n"

    const {data} = $props()
    const {supabase} = $derived(data)
    let {name, id} = $derived(data.set)

    let words = $state(data.set.words as Words)
    let saved = $state(true)
    let saving = $state(false)
    let importing = $state(false)
    let deleting = $state(false)
    let editMore = $state(true)
    let typing = $state(false)
    let renaming = $state(false)
    let dragIndex = $state<number | null>(null)
    let dropIndex = $state<number | null>(null)

    const allSimple = $derived(words.every(word => word.type == CardType.Simple))

    if (words.length == 0)
        words.push(structuredClone(blankWordSimple))

    async function Save()
    {
        saving = true

        const {error} = await supabase
            .from("sets")
            .update({words: words as Json})
            .eq("id", id)

        saving = false

        if (error)
        {
            console.error(error)
            alert(error.message)
            return
        }

        saved = true
    }

    function InsertNewWord(i: number)
    {
        words = [...words.slice(0, i), structuredClone(blankWordSimple), ...words.slice(i)]

        saved = false
    }

    function DeleteWord(i: number)
    {
        words = [...words.slice(0, i), ...words.slice(i + 1)]

        saved = false
    }

    function MoveUp(i: number)
    {
        if (i == 0)
            return

        const tmp = words[i - 1]
        words[i - 1] = words[i]
        words[i] = tmp

        saved = false
    }

    function MoveDown(i: number)
    {
        if (i == words.length - 1)
            return

        const tmp = words[i + 1]
        words[i + 1] = words[i]
        words[i] = tmp

        saved = false
    }

    function UpdateType(i: number, newType: CardType)
    {
        const {word, meaning} = words[i]
        const newWord = structuredClone(blankWordFromType[newType])
        newWord.word = word
        newWord.meaning = meaning
        words[i] = newWord
    }

    function Export()
    {
        const output = new Blob([JSON.stringify(words)])
        const url = URL.createObjectURL(output)

        const a = document.createElement("a")
        a.href = url
        a.download = `${name}.wt.json`
        a.click()

        URL.revokeObjectURL(url)
    }

    function Import()
    {
        importing = true

        const input = document.createElement("input")
        input.type = "file"
        input.accept = ".json"

        input.onchange = async function ()
        {
            importing = false

            const {files} = input

            if (files == null || files.length != 1)
            {
                console.error("Expected exactly one file")
                return
            }

            const rawWords = await files[0].text()

            words = JSON.parse(rawWords)

        }

        input.onabort = () => importing = false

        input.click()
    }

    async function Delete()
    {
        const ok = confirm(`${$_.editor.delete_confirm.this_will_be_deleted}\n${name}\n${$_.editor.delete_confirm.are_you_sure}`)

        if (!ok)
            return

        deleting = true

        const {error} = await supabase
            .from("sets")
            .delete()
            .eq("id", id)

        deleting = false

        if (error)
        {
            console.error(error)
            alert(error.message)
            return
        }

        await goto("/")
    }

    async function Rename()
    {
        const newName = prompt($_.editor.new_name, name)

        if (newName == null || newName == name)
            return

        renaming = true

        const {error} = await supabase
            .from("sets")
            .update({name: newName})
            .eq("id", id)

        renaming = false

        if (error)
        {
            console.error(error)
            alert(error.message)
            return
        }

        name = newName
    }

    function onbeforeunload(e: BeforeUnloadEvent)
    {
        if (!saved)
            e.preventDefault()
    }

    function ondragstart(i: number)
    {
        dragIndex = i
    }

    function ondragend()
    {
        dragIndex = null
        dropIndex = null
    }

    function ondragenter(i: number)
    {
        dropIndex = i
    }

    function ondrop(dropIndex: number)
    {
        if (dragIndex == null)
        {
            console.error("Invalid drag & drop state")
            return
        }

        if (dragIndex == dropIndex)
            return

        const tmp = words[dragIndex]
        words[dragIndex] = words[dropIndex]
        words[dropIndex] = tmp

        saved = false
    }
</script>

<svelte:window {onbeforeunload}/>

<svelte:head>
    <title>
        {(saved ? $_.editor.title.edit : $_.editor.title.unsaved)(name)}
    </title>
</svelte:head>

<nav class="shadow-base-300 shadow-md flex p-2 items-center justify-between">

    <div class="flex">
        <a href="/">
            <button class="btn btn-ghost">
                {$_.home._}
            </button>
        </a>

        <button class="btn btn-ghost" onclick={Save} disabled={saving || saved}>
            {#if saving}
                <span class="loading loading-spinner"></span>
                {$_.editor.saving}
            {:else if saved}
                {$_.editor.saved}
            {:else}
                {$_.editor.save}
            {/if}
        </button>

        <button class="btn btn-ghost" onclick={() => editMore = !editMore}>
            {#if editMore}
                {$_.editor.edit_less}
            {:else}
                {$_.editor.edit_more}
            {/if}
        </button>

        <button class="btn btn-ghost" onclick={Export}>
            {$_.editor.export}
        </button>

        <button class="btn btn-ghost" onclick={Import} disabled={saving || importing}>
            {#if importing}
                <span class="loading loading-spinner"></span>
                {$_.editor.importing}
            {:else}
                {$_.editor.import}
            {/if}
        </button>
    </div>

    <div class="flex">

        <button class="btn btn-dash btn-error" onclick={Delete} disabled={deleting}>
            {#if deleting}
                <span class="loading loading-spinner"></span>
                {$_.editor.deleting}
            {:else}
                {$_.editor.delete}
            {/if}
        </button>

    </div>

</nav>

<header class="m-auto flex items-center gap-4">
    <button onclick={Rename} class="btn" disabled={renaming}>
        {#if renaming}
            <span class="loading loading-spinner"></span>
            {$_.editor.renaming}
        {:else}
            {$_.editor.rename}
        {/if}
    </button>
    <h1 class="text-xl font-bold text-center" class:opacity-50={renaming}>
        {name}
    </h1>
</header>

<main class="grow overflow-auto">

    <table class="table table-sm table-pin-rows w-fit mx-auto">

        <thead>
        <tr>

            {#if editMore}
                <th class="text-center">
                    {$_.editor.operations}
                </th>
            {/if}

            <th class="text-center">
                {$_.editor.word}
            </th>

            <th class="text-center">
                {$_.editor.meaning}
            </th>

            {#if editMore}
                <th class="text-center">
                    {$_.editor.type}
                </th>
            {/if}

            {#if !allSimple}
                <th class="text-center">
                    {$_.editor.extra}
                </th>
            {/if}

        </tr>
        </thead>

        <tbody>
        {#each words as word, i}
            <tr draggable={editMore && !typing}
                ondragstart={() => ondragstart(i)}
                ondragend={ondragend}
                ondragover={e => e.preventDefault()}
                ondragenter={() => ondragenter(i)}
                ondrop={() => ondrop(i)}

                class:opacity-20={dragIndex === i}
                class:bg-base-300={dropIndex === i}
            >

                {#if editMore}

                    <td>
                        <div class="flex gap-2 flex-col xl:flex-row items-center">

                            <div class="w-12" ondragover={e => e.preventDefault()} role="none"></div>

                            <button class="btn btn-sm btn-dash btn-error" onclick={() => DeleteWord(i)}>
                                {$_.delete}
                            </button>

                            <button class="btn btn-sm" onclick={() => InsertNewWord(i)}>
                                {$_.insert}
                            </button>

                            <button onclick={() => MoveUp(i)} class="btn btn-sm" disabled={i === 0}>
                                {$_.editor.move_up}
                            </button>

                            <button onclick={() => MoveDown(i)} class="btn btn-sm"
                                    disabled={i === words.length - 1}>
                                {$_.editor.move_down}
                            </button>

                        </div>
                    </td>

                {/if}

                <td>
                    <input type="text" bind:value={word.word} placeholder="word"
                           class="input input-xs input-ghost text-lg"
                           onfocusin={() => typing = true}
                           onfocusout={() => typing = false}
                           onchange={() => saved = false}
                    >
                </td>

                <td>
                    <input type="text" bind:value={word.meaning} placeholder="meaning"
                           class="input input-xs input-ghost text-lg"
                           onfocusin={() => typing = true}
                           onfocusout={() => typing = false}
                           onchange={() => saved = false}
                    >
                </td>

                {#if editMore}

                    <td>
                        <select class="select" bind:value={word.type} id="t-{i}" aria-label={$_.editor.card_type_select_label(i + 1)}
                                onchange={() =>{UpdateType(i, word.type); saved = false}}>
                            <option value={CardType.Simple}>
                                {$_.CardType.Simple}
                            </option>
                            <option value={CardType.Mandarin}>
                                {$_.CardType.Mandarin}
                            </option>
                            <option value={CardType.FrenchNoun}>
                                {$_.CardType.FrenchNoun}
                            </option>
                            <option value={CardType.GermanNoun}>
                                {$_.CardType.GermanNoun}
                            </option>
                            <optgroup label={$_.CardType.Japanese}>
                                <option value={CardType.Japanese}>
                                    {$_.CardType.Japanese}
                                </option>
                                <option value={CardType.JapaneseVerb}>
                                    {$_.CardType.JapaneseVerb}
                                </option>
                            </optgroup>
                        </select>
                    </td>

                {/if}

                {#if !allSimple}

                    <td class="p-4">

                        <fieldset>

                            {#if word.type === CardType.FrenchNoun}

                                <legend>{$_.linguistics.gender}</legend>

                                <div class="flex gap-4">
                                    <div>
                                        <input type="radio" name="gender-{i}" id="m-{i}"
                                               value={French.Gender.M} bind:group={word.gender}
                                               onchange={() => saved = false}
                                               class="radio">
                                        <label for="m-{i}">{$_.linguistics.abbr.masculine}</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender-{i}" id="f-{i}"
                                               value={French.Gender.F} bind:group={word.gender}
                                               onchange={() => saved = false}
                                               class="radio">
                                        <label for="f-{i}">{$_.linguistics.abbr.feminine}</label>
                                    </div>
                                </div>

                            {:else if word.type === CardType.GermanNoun}

                                <legend>{$_.linguistics.gender}</legend>

                                <div class="flex gap-4">
                                    <div>
                                        <input type="radio" name="gender-{i}" id="m-{i}"
                                               value={German.Gender.M} bind:group={word.gender}
                                               onchange={() => saved = false}
                                               class="radio">
                                        <label for="m-{i}">{$_.linguistics.abbr.masculine}</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender-{i}" id="n-{i}"
                                               value={German.Gender.N} bind:group={word.gender}
                                               onchange={() => saved = false}
                                               class="radio">
                                        <label for="n-{i}">{$_.linguistics.abbr.neutral}</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender-{i}" id="f-{i}"
                                               value={German.Gender.F} bind:group={word.gender}
                                               onchange={() => saved = false}
                                               class="radio">
                                        <label for="f-{i}">{$_.linguistics.abbr.feminine}</label>
                                    </div>
                                </div>

                            {:else if word.type == CardType.JapaneseVerb}

                            {/if}

                        </fieldset>

                    </td>

                {/if}

            </tr>
        {/each}

        </tbody>

    </table>

    <button onclick={() => InsertNewWord(words.length)} class="btn block m-auto w-full max-w-sm">
        {$_.editor.add_a_word}
    </button>

    <div class="h-16"></div>

</main>

<style>
    tr {
        transition-property: opacity, background-color;
        transition-duration: 0.3s;
    }
</style>
