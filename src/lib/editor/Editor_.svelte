<script lang="ts">
	import {blankWordFromType, blankWordSimple, WordType, LangFromWord} from "$lib"
	import type {Json} from "$lib/database.types"
	import {goto} from "$app/navigation"
	import {_} from "$lib/i18n"
	import {French, German, Japanese} from "$lib/word"
	import {VerbTypeFromRecursiveForm} from "$lib/word/japanese"
	import InputPinyinLight from "$lib/InputPinyinLight.svelte"
	import SelectWordAndTheirExtras from "$lib/editor/SelectWordAndTheirExtras.svelte"
	import type {EditorProps} from "$lib/editor/Editor.svelte"
	import Settings from "$lib/Settings.svelte"
	import EditorNav from "$lib/editor/EditorNav.svelte"
	import {MandarinScript, mandarinScript} from "$lib/Settings"
	import InputBopomofoLight from "$lib/InputBopomofoLight.svelte"
	import EditorInitialisation from "$lib/editor/EditorInitialisation.svelte"
	import {Button} from "$lib/components/ui/button"
	import * as Card from "$lib/components/ui/card"
	import {Label} from "$lib/components/ui/label"
	import {Input} from "$lib/components/ui/input"
	import {Trash2} from "@lucide/svelte"

	const data: EditorProps = $props()

	let name = $state(data.online ? data.name : "")
	let words = $state(data.online ? data.words : [])
	let saved = $state(true)
	let saving = $state(false)
	let deleting = $state(false)
	let typing = $state(false)
	let renaming = $state(false)
	let dragIndex = $state<number | null>(null)
	let dropIndex = $state<number | null>(null)
	let settingsOpened = $state(false)
	let initialisationOpened = $state(false)

	async function Save()
	{
		if (saving || saved || ! data.online)
			return

		const {db, id} = data

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
		if (! data.online)
			return

		const {db, id} = data

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
		if (! data.online)
			return

		const {db, id} = data

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
		case WordType.Japanese:
		{
			switch (word.category)
			{
			case Japanese.Category.Verb:
			{
				const guessedType = VerbTypeFromRecursiveForm(word.word)

				if (guessedType != null)
					word.verb_type = guessedType

				break
			}
			}
		}
		}
	}

	function ReplaceWithEmptyWords(card: WordType, count: number)
	{
		words = new Array(count).fill(undefined).map(_ => structuredClone(blankWordFromType[card]))

		saved = false
	}

	function SetAllCardsTypes(card: WordType)
	{
		words = words.map(({word, meaning}) => structuredClone({...blankWordFromType[card], word, meaning}))

		saved = false
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
			return
		}

		if ((e.ctrlKey || e.metaKey) && e.code == "Comma")
		{
			e.preventDefault()
			settingsOpened = ! settingsOpened
			return
		}
	}
</script>

<svelte:window {onbeforeunload} {onkeydown}/>

<svelte:head>
	<title>
		{(saved ? $_.editor.title.edit : $_.editor.title.unsaved)(name)}
	</title>
</svelte:head>

<EditorNav
	{Delete} {Export} {Import}
	OpenInitialisation={() => initialisationOpened = true}
	OpenSettings={() => settingsOpened = true}
	{Rename} {Save} {deleting} online={data.online} {renaming} {saved} {saving}
/>

<main class="grow overflow-x-clip overflow-y-auto">

	<header class="mx-auto my-4 w-fit">
		{#if data.online}
			<h1 class="text-xl px-4 text-center">
				{name}
			</h1>
		{/if}
	</header>

	<div class="w-full max-w-xl mx-auto flex flex-col gap-12">

		{#each words as word, i (word)}

			<Card.Root
				draggable={!typing}
				ondragstart={() => ondragstart(i)}
				ondragend={ondragend}
				ondragover={e => e.preventDefault()}
				ondragenter={() => ondragenter(i)}
				ondrop={() => ondrop(i)}
				class="relative flex flex-col"
			>

				<Card.Content class="flex flex-col gap-4">

					<div class="flex flex-col gap-2">

						<div class="flex items-center justify-between">
							<Label>
								{$_.editor.word}
							</Label>

							<div class="text-xs text-foreground/50 font-mono">
								{i + 1}<span class="text-foreground/30">/{words.length}</span>
							</div>
						</div>

						<div class="flex gap-4">

							<Input
								type="text" bind:value={word.word}
								onfocusin={() => typing = true}
								onfocusout={() => typing = false}
								onchange={e => OnWordChange(e, i)}
								lang={LangFromWord(word)}
							/>

							<Button size="icon" variant="destructive" onclick={() => DeleteWord(i)}>
								<Trash2/>
							</Button>

						</div>
					</div>

					<div class="flex flex-col gap-2">
						<Label>
							{$_.editor.meaning}
						</Label>

						<Input
							type="text" bind:value={word.meaning}
							onfocusin={() => typing = true}
							onfocusout={() => typing = false}
							onchange={() => saved = false}
						/>
					</div>

					<div class="w-full">
						<SelectWordAndTheirExtras bind:saved bind:word={words[i]} {i} onchange={w => words[i] = w}/>
					</div>

					{#if word.type === WordType.French && word.category === French.Category.Noun}

						<fieldset class="w-full flex items-center gap-4">

							<div>{$_.linguistics.gender}</div>

							<div class="flex items-center gap-4">
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

						</fieldset>

					{:else if word.type === WordType.German && word.category === German.Category.Noun}

						<fieldset class="w-full flex items-center gap-4">

							<div>{$_.linguistics.gender}</div>

							<div class="flex items-center gap-4">
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

						</fieldset>

					{:else if word.type === WordType.Japanese && word.category === Japanese.Category.Verb}

						<fieldset class="w-full">

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

						</fieldset>

					{:else if word.type === WordType.Mandarin}

						{#if $mandarinScript === MandarinScript.Pinyin}

							<InputPinyinLight
								bind:value={word.syllables}
								onchange={() => saved = false}
								placeholder={$_.linguistics.pinyin}
							/>

						{:else if $mandarinScript === MandarinScript.Bopomofo}

							<InputBopomofoLight
								bind:value={word.syllables}
								onchange={() => saved = false}
								placeholder={$_.linguistics.bopomofo}
							/>

						{/if}

					{/if}

					<div class="w-full flex gap-2">

						<Button onclick={() => MoveUp(i)} disabled={i === 0} class="flex-1" variant="secondary">
							{$_.editor.move_up}
						</Button>

						<Button onclick={() => InsertNewWord(i)} class="flex-1" variant="outline">
							{$_.insert}
						</Button>

						<Button onclick={() => MoveDown(i)} disabled={i === words.length - 1} class="flex-1"
								  variant="secondary">
							{$_.editor.move_down}
						</Button>

					</div>

				</Card.Content>
			</Card.Root>

		{/each}

		<Button class="mx-2" onclick={() => InsertNewWord(words.length)}>
			{$_.editor.add_a_word}
		</Button>

	</div>

	<div style="height: 50vh"></div>

</main>

<EditorInitialisation
	{ReplaceWithEmptyWords}
	{SetAllCardsTypes}
	bind:open={initialisationOpened}
/>

<Settings bind:open={settingsOpened}/>
