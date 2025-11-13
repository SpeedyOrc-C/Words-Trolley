<script lang="ts">
	import {blankWordFromType, blankWordSimple, LangFromWord, UsesStringInput, CanSpeak, blankWordFromTypeAndCategory} from "$lib"
	import InputEgyptianTransliteration from "$lib/components/InputEgyptianTransliteration.svelte"
	import InputFurigana from "$lib/components/InputFurigana.svelte"
	import {goto} from "$app/navigation"
	import InputEgyptianHieroglyphs from "$lib/components/editor/InputEgyptianHieroglyphs.svelte"
	import type {Language} from "$lib/i18n/Language"
	import {_} from "$lib/i18n/store"
	import {autosave, settings, settingsOpened} from "$lib/settings/store"
	import {English, French, German, Japanese, Mandarin, type Word} from "$lib/word"
	import {FuriganaTemplateFromWord, VerbTypeFromRecursiveForm} from "$lib/word/japanese"
	import InputPinyinLight from "$lib/components/InputPinyinLight.svelte"
	import EditorNav from "$lib/components/editor/EditorNav.svelte"
	import {MandarinScript} from "$lib/settings"
	import InputBopomofoLight from "$lib/components/InputBopomofoLight.svelte"
	import EditorInitialisation from "$lib/components/editor/EditorInitialisation.svelte"
	import {Button} from "$lib/components/ui/button"
	import {Label} from "$lib/components/ui/label"
	import {Input} from "$lib/components/ui/input"
	import {WordType} from "$lib/word/types"
	import {toast} from "svelte-sonner"
	import {Speak} from "$lib/speak"
	import * as Card from "$lib/components/ui/card"
	import * as RadioGroup from "$lib/components/ui/radio-group"
	import * as DM from "$lib/components/ui/dropdown-menu"
	import {ButtonGroup} from "$lib/components/ui/button-group"
	import {} from "$lib/components/ui/dialog"

	import Trash2 from "@lucide/svelte/icons/trash-2"
	import Plus from "@lucide/svelte/icons/plus"
	import MoveUpIcon from "@lucide/svelte/icons/arrow-up"
	import MoveDownIcon from "@lucide/svelte/icons/arrow-down"
	import BetweenHorizontalStart from "@lucide/svelte/icons/between-horizontal-start"
	import Speech from "@lucide/svelte/icons/speech"
	import Ellipsis from "@lucide/svelte/icons/ellipsis"
	import Check from "@lucide/svelte/icons/check"
	import Languages from "@lucide/svelte/icons/languages"
	import {Service} from "$lib/service"
	import {ValidateWords} from "$lib/word/validate"
	import {onMount} from "svelte"

	const data: {
		online: true
		service: Service
		name: string
		id: string
		origin: string | null
		isMine: boolean
		words: Word[]
		language: Language | null
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
	let renaming = $state(false)
	let forking = $state(false)
	let dragIndex = $state<number | null>(null)
	let initialisationOpened = $state(false)
	let changingMainLanguage = $state(false)

	let showWordOperations = $state(true)
	let showExtraOptions = $state(true)

	$effect.pre(() =>
	{
		if (data.online)
			words = data.words
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
		a.download = `${name}.wt.json`
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
				toast.error($_.editor.import.bad_file_error)
				return
			}

			const newWords = ValidateWords(rawJsonWords)

			if (newWords instanceof Error)
			{
				console.error(newWords)
				toast.error($_.editor.import.bad_file_error)
				return
			}

			words = newWords
			saved = false
			toast.success($_.editor.import.win)
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

	async function Rename()
	{
		if (! data.online)
			return

		const newName = prompt($_.editor.new_name, name)

		if (newName == null || newName == name)
			return

		renaming = true
		const error = await data.service.WordSet.Rename(data.id, newName)
		renaming = false

		if (error)
		{
			console.error(error)
			toast.error(error.message)
			return
		}

		name = newName
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

	async function ChangeMainLanguage(language: Language | null)
	{
		if (! data.online || changingMainLanguage)
			return

		changingMainLanguage = true

		const error = await data.service.WordSet.ChangeMainLanguage(data.id, language)

		changingMainLanguage = false

		if (error)
		{
			console.error(error)
			toast.error(error.message)
			return
		}

		mainLanguage = language
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

<svelte:head>
	<title>
		{(saved ? $_.editor.title.edit : $_.editor.title.unsaved)(name)}
	</title>
</svelte:head>

<EditorNav
	{ChangeMainLanguage} {Delete} {Export} {Fork} {Import}
	OpenInitialisation={() => initialisationOpened = true}
	OpenSettings={() => settingsOpened.set(true)}
	{Rename}
	{Save}
	bind:showExtraOptions
	bind:showWordOperations
	{changingMainLanguage}
	{deleting}
	{forking}
	id={data.online ? data.id : null}
	isMine={isMine}
	{mainLanguage} online={data.online} origin={data.online ? data.origin : null} {renaming} {saved} {saving}
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
					<BetweenHorizontalStart />
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

					<div class="absolute top-1 right-2 text-xs font-mono">
						{i + 1}<span class="text-foreground/50">/{words.length}</span>
					</div>

					<div class="flex flex-col gap-2">

						{#if UsesStringInput(word.type)}
							<Input
								type="text" value={word.word}
								onfocusin={() => typing = true}
								onfocusout={() => typing = false}
								onchange={e => OnWordChange(e, i)}
								id="word-{i}"
								lang={LangFromWord(word)}
								style="font-size: 1.5rem"
								placeholder={$_.editor.word}
							/>
						{/if}

						{#if word.type === WordType.Egyptian}
							<InputEgyptianHieroglyphs bind:value={word.word} onchange={() => saved = false} />
						{/if}

						<Input
							type="text" bind:value={word.meaning}
							onfocusin={() => typing = true}
							onfocusout={() => typing = false}
							onchange={() => saved = false}
							id="meaning-{i}"
							name="meaning-{i}"
							placeholder={$_.editor.meaning}
						/>

					</div>

					{#if showExtraOptions}

						{#if word.type === WordType.French && word.category === French.Category.Noun}

							<RadioGroup.Root
								bind:value={word.gender}
								name="gender-{i}"
								onValueChange={() => saved = false}
								class="w-full flex items-center gap-4"
							>

								<Label>{$_.linguistics.gender}</Label>

								<div class="flex items-center">
									<RadioGroup.Item id="m" value={French.Gender.M} />
									<Label class="pl-2" for="m">{$_.linguistics.abbr.masculine}</Label>
								</div>

								<div class="flex items-center">
									<RadioGroup.Item id="f" value={French.Gender.F} />
									<Label class="pl-2" for="f">{$_.linguistics.abbr.feminine}</Label>
								</div>

							</RadioGroup.Root>

						{:else if word.type === WordType.German && word.category === German.Category.Noun}

							<RadioGroup.Root
								bind:value={word.gender}
								name="gender-{i}"
								onValueChange={() => saved = false}
								class="w-full flex items-center gap-4"
							>

								<Label>{$_.linguistics.gender}</Label>

								<div class="flex items-center">
									<RadioGroup.Item id="m" value={German.Gender.M} />
									<label class="pl-2" for="m">{$_.linguistics.abbr.masculine}</label>
								</div>

								<div class="flex items-center">
									<RadioGroup.Item id="n" value={German.Gender.N} />
									<label class="pl-2" for="n">{$_.linguistics.abbr.neutral}</label>
								</div>

								<div class="flex items-center">
									<RadioGroup.Item id="f" value={German.Gender.F} />
									<label class="pl-2" for="f">{$_.linguistics.abbr.feminine}</label>
								</div>

							</RadioGroup.Root>

						{:else if word.type === WordType.Japanese}

							<div class="flex flex-col gap-2">

								<Label>{$_.japanese.furigana}</Label>

								<InputFurigana
									text={word.word}
									bind:value={word.furi}
									onchange={() => saved = false}
								/>

							</div>

							{#if word.category === Japanese.Category.Verb}

								<RadioGroup.Root
									bind:value={word.verb_type}
									name="jvt-{i}"
									onValueChange={() => saved = false}
									class="w-full flex items-center gap-4"
								>

									<Label>{$_.linguistics.verb_group}</Label>

									<div class="flex items-center">
										<RadioGroup.Item id="jvt-c-{i}" value={Japanese.VerbType.Consonant} />
										<Label class="pl-2" for="jvt-c-{i}">1</Label>
									</div>

									<div class="flex items-center">
										<RadioGroup.Item id="jvt-v-{i}" value={Japanese.VerbType.Vowel} />
										<Label class="pl-2" for="jvt-v-{i}">2</Label>
									</div>

									<div class="flex items-center">
										<RadioGroup.Item id="jvt-n-{i}" value={Japanese.VerbType.Noun} />
										<Label class="pl-2" for="jvt-n-{i}">3</Label>
									</div>

									<div class="flex items-center">
										<RadioGroup.Item id="jvt-ir-{i}" value={Japanese.VerbType.Irregular} />
										<Label class="pl-2" for="jvt-ir-{i}">?</Label>
									</div>

								</RadioGroup.Root>

							{/if}

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

							<div class="inline-flex gap-2">
								<Label for="e-trans-{i}">
									{$_.linguistics.transliteration}
								</Label>
								<InputEgyptianTransliteration
									bind:value={word.trans}
									id="e-trans-{i}"
									onchange={() => saved = false}
									class="flex-1"
									style="font-size: 1.25rem"
								/>
							</div>

						{/if}

					{/if}

					{#if showWordOperations}
						<ButtonGroup class="w-full">

							<Button
								onclick={() => MoveUp(i)} disabled={i === 0}
								class="flex-1" variant="outline"
								title={$_.editor.move_up}
							>
								<MoveUpIcon />
								{$_.editor.move_up}
							</Button>

							<DM.Root>

								<DM.Trigger>
									{#snippet child({props})}
										<Button {...props} variant="outline">
											<Ellipsis />
											{$_.more}
										</Button>
									{/snippet}
								</DM.Trigger>

								<DM.Content>

									<DM.Item
										onclick={() => $Speak(word)}
										disabled={!CanSpeak(word.type)}
									>
										<Speech />
										{$_.learn.speak}
									</DM.Item>

									<DM.Sub>

										<DM.SubTrigger>
											<Languages/>
											{$_.editor.word_type}
										</DM.SubTrigger>

										<DM.SubContent>

											<DM.Sub>
												<DM.SubTrigger>
													{#if word.type == WordType.English}
														<Check/>
													{/if}
													{$_.WordType.English}
												</DM.SubTrigger>
												<DM.SubContent>
													<DM.Item onclick={() => ChangeWordType(i, WordType.English, English.Region.GB)}>
														{#if word.type == WordType.English && word.region == English.Region.GB}
															<Check/>
														{/if}
														{$_.english.region.gb}
													</DM.Item>
													<DM.Item onclick={() => ChangeWordType(i, WordType.English, English.Region.US)}>
														{#if word.type == WordType.English && word.region == English.Region.US}
															<Check/>
														{/if}
														{$_.english.region.us}
													</DM.Item>
												</DM.SubContent>
											</DM.Sub>

											<DM.Sub>
												<DM.SubTrigger>
													{#if word.type == WordType.Japanese}
														<Check/>
													{/if}
													{$_.WordType.Japanese}
												</DM.SubTrigger>
												<DM.SubContent>
													<DM.Item onclick={() => ChangeWordType(i, WordType.Japanese, Japanese.Category.Word)}>
														{#if word.type == WordType.Japanese && word.category == Japanese.Category.Word}
															<Check/>
														{/if}
														{$_.editor.word}
													</DM.Item>
													<DM.Item onclick={() => ChangeWordType(i, WordType.Japanese, Japanese.Category.Verb)}>
														{#if word.type == WordType.Japanese && word.category == Japanese.Category.Verb}
															<Check/>
														{/if}
														{$_.linguistics.verb}
													</DM.Item>
												</DM.SubContent>
											</DM.Sub>

											<DM.Sub>
												<DM.SubTrigger>
													{#if word.type == WordType.Mandarin}
														<Check/>
													{/if}
													{$_.WordType.Mandarin}
												</DM.SubTrigger>
												<DM.SubContent>
													<DM.Item onclick={() => ChangeWordType(i, WordType.Mandarin, Mandarin.Region.PRC)}>
														{#if word.type == WordType.Mandarin && word.region == Mandarin.Region.PRC}
															<Check/>
														{/if}
														{$_.mandarin.region.prc}
													</DM.Item>
													<DM.Item onclick={() => ChangeWordType(i, WordType.Mandarin, Mandarin.Region.ROC)}>
														{#if word.type == WordType.Mandarin && word.region == Mandarin.Region.ROC}
															<Check/>
														{/if}
														{$_.mandarin.region.roc}
													</DM.Item>
												</DM.SubContent>
											</DM.Sub>

											<DM.Sub>
												<DM.SubTrigger>
													{#if word.type == WordType.French}
														<Check/>
													{/if}
													{$_.WordType.French}
												</DM.SubTrigger>
												<DM.SubContent>
													<DM.Item onclick={() => ChangeWordType(i, WordType.French, French.Category.Word)}>
														{#if word.type == WordType.French && word.category == French.Category.Word}
															<Check/>
														{/if}
														{$_.editor.word}
													</DM.Item>
													<DM.Item onclick={() => ChangeWordType(i, WordType.French, French.Category.Noun)}>
														{#if word.type == WordType.French && word.category == French.Category.Noun}
															<Check/>
														{/if}
														{$_.linguistics.noun}
													</DM.Item>
												</DM.SubContent>
											</DM.Sub>

											<DM.Sub>
												<DM.SubTrigger>
													{#if word.type == WordType.German}
														<Check/>
													{/if}
													{$_.WordType.German}
												</DM.SubTrigger>
												<DM.SubContent>
													<DM.Item onclick={() => ChangeWordType(i, WordType.German, German.Category.Word)}>
														{#if word.type == WordType.German && word.category == German.Category.Word}
															<Check/>
														{/if}
														{$_.editor.word}
													</DM.Item>
													<DM.Item onclick={() => ChangeWordType(i, WordType.German, German.Category.Noun)}>
														{#if word.type == WordType.German && word.category == German.Category.Noun}
															<Check/>
														{/if}
														{$_.linguistics.noun}
													</DM.Item>
												</DM.SubContent>
											</DM.Sub>

											<DM.Separator/>

											<DM.Item onclick={() => ChangeWordType(i, WordType.Egyptian)}>
												{#if word.type == WordType.Egyptian}
													<Check/>
												{/if}
												{$_.WordType.Egyptian}
											</DM.Item>

											<DM.Separator/>

											<DM.Item onclick={() => ChangeWordType(i, WordType.Simple)}>
												{#if word.type == WordType.Simple}
													<Check/>
												{/if}
												{$_.WordType.Simple}
											</DM.Item>

										</DM.SubContent>

									</DM.Sub>

									<DM.Item
										onclick={() => DeleteWord(i)}
										variant="destructive"
									>
										<Trash2 />
										{$_.delete}
									</DM.Item>

								</DM.Content>

							</DM.Root>

							<Button
								onclick={() => MoveDown(i)} disabled={i === words.length - 1}
								class="flex-1" variant="outline"
								title={$_.editor.move_down}
							>
								<MoveDownIcon />
								{$_.editor.move_down}
							</Button>

						</ButtonGroup>
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
