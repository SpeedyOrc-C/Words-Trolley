<script lang="ts">
    import {blankWordSimple, CardType, type Words} from "$lib"
    import type {Json} from "$lib/database.types"
    import {goto} from "$app/navigation"
    import {_} from "$lib/i18n"
    import {French, German, Japanese} from "$lib/word"
    import {VerbTypeFromRecursiveForm} from "$lib/word/japanese";
    import InputPinyinLight from "$lib/InputPinyinLight.svelte";
    import SelectWordType from "./SelectWordType.svelte"

    const {data} = $props()
    const {db} = $derived(data)
    let {name, id} = $derived(data.set)

    let words = $state(data.set.words as Words)
    let saved = $state(true)
    let saving = $state(false)
    let deleting = $state(false)
    let typing = $state(false)
    let renaming = $state(false)
    let dragIndex = $state<number | null>(null)
    let dropIndex = $state<number | null>(null)

    if (words.length == 0)
        words.push(structuredClone(blankWordSimple))

    async function Save()
    {
        if (saving)
            return

        saving = true

        const {error} = await db
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
        const input = document.createElement("input")
        input.type = "file"
        input.accept = ".json"

        input.onchange = async function ()
        {
            const {files} = input

            if (files == null || files.length != 1)
            {
                console.error("Expected exactly one file")
                return
            }

            const rawWords = await files[0].text()

            words = JSON.parse(rawWords)

        }

        input.click()
    }

    async function Delete()
    {
        const ok = confirm(`${$_.editor.delete_confirm.this_will_be_deleted}\n${name}\n${$_.editor.delete_confirm.are_you_sure}`)

        if (! ok)
            return

        deleting = true

        const {error} = await db
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

        const {error} = await db
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

    function OnWordChange(_: Event, i: number)
    {
        saved = false

        const word = words[i]

        switch (word.type)
        {
        case CardType.Simple:
            break
        case CardType.Mandarin:
            break
        case CardType.FrenchNoun:
            break
        case CardType.GermanNoun:
            break
        case CardType.Japanese:
            break
        case CardType.JapaneseVerb:
        {
            const guessedType = VerbTypeFromRecursiveForm(word.word)

            if (guessedType != null)
                word.verb_type = guessedType

            break
        }
        }
    }

    function onbeforeunload(e: BeforeUnloadEvent)
    {
        if (! saved)
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

    async function onkeydown(e: KeyboardEvent)
    {
        if ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() == "S")
        {
            e.preventDefault()
            await Save()
        }
    }

    $inspect(words)
</script>

<svelte:window {onbeforeunload} {onkeydown}/>

<svelte:head>
   <title>
      {(saved ? $_.editor.title.edit : $_.editor.title.unsaved)(name)}
   </title>
</svelte:head>

<nav class="shadow-base-300 shadow-md flex p-2 items-center justify-between">

   <div class="flex">
      <a href="/" title={$_.home._}>
         <button class="btn btn-ghost">
            {$_.home._}
         </button>
      </a>

      <button class="btn btn-ghost" disabled={saving || saved} onclick={Save}>
         {#if saving}
            <span class="loading loading-spinner"></span>
            {$_.editor.saving}
         {:else if saved}
            {$_.editor.saved}
         {:else}
            {$_.editor.save}
         {/if}
      </button>

      <button class="btn btn-ghost" onclick={Export}>
         {$_.editor.export}
      </button>

      <button class="btn btn-ghost" disabled={saving} onclick={Import}>
         {$_.editor.import}
      </button>
   </div>

   <div class="flex">

      <button class="btn btn-dash btn-error" disabled={deleting} onclick={Delete}>
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
   <button class="btn" disabled={renaming} onclick={Rename}>
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

   <div class="w-full max-w-xl mx-auto p-2 flex flex-col gap-8">

      {#each words as word, i}

         <article
            draggable={!typing}
            ondragstart={() => ondragstart(i)}
            ondragend={ondragend}
            ondragover={e => e.preventDefault()}
            ondragenter={() => ondragenter(i)}
            ondrop={() => ondrop(i)}

            class:opacity-20={dragIndex === i}
            class:bg-base-300={dropIndex === i}
            class="flex flex-col gap-4 items-center"
         >

            <label class="floating-label w-full text-lg">
               <span>{$_.editor.word}</span>
               <input
                  type="text" bind:value={word.word}
                  onfocusin={() => typing = true}
                  onfocusout={() => typing = false}
                  onchange={e => OnWordChange(e, i)}
                  placeholder={$_.editor.word}
                  class="input w-full text-lg"
               >
            </label>

            <label class="floating-label w-full text-lg">
               <span>{$_.editor.meaning}</span>
               <input
                  type="text" bind:value={word.meaning}
                  onfocusin={() => typing = true}
                  onfocusout={() => typing = false}
                  onchange={() => saved = false}
                  placeholder={$_.editor.meaning}
                  class="input w-full text-lg"
               >
            </label>

            <div class="w-full flex gap-2">

               <SelectWordType bind:saved {word} {i} onchange={w => words[i] = w} />

               <button class="btn" onclick={() => InsertNewWord(i)}>
                  {$_.insert}
               </button>

               <button onclick={() => MoveUp(i)} class="btn" disabled={i === 0}>
                  {$_.editor.move_up}
               </button>

               <button onclick={() => MoveDown(i)} class="btn" disabled={i === words.length - 1}>
                  {$_.editor.move_down}
               </button>

               <button class="btn btn-dash btn-error" onclick={() => DeleteWord(i)}>
                  {$_.delete}
               </button>

            </div>

            <fieldset class="w-full">

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

               {:else if word.type === CardType.JapaneseVerb}

                  <legend>{$_.linguistics.verb_group}</legend>

                  <div class="flex gap-4">
                     <div>
                        <input type="radio" name="jvt-{i}" id="jvt-c-{i}"
                               value={Japanese.VerbType.Consonant} bind:group={word.verb_type}
                               class="radio">
                        <label for="jvt-c-{i}">1</label>
                     </div>
                     <div>
                        <input type="radio" name="jvt-{i}" id="jvt-v-{i}"
                               value={Japanese.VerbType.Vowel} bind:group={word.verb_type}
                               class="radio">
                        <label for="jvt-v-{i}">2</label>
                     </div>
                     <div>
                        <input type="radio" name="jvt-{i}" id="jvt-n-{i}"
                               value={Japanese.VerbType.Noun} bind:group={word.verb_type}
                               class="radio">
                        <label for="jvt-n-{i}">3</label>
                     </div>
                     <div>
                        <input type="radio" name="jvt-{i}" id="jvt-n-{i}"
                               value={Japanese.VerbType.Irregular} bind:group={word.verb_type}
                               class="radio">
                        <label for="jvt-n-{i}">?</label>
                     </div>
                  </div>

               {:else if word.type === CardType.Mandarin}

                  <InputPinyinLight
                     bind:value={word.syllables}
                     onchange={() => saved = false}
                     placeholder={$_.linguistics.pinyin}
                  />

               {/if}

            </fieldset>

         </article>

      {/each}

      <button class="btn block m-auto w-full max-w-sm" onclick={() => InsertNewWord(words.length)}>
         {$_.editor.add_a_word}
      </button>

   </div>

   <div style="height: 50vh"></div>

</main>
