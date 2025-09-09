<script lang="ts">
	import {blankWordFromType, blankWordSimple, WordType, LangFromWord, type Word, UsesStringInput, CanSpeak} from "$lib"
	import InputEgyptianTransliteration from "$lib/components/InputEgyptianTransliteration.svelte"
	import type {Json} from "$lib/database.types"
	import {goto} from "$app/navigation"
	import InputEgyptianHieroglyphs from "$lib/components/editor/InputEgyptianHieroglyphs.svelte"
	import {_} from "$lib/i18n"
	import {settings, settingsOpened} from "$lib/settings/store"
	import {French, German, Japanese} from "$lib/word"
	import {VerbTypeFromRecursiveForm} from "$lib/word/japanese"
	import InputPinyinLight from "$lib/components/InputPinyinLight.svelte"
	import SelectWordAndTheirExtras from "$lib/components/editor/SelectWordAndTheirExtras.svelte"
	import type {EditorProps} from "$lib/components/editor/Editor.svelte"
	import EditorNav from "$lib/components/editor/EditorNav.svelte"
	import {MandarinScript} from "$lib/settings"
	import InputBopomofoLight from "$lib/components/InputBopomofoLight.svelte"
	import EditorInitialisation from "$lib/components/editor/EditorInitialisation.svelte"
	import {Button} from "$lib/components/ui/button"
	import {Label} from "$lib/components/ui/label"
	import {Input} from "$lib/components/ui/input"
	import {toast} from "svelte-sonner"
	import {Speak} from "$lib/speak"
	import * as Card from "$lib/components/ui/card"
	import * as RadioGroup from "$lib/components/ui/radio-group"

	import Trash2 from "@lucide/svelte/icons/trash-2"
	import Plus from "@lucide/svelte/icons/plus"
	import MoveUpIcon from "@lucide/svelte/icons/arrow-up"
	import MoveDownIcon from "@lucide/svelte/icons/arrow-down"
	import BetweenHorizontalStart from "@lucide/svelte/icons/between-horizontal-start"
	import Speech from "@lucide/svelte/icons/speech"

	const data: EditorProps = $props()
	const isMine = $derived(data.online ? data.isMine : false)

	let name = $derived(data.online ? data.name : "")
	let words = $state(data.online ? data.words : [])
	let saved = $state(true)
	let saving = $state(false)
	let deleting = $state(false)
	let typing = $state(false)
	let renaming = $state(false)
	let forking = $state(false)
	let dragIndex = $state<number | null>(null)
	let initialisationOpened = $state(false)

	let showWordOperations = $state(true)
	let showExtraOptions = $state(true)

	$effect.pre(() =>
	{
		if (data.online)
			words = data.words
	})

	async function Save()
	{
		if (saving || saved || ! data.online || ! data.isMine)
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

	async function Fork()
	{
		if (! data.online)
			return

		const {db, id} = data

		forking = true

		const {data: newData, error} = await db
			.from("sets")
			.insert({name: `_${name}`, words: words as Json, origin: id})
			.select()


		if (error)
		{
			console.error(error)
			alert(error.message)
			forking = false
			return
		}

		if (newData.length != 1)
		{
			console.error("Failed to fork")
			forking = false
			return
		}

		toast.success($_.editor.fork.success)

		const newId = newData[0].id

		await goto(`/edit/${newId}`)

		forking = false
	}

	function InsertNewWord(i: number)
	{
		const word = structuredClone(blankWordSimple)

		words = [...words.slice(0, i), word, ...words.slice(i)]

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
		words = words.map(({word, meaning}) =>
			structuredClone({...blankWordFromType[card], word, meaning}) as Word)

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
	}
</script>

<svelte:window {onbeforeunload} {onkeydown}/>

<svelte:head>
	<title>
		{(saved ? $_.editor.title.edit : $_.editor.title.unsaved)(name)}
	</title>
</svelte:head>

<EditorNav
	{Delete} {Export} {Fork} {Import} OpenInitialisation={() => initialisationOpened = true}
	OpenSettings={() => settingsOpened.set(true)}
	{Rename}
	{Save}
	bind:showExtraOptions
	bind:showWordOperations
	{deleting}
	{forking}
	id={data.online ? data.id : null}
	isMine={isMine} online={data.online} origin={data.online ? data.origin : null} {renaming} {saved} {saving}
/>

<main class="grow overflow-x-clip overflow-y-auto">

	<header class="mx-auto my-4 w-fit">
		{#if data.online}
			<h1 class="text-xl px-4 text-center">
				{name}
			</h1>
		{/if}
	</header>

	<div class="w-full max-w-xl mx-auto flex flex-col gap-2">

		{#each words as word, i (word)}

			{#if showWordOperations}
				<Button variant="ghost" onclick={() => InsertNewWord(i)} class="text-foreground/60">
					<BetweenHorizontalStart/>
					{$_.editor.insert_here}
				</Button>
			{:else}
				<div class="h-2"></div>
			{/if}

			<Card.Root
				draggable={!typing}
				ondragstart={() => ondragstart(i)}
				ondragend={ondragend}
				ondragover={e => e.preventDefault()}
				ondrop={() => ondrop(i)}
				class="relative flex flex-col"
			>

				<Card.Content class="flex flex-col gap-4">

					<div class="flex flex-col gap-2">

						<div class="flex items-center justify-between">
							<Label for="word-{i}">
								{$_.editor.word}
							</Label>

							<div class="text-xs font-mono">
								{i + 1}<span class="text-foreground/50">/{words.length}</span>
							</div>
						</div>

						<div class="flex gap-2 md:gap-4">

							{#if showWordOperations && CanSpeak(word.type)}
								<Button size="icon" variant="secondary" onclick={() => $Speak(word)}
										  aria-label={$_.learn.speak}>
									<Speech/>
								</Button>
							{/if}

							{#if UsesStringInput(word.type)}
								<Input
									type="text" bind:value={word.word}
									onfocusin={() => typing = true}
									onfocusout={() => typing = false}
									onchange={e => OnWordChange(e, i)}
									id="word-{i}"
									lang={LangFromWord(word)}
								/>
							{/if}

							{#if showWordOperations}
								<Button size="icon" variant="destructive" onclick={() => DeleteWord(i)} aria-label={$_.delete}>
									<Trash2/>
								</Button>
							{/if}

						</div>

						{#if word.type === WordType.Egyptian}
							<InputEgyptianHieroglyphs bind:value={word.word} onchange={() => saved = false}/>
						{/if}

					</div>

					<div class="flex flex-col gap-2">
						<Label for="meaning-{i}">
							{$_.editor.meaning}
						</Label>

						<Input
							type="text" bind:value={word.meaning}
							onfocusin={() => typing = true}
							onfocusout={() => typing = false}
							onchange={() => saved = false}
							id="meaning-{i}"
						/>
					</div>

					{#if showExtraOptions}

						<SelectWordAndTheirExtras bind:saved bind:word={words[i]} {i} onchange={w => words[i] = w}/>

						{#if word.type === WordType.French && word.category === French.Category.Noun}

							<RadioGroup.Root
								bind:value={word.gender}
								name="gender-{i}"
								onValueChange={() => saved = false}
								class="w-full flex items-center gap-4"
							>

								<div>{$_.linguistics.gender}</div>

								<div class="flex items-center gap-2">
									<RadioGroup.Item id="m" value={French.Gender.M}/>
									<Label for="m">{$_.linguistics.abbr.masculine}</Label>
								</div>

								<div class="flex items-center gap-2">
									<RadioGroup.Item id="f" value={French.Gender.F}/>
									<Label for="f">{$_.linguistics.abbr.feminine}</Label>
								</div>

							</RadioGroup.Root>

						{:else if word.type === WordType.German && word.category === German.Category.Noun}

							<RadioGroup.Root
								bind:value={word.gender}
								name="gender-{i}"
								onValueChange={() => saved = false}
								class="w-full flex items-center gap-4"
							>

								<div>{$_.linguistics.gender}</div>

								<div class="flex items-center gap-2">
									<RadioGroup.Item id="m" value={German.Gender.M}/>
									<label for="m">{$_.linguistics.abbr.masculine}</label>
								</div>

								<div class="flex items-center gap-2">
									<RadioGroup.Item id="n" value={German.Gender.N}/>
									<label for="n">{$_.linguistics.abbr.neutral}</label>
								</div>

								<div class="flex items-center gap-2">
									<RadioGroup.Item id="f" value={German.Gender.F}/>
									<label for="f">{$_.linguistics.abbr.feminine}</label>
								</div>

							</RadioGroup.Root>

						{:else if word.type === WordType.Japanese && word.category === Japanese.Category.Verb}

							<RadioGroup.Root
								bind:value={word.verb_type}
								name="jvt-{i}"
								onValueChange={() => saved = false}
								class="w-full flex items-center gap-4"
							>

								<div>{$_.linguistics.verb_group}</div>

								<div class="flex items-center gap-2">
									<RadioGroup.Item id="jvt-c-{i}" value={Japanese.VerbType.Consonant}/>
									<Label for="jvt-c-{i}">1</Label>
								</div>

								<div class="flex items-center gap-2">
									<RadioGroup.Item id="jvt-v-{i}" value={Japanese.VerbType.Vowel}/>
									<Label for="jvt-v-{i}">2</Label>
								</div>

								<div class="flex items-center gap-2">
									<RadioGroup.Item id="jvt-n-{i}" value={Japanese.VerbType.Noun}/>
									<Label for="jvt-n-{i}">3</Label>
								</div>

								<div class="flex items-center gap-2">
									<RadioGroup.Item id="jvt-ir-{i}" value={Japanese.VerbType.Irregular}/>
									<Label for="jvt-ir-{i}">?</Label>
								</div>

							</RadioGroup.Root>

						{:else if word.type === WordType.Mandarin}

							{#if $settings.MandarinScript === MandarinScript.Pinyin}

								<InputPinyinLight
									bind:value={word.syllables}
									onchange={() => saved = false}
									placeholder={$_.linguistics.pinyin}
								/>

							{:else if $settings.MandarinScript === MandarinScript.Bopomofo}

								<InputBopomofoLight
									bind:value={word.syllables}
									onchange={() => saved = false}
									placeholder={$_.linguistics.bopomofo}
								/>

							{/if}

						{:else if word.type === WordType.Egyptian}

							<div class="flex flex-col gap-2">
								<Label>
									{$_.linguistics.transliteration}
								</Label>
								<InputEgyptianTransliteration
									bind:value={word.trans}
									onchange={() => saved = false}
								/>
							</div>

						{/if}

					{/if}

					{#if showWordOperations}
						<div class="w-full flex gap-2">

							<Button onclick={() => MoveUp(i)} disabled={i === 0}
									  class="flex-1" variant="secondary">
								<MoveUpIcon/>
								{$_.editor.move_up}
							</Button>

							<Button onclick={() => MoveDown(i)} disabled={i === words.length - 1}
									  class="flex-1" variant="secondary">
								<MoveDownIcon/>
								{$_.editor.move_down}
							</Button>

						</div>
					{/if}

				</Card.Content>
			</Card.Root>

		{/each}

		{#if words.length === 0}
			<Button class="mx-2" onclick={() => initialisationOpened = true}>
				{$_.editor.initialise}
			</Button>
		{:else if showWordOperations}
			<Button class="mx-2" onclick={() => InsertNewWord(words.length)} variant="secondary">
				<Plus/>
				{$_.editor.add_a_word}
			</Button>
		{/if}

	</div>

	<div style="height: 50vh"></div>

</main>

<EditorInitialisation
	{ReplaceWithEmptyWords}
	{SetAllCardsTypes}
	bind:open={initialisationOpened}
	{words}
/>
