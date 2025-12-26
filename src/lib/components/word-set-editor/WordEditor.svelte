<script lang="ts">
	import {LangFromWord, UsesStringInput, CanSpeak} from "$lib"
	import InputEgyptianTransliteration from "$lib/components/InputEgyptianTransliteration.svelte"
	import InputFurigana from "$lib/components/InputFurigana.svelte"
	import InputEgyptianHieroglyphs from "$lib/components/InputEgyptianHieroglyphs.svelte"
	import {_} from "$lib/i18n/store"
	import {settings} from "$lib/settings/store"
	import {
		English,
		French,
		German,
		Japanese,
		Mandarin,
		type Word,
	} from "$lib/word"
	import InputPinyinLight from "$lib/components/InputPinyinLight.svelte"
	import {MandarinScript} from "$lib/settings"
	import InputBopomofoLight from "$lib/components/InputBopomofoLight.svelte"
	import {Button} from "$lib/components/ui/button"
	import {Label} from "$lib/components/ui/label"
	import {Input} from "$lib/components/ui/input"
	import {WordType} from "$lib/word/types"
	import {Speak} from "$lib/speak"
	import * as Card from "$lib/components/ui/card"
	import * as RadioGroup from "$lib/components/ui/radio-group"
	import * as DM from "$lib/components/ui/dropdown-menu"
	import {ButtonGroup} from "$lib/components/ui/button-group"
	import {} from "$lib/components/ui/dialog"

	import Trash2 from "@lucide/svelte/icons/trash-2"
	import MoveUpIcon from "@lucide/svelte/icons/arrow-up"
	import MoveDownIcon from "@lucide/svelte/icons/arrow-down"
	import Speech from "@lucide/svelte/icons/speech"
	import Ellipsis from "@lucide/svelte/icons/ellipsis"
	import Check from "@lucide/svelte/icons/check"
	import Languages from "@lucide/svelte/icons/languages"

	let {
		word = $bindable(),
		index,
		wordCount,
		typing,
		showExtraOptions,
		showWordOperations,
		ondragstart,
		ondragend,
		ondrop,
		OnWordChange,
		MoveUp,
		MoveDown,
		ChangeWordType,
		DeleteWord,
		saved = $bindable(),
	}: {
		word: Word
		index: number
		wordCount: number
		typing: boolean
		showExtraOptions: boolean
		showWordOperations: boolean
		ondragstart: (index: number) => void
		ondragend: () => void
		ondrop: (index: number) => void
		OnWordChange: (
			e: Event & {currentTarget: HTMLInputElement},
			i: number,
		) => void
		MoveUp: (i: number) => void
		MoveDown: (i: number) => void
		ChangeWordType: <T extends WordType>(
			i: number,
			...[newType, newType2]: T extends WordType.English
				? [T, English.Region]
				: T extends WordType.Mandarin
					? [T, Mandarin.Region]
					: T extends WordType.French
						? [T, French.Category]
						: T extends WordType.Japanese
							? [T, Japanese.Category]
							: T extends WordType.German
								? [T, German.Category]
								: [T]
		) => void
		DeleteWord: (i: number) => void
		saved: boolean
	} = $props()
</script>

<Card.Root
	draggable={!typing}
	ondragstart={() => ondragstart(index)}
	{ondragend}
	ondragover={e => e.preventDefault()}
	ondrop={() => ondrop(index)}
	class="relative flex flex-col"
>
	<Card.Content class="flex flex-col gap-4">
		<div class="absolute top-1 right-2 text-xs font-mono">
			{index + 1}
		</div>

		<div class="flex flex-col gap-2">
			{#if UsesStringInput(word.type)}
				<Input
					type="text"
					value={word.word}
					onfocusin={() => (typing = true)}
					onfocusout={() => (typing = false)}
					onchange={e => OnWordChange(e, index)}
					id="word-{index}"
					lang={LangFromWord(word)}
					style="font-size: 1.5rem"
					placeholder={$_.editor.word}
				/>
			{/if}

			{#if word.type == WordType.Egyptian}
				<InputEgyptianHieroglyphs
					bind:value={word.word}
					onchange={() => (saved = false)}
				/>
			{/if}

			<Input
				type="text"
				bind:value={word.meaning}
				onfocusin={() => (typing = true)}
				onfocusout={() => (typing = false)}
				onchange={() => (saved = false)}
				id="meaning-{index}"
				name="meaning-{index}"
				placeholder={$_.editor.meaning}
			/>
		</div>

		{#if showExtraOptions}
			{#if word.type == WordType.French && word.category == French.Category.Noun}
				<RadioGroup.Root
					bind:value={word.gender}
					name="gender-{index}"
					onValueChange={() => (saved = false)}
					class="w-full flex items-center gap-4"
				>
					<Label>{$_.linguistics.gender}</Label>

					<div class="flex items-center">
						<RadioGroup.Item id="m" value={French.Gender.M} />
						<Label class="pl-2" for="m"
							>{$_.linguistics.abbr.masculine}</Label
						>
					</div>

					<div class="flex items-center">
						<RadioGroup.Item id="f" value={French.Gender.F} />
						<Label class="pl-2" for="f"
							>{$_.linguistics.abbr.feminine}</Label
						>
					</div>
				</RadioGroup.Root>
			{:else if word.type == WordType.German && word.category == German.Category.Noun}
				<RadioGroup.Root
					bind:value={word.gender}
					name="gender-{index}"
					onValueChange={() => (saved = false)}
					class="w-full flex items-center gap-4"
				>
					<Label>{$_.linguistics.gender}</Label>

					<div class="flex items-center">
						<RadioGroup.Item id="m" value={German.Gender.M} />
						<label class="pl-2" for="m"
							>{$_.linguistics.abbr.masculine}</label
						>
					</div>

					<div class="flex items-center">
						<RadioGroup.Item id="n" value={German.Gender.N} />
						<label class="pl-2" for="n"
							>{$_.linguistics.abbr.neutral}</label
						>
					</div>

					<div class="flex items-center">
						<RadioGroup.Item id="f" value={German.Gender.F} />
						<label class="pl-2" for="f"
							>{$_.linguistics.abbr.feminine}</label
						>
					</div>
				</RadioGroup.Root>
			{:else if word.type == WordType.Japanese}
				<div class="flex flex-col gap-2">
					<Label>{$_.japanese.furigana}</Label>

					<InputFurigana
						text={word.word}
						bind:value={word.furi}
						onchange={() => (saved = false)}
					/>
				</div>

				{#if word.category == Japanese.Category.Verb}
					<RadioGroup.Root
						bind:value={word.verb_type}
						name="jvt-{index}"
						onValueChange={() => (saved = false)}
						class="w-full flex items-center gap-4"
					>
						<Label>{$_.linguistics.verb_group}</Label>

						<div class="flex items-center">
							<RadioGroup.Item
								id="jvt-c-{index}"
								value={Japanese.VerbType.Consonant}
							/>
							<Label class="pl-2" for="jvt-c-{index}">1</Label>
						</div>

						<div class="flex items-center">
							<RadioGroup.Item
								id="jvt-v-{index}"
								value={Japanese.VerbType.Vowel}
							/>
							<Label class="pl-2" for="jvt-v-{index}">2</Label>
						</div>

						<div class="flex items-center">
							<RadioGroup.Item
								id="jvt-n-{index}"
								value={Japanese.VerbType.Noun}
							/>
							<Label class="pl-2" for="jvt-n-{index}">3</Label>
						</div>

						<div class="flex items-center">
							<RadioGroup.Item
								id="jvt-ir-{index}"
								value={Japanese.VerbType.Irregular}
							/>
							<Label class="pl-2" for="jvt-ir-{index}">?</Label>
						</div>
					</RadioGroup.Root>
				{/if}
			{:else if word.type == WordType.Mandarin}
				{#if $settings.MandarinScript == MandarinScript.Pinyin}
					<div class="flex flex-col gap-2">
						<Label>{$_.linguistics.pinyin}</Label>
						<InputPinyinLight
							bind:value={word.syllables}
							onchange={() => (saved = false)}
						/>
					</div>
				{:else if $settings.MandarinScript == MandarinScript.Bopomofo}
					<div class="flex flex-col gap-2">
						<Label>{$_.linguistics.bopomofo}</Label>
						<InputBopomofoLight
							bind:value={word.syllables}
							onchange={() => (saved = false)}
						/>
					</div>
				{/if}
			{:else if word.type == WordType.Egyptian}
				<div class="inline-flex gap-2">
					<Label for="e-trans-{index}">
						{$_.linguistics.transliteration}
					</Label>
					<InputEgyptianTransliteration
						bind:value={word.trans}
						id="e-trans-{index}"
						oninput={() => (saved = false)}
						class="flex-1"
						style="font-size: 1.25rem"
					/>
				</div>
			{/if}
		{/if}

		{#if showWordOperations}
			<ButtonGroup class="w-full">
				<Button
					onclick={() => MoveUp(index)}
					disabled={index == 0}
					class="flex-1"
					variant="outline"
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
								<Languages />
								{$_.editor.word_type}
							</DM.SubTrigger>

							<DM.SubContent>
								<DM.Sub>
									<DM.SubTrigger>
										{#if word.type == WordType.English}
											<Check />
										{/if}
										{$_.WordType.English}
									</DM.SubTrigger>
									<DM.SubContent>
										<DM.Item
											onclick={() =>
												ChangeWordType(
													index,
													WordType.English,
													English.Region.GB,
												)}
										>
											{#if word.type == WordType.English && word.region == English.Region.GB}
												<Check />
											{/if}
											{$_.english.region.gb}
										</DM.Item>
										<DM.Item
											onclick={() =>
												ChangeWordType(
													index,
													WordType.English,
													English.Region.US,
												)}
										>
											{#if word.type == WordType.English && word.region == English.Region.US}
												<Check />
											{/if}
											{$_.english.region.us}
										</DM.Item>
									</DM.SubContent>
								</DM.Sub>

								<DM.Sub>
									<DM.SubTrigger>
										{#if word.type == WordType.Japanese}
											<Check />
										{/if}
										{$_.WordType.Japanese}
									</DM.SubTrigger>
									<DM.SubContent>
										<DM.Item
											onclick={() =>
												ChangeWordType(
													index,
													WordType.Japanese,
													Japanese.Category.Word,
												)}
										>
											{#if word.type == WordType.Japanese && word.category == Japanese.Category.Word}
												<Check />
											{/if}
											{$_.editor.word}
										</DM.Item>
										<DM.Item
											onclick={() =>
												ChangeWordType(
													index,
													WordType.Japanese,
													Japanese.Category.Verb,
												)}
										>
											{#if word.type == WordType.Japanese && word.category == Japanese.Category.Verb}
												<Check />
											{/if}
											{$_.linguistics.verb}
										</DM.Item>
									</DM.SubContent>
								</DM.Sub>

								<DM.Sub>
									<DM.SubTrigger>
										{#if word.type == WordType.Mandarin}
											<Check />
										{/if}
										{$_.WordType.Mandarin}
									</DM.SubTrigger>
									<DM.SubContent>
										<DM.Item
											onclick={() =>
												ChangeWordType(
													index,
													WordType.Mandarin,
													Mandarin.Region.PRC,
												)}
										>
											{#if word.type == WordType.Mandarin && word.region == Mandarin.Region.PRC}
												<Check />
											{/if}
											{$_.mandarin.region.prc}
										</DM.Item>
										<DM.Item
											onclick={() =>
												ChangeWordType(
													index,
													WordType.Mandarin,
													Mandarin.Region.ROC,
												)}
										>
											{#if word.type == WordType.Mandarin && word.region == Mandarin.Region.ROC}
												<Check />
											{/if}
											{$_.mandarin.region.roc}
										</DM.Item>
									</DM.SubContent>
								</DM.Sub>

								<DM.Sub>
									<DM.SubTrigger>
										{#if word.type == WordType.French}
											<Check />
										{/if}
										{$_.WordType.French}
									</DM.SubTrigger>
									<DM.SubContent>
										<DM.Item
											onclick={() =>
												ChangeWordType(
													index,
													WordType.French,
													French.Category.Word,
												)}
										>
											{#if word.type == WordType.French && word.category == French.Category.Word}
												<Check />
											{/if}
											{$_.editor.word}
										</DM.Item>
										<DM.Item
											onclick={() =>
												ChangeWordType(
													index,
													WordType.French,
													French.Category.Noun,
												)}
										>
											{#if word.type == WordType.French && word.category == French.Category.Noun}
												<Check />
											{/if}
											{$_.linguistics.noun}
										</DM.Item>
									</DM.SubContent>
								</DM.Sub>

								<DM.Sub>
									<DM.SubTrigger>
										{#if word.type == WordType.German}
											<Check />
										{/if}
										{$_.WordType.German}
									</DM.SubTrigger>
									<DM.SubContent>
										<DM.Item
											onclick={() =>
												ChangeWordType(
													index,
													WordType.German,
													German.Category.Word,
												)}
										>
											{#if word.type == WordType.German && word.category == German.Category.Word}
												<Check />
											{/if}
											{$_.editor.word}
										</DM.Item>
										<DM.Item
											onclick={() =>
												ChangeWordType(
													index,
													WordType.German,
													German.Category.Noun,
												)}
										>
											{#if word.type == WordType.German && word.category == German.Category.Noun}
												<Check />
											{/if}
											{$_.linguistics.noun}
										</DM.Item>
									</DM.SubContent>
								</DM.Sub>

								<DM.Separator />

								<DM.Item
									onclick={() =>
										ChangeWordType(index, WordType.Egyptian)}
								>
									{#if word.type == WordType.Egyptian}
										<Check />
									{/if}
									{$_.WordType.Egyptian}
								</DM.Item>

								<DM.Separator />

								<DM.Item
									onclick={() =>
										ChangeWordType(index, WordType.Simple)}
								>
									{#if word.type == WordType.Simple}
										<Check />
									{/if}
									{$_.WordType.Simple}
								</DM.Item>
							</DM.SubContent>
						</DM.Sub>

						<DM.Item
							onclick={() => DeleteWord(index)}
							variant="destructive"
						>
							<Trash2 />
							{$_.delete}
						</DM.Item>
					</DM.Content>
				</DM.Root>

				<Button
					onclick={() => MoveDown(index)}
					disabled={index == wordCount - 1}
					class="flex-1"
					variant="outline"
					title={$_.editor.move_down}
				>
					<MoveDownIcon />
					{$_.editor.move_down}
				</Button>
			</ButtonGroup>
		{/if}
	</Card.Content>
</Card.Root>
