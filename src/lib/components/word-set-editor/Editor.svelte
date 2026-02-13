<script lang="ts">
	import {blankWordFromType, blankWordSimple, UsesStringInput, blankWordFromTypeAndCategory} from "$lib"
	import {goto} from "$app/navigation"
	import type {Language} from "$lib/i18n/Language"
	import {_} from "$lib/i18n/store"
	import {autosave} from "$lib/settings/store"
	import {English, French, German, Japanese, Mandarin, type Word} from "$lib/word"
	import {FuriganaTemplateFromWord, VerbTypeFromRecursiveForm} from "$lib/word/japanese"
	import EditorNav from "$lib/components/word-set-editor/EditorNav.svelte"
	import EditorInitialisation from "$lib/components/word-set-editor/EditorInitialisation.svelte"
	import {Button} from "$lib/components/ui/button"
	import {WordType} from "$lib/word/types"
	import {toast} from "svelte-sonner"
	import {} from "$lib/components/ui/dialog"

	import Plus from "@lucide/svelte/icons/plus"
	import BetweenHorizontalStart from "@lucide/svelte/icons/between-horizontal-start"
	import type {Service} from "$lib/service"
	import {ValidateWords} from "$lib/word/validate"
	import {onMount} from "svelte"
	import WordEditor from "./WordEditor.svelte"
	import EditorPropertiesSheet from "./EditorPropertiesSheet.svelte"

	const data: {
		online: true
		service: Service
		name: string
		id: string
		origin: string | null
		isMine: boolean
		words: Word[]
		language: Language | null
		OnSavedStatusChange?: (saved: boolean) => void
	} | {
		online: false
	} = $props()

	const isMine = $derived(data.online ? data.isMine : false)

	let name = $derived(data.online ? data.name : "")
	let words = $state(data.online ? data.words : [])
	let mainLanguage = $derived(data.online ? data.language : null)
	let saved = $state(true)
	let saving = $state(false)
	let deleting = $state(false)
	let typing = $state(false)
	let forking = $state(false)
	let dragIndex = $state<number | null>(null)

	let showWordOperations = $state(true)
	let showExtraOptions = $state(true)

	let initialisationOpened = $state(false)
	let propertiesSheetOpen = $state(false)

	$effect.pre(() =>
	{
		if (data.online)
			words = data.words
	})

	$effect(() =>
	{
		if (data.online)
			data.OnSavedStatusChange?.(saved)
	})

	onMount(() =>
	{
		if (! data.online || ! data.isMine)
			return

		const saveInterval = setInterval(() =>
		{
			if ($autosave && ! typing && ! saving && ! saved)
				Save()
		}, 2000)

		return () =>
		{
			clearInterval(saveInterval)
		}
	})

	async function Save()
	{
		if (saving || saved || ! data.online || ! data.isMine)
			return

		saving = true
		const error = await data.service.WordSet.Put(data.id, words)
		saving = false

		if (error)
		{
			console.error(error)
			toast.error(error.message)
			return
		}

		saved = true
	}

	async function Fork()
	{
		if (! data.online)
			return

		forking = true
		const newId = await data.service.WordSet.Fork(data.id)
		forking = false

		if (newId instanceof Error)
		{
			console.error(newId)
			toast.error(newId.message)
			return
		}

		toast.success($_.editor.fork.success)
		await goto(`/edit/${newId}`)
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
		a.download = `${name}.set.wt.json`
		a.click()

		URL.revokeObjectURL(url)
	}

	function Import()
	{
		const input = document.createElement("input")
		input.type = "file"
		input.accept = ".json"

		input.onchange = async function()
		{
			const {files} = input

			if (files == null || files.length != 1)
			{
				console.error("Expected exactly one file")
				return
			}

			const rawTextWords = await files[0].text()

			let rawJsonWords: any

			try
			{
				rawJsonWords = JSON.parse(rawTextWords)
			} catch (e)
			{
				console.error(e)
				toast.error($_.file.import.bad_file_error)
				return
			}

			const newWords = ValidateWords(rawJsonWords)

			if (newWords instanceof Error)
			{
				console.error(newWords)
				toast.error($_.file.import.bad_file_error)
				return
			}

			words = newWords
			saved = false
			toast.success($_.file.import.win)
		}

		input.click()
	}

	async function Delete()
	{
		if (! data.online)
			return

		const ok = confirm(`${$_.editor.delete_confirm.this_will_be_deleted}\n${name}\n${$_.editor.delete_confirm.are_you_sure}`)

		if (! ok)
			return

		deleting = true
		const error = await data.service.WordSet.Delete(data.id)
		deleting = false

		if (error)
		{
			console.error(error)
			toast.error(error.message)
			return
		}

		await goto("/")
	}

	function OnWordChange(e: Event & {currentTarget: HTMLInputElement}, i: number)
	{
		saved = false

		const word = words[i]

		switch (word.type)
		{
		case WordType.Japanese:
		{
			word.word = e.currentTarget.value
			word.furi = FuriganaTemplateFromWord(e.currentTarget.value)

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
			break
		}
		case WordType.Egyptian:
			break
		default:
			word.word = e.currentTarget.value
			break
		}
	}

	function ReplaceWithEmptyWords(card: WordType, count: number)
	{
		words = new Array(count).fill(undefined).map(_ => structuredClone(blankWordFromType[card]))

		saved = false
	}

	function SetAllCardsTypes(newType: WordType)
	{
		words = words.map(w =>
		{
			if (w.type == newType)
				return w

			if (w.type == WordType.Egyptian || newType == WordType.Egyptian)
				return structuredClone({...blankWordFromType[WordType.Egyptian], meaning: w.meaning})

			return structuredClone({...blankWordFromType[newType], word: w.word, meaning: w.meaning})
		})

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

	function ChangeWordType<T extends WordType>(
		i: number,
		...[newType, newType2]:
			T extends WordType.English ? [T, English.Region] :
			T extends WordType.Mandarin ? [T, Mandarin.Region] :
			T extends WordType.French ? [T, French.Category] :
			T extends WordType.Japanese ? [T, Japanese.Category] :
			T extends WordType.German ? [T, German.Category] :
			[T]
	)
	{
		const word = words[i]

		switch (newType)
		{
		case WordType.Simple:
			words[i] = {
				...structuredClone(blankWordFromTypeAndCategory.simple),
				meaning: word.meaning,
				word: UsesStringInput(word.type) ? word.word as string : "",
			}
			break
		case WordType.Egyptian:
			words[i] = {
				...structuredClone(blankWordFromType.egyptian),
				meaning: word.meaning,
				word: word.type == WordType.Egyptian ? word.word : [],
				trans: word.type == WordType.Egyptian ? word.trans : [],
			}
			break
		case WordType.English:
			words[i] = {
				...structuredClone(blankWordFromTypeAndCategory.english),
				meaning: word.meaning,
				region: newType2 as English.Region,
				word: UsesStringInput(word.type) ? word.word as string : "",
			}
			break
		case WordType.Mandarin:
			words[i] = {
				...structuredClone(blankWordFromTypeAndCategory.mandarin),
				meaning: word.meaning,
				region: newType2 as Mandarin.Region,
				word: UsesStringInput(word.type) ? word.word as string : "",
				syllables: word.type == WordType.Mandarin ? word.syllables : [],
			}
			break
		case WordType.French:
			words[i] = {
				...structuredClone(blankWordFromTypeAndCategory.french[newType2 as French.Category]),
				meaning: word.meaning,
				word: UsesStringInput(word.type) ? word.word as string : "",
			}
			break
		case WordType.German:
			words[i] = {
				...structuredClone(blankWordFromTypeAndCategory.german[newType2 as German.Category]),
				meaning: word.meaning,
				word: UsesStringInput(word.type) ? word.word as string : "",
			}
			break
		case WordType.Japanese:
			words[i] = {
				...structuredClone(blankWordFromTypeAndCategory.japanese[newType2 as Japanese.Category]),
				meaning: word.meaning,
				word: UsesStringInput(word.type) ? word.word as string : "",
			}
			break
		}
	}
</script>

<svelte:window {onbeforeunload} {onkeydown} />

<EditorNav
	{Delete} {Export} {Fork} {Import}
	OpenInitialisation={() => initialisationOpened = true}
	{Save}
	bind:showExtraOptions
	bind:showWordOperations
	bind:propertiesSheetOpen
	{deleting}
	{forking}
	id={data.online ? data.id : null}
	isMine={isMine}
	online={data.online}
	origin={data.online ? data.origin : null}
	{saved}
	{saving}
/>

<main class="grow overflow-x-clip overflow-y-auto">

	<header class="m-4 text-center">
		{#if data.online}
			<h1 class="text-xl">
				{name}
			</h1>
		{/if}
		<p class="text-muted-foreground">
			{$_.set.word_count_label(words.length)}
		</p>
	</header>

	<div class="w-full max-w-xl mx-auto flex flex-col gap-2">

		{#each words as word, index (word)}

			{#if showWordOperations}
				<Button variant="ghost" onclick={() => InsertNewWord(index)} class="text-foreground/60">
					<BetweenHorizontalStart />
					{$_.editor.insert_here}
				</Button>
			{:else}
				<div class="h-2"></div>
			{/if}

			<WordEditor
				bind:word={words[index]}
				{index}
				wordCount={words.length}
				{typing}
				{showExtraOptions}
				{ondragstart}
				{ondragend}
				{ondrop}
				{OnWordChange}
				{MoveUp}
				{MoveDown}
				{ChangeWordType}
				{DeleteWord}
				bind:saved
			/>

		{/each}

		{#if words.length === 0}
			<Button class="mx-2" onclick={() => initialisationOpened = true}>
				{$_.editor.initialise}
			</Button>
		{:else if showWordOperations}
			<Button class="mx-2" onclick={() => InsertNewWord(words.length)} variant="secondary">
				<Plus />
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

{#if data.online}
	<EditorPropertiesSheet
		bind:open={propertiesSheetOpen}
		bind:name
		bind:mainLanguage
		service={data.service}
		id={data.id}
	/>
{/if}
