<script lang="ts">
	import InputEgyptianHieroglyphs from "$lib/components/InputEgyptianHieroglyphs.svelte"
	import GardinerTable from "$lib/components/GardinerTable.svelte"
	import {Label} from "$lib/components/ui/label"
	import {Slider} from "$lib/components/ui/slider"
	import {Switch} from "$lib/components/ui/switch"
	import * as T from "$lib/components/ui/table"
	import {QuickSymbols} from "$lib/word/egyptian/IME"
	import {g} from "$lib/word/egyptian/hieroglyphs"

	import {_} from "$lib/i18n/store"
	import type {Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
	import EgyptianText from "$lib/components/EgyptianText.svelte"

	let useCustomTextColour = $state(false)
	let customTextColour = $state("#000000")
	let hideControls = $state(false)
	let height = $state(48)
	let InsertSymbolAtCursor: (symbol: Hieroglyphs) => void = $state(() => {})

	const textColour = $derived(useCustomTextColour ? customTextColour : "inherit")
</script>

<svelte:head>
	<title>{$_.egyptian.typewriter.title}</title>
	<meta name="description" content="{$_.learning_resources.egyptian.typewriter.inner.meta_description}"/>
</svelte:head>

<header class="p-4 text-center text-3xl">
	<h1>{$_.egyptian.typewriter.title}</h1>
</header>

<main class="mx-auto p-4 w-full xl:w-fit flex flex-col xl:flex-row gap-4">

	{#snippet ShortcutTable()}
		{#if !hideControls}
			<T.Root class="caption-top max-w-sm text-center">

				<T.Caption>{$_.egyptian.typewriter.number_shortcut}</T.Caption>

				<T.Header>
					<T.Row>
						<T.Head class="text-center">
							{$_.egyptian.typewriter.number}
						</T.Head>
						<T.Head class="text-center">
							{$_.egyptian.typewriter.glyph}
						</T.Head>
					</T.Row>
				</T.Header>

				<T.Body>
					{#each ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] as key}
						<T.Row>
							<T.Cell class="text-2xl">
								{key}
							</T.Cell>
							<T.Cell class="text-3xl">
								<EgyptianText t={[g(QuickSymbols[key])]} />
							</T.Cell>
						</T.Row>
					{/each}
				</T.Body>

			</T.Root>
		{/if}
	{/snippet}

	<div class="xl:w-xs flex flex-col gap-4">

		<div class="flex gap-4">
			<Label for="height">{$_.egyptian.typewriter.height}</Label>
			<Slider bind:value={height} id="height" class="flex-1" max={96} min={16} type="single"/>
			<code>{height}</code>
		</div>

		<div class="flex gap-4 items-center">
			<div class="flex items-center gap-2">
				<Switch bind:checked={useCustomTextColour} title={$_.egyptian.typewriter.enable_custom_text_colour}/>
				<input bind:value={customTextColour} class="h-9 w-12 outline-1" id="text-colour" type="color">
			</div>
			<Label for="text-colour">
				{$_.egyptian.typewriter.custom_text_colour}
			</Label>
		</div>

		<div class="flex gap-4 items-center">
			<Switch bind:checked={hideControls} id="hide-controls"/>
			<Label for="hide-controls">
				{$_.egyptian.typewriter.hide_controls}
			</Label>
		</div>

		<div class="hidden xl:block">
			{@render ShortcutTable()}
		</div>

	</div>

	<div class="xl:w-3xl flex flex-col space-y-4">

		<InputEgyptianHieroglyphs
			color={textColour}
			{height}
			{hideControls}
			editing
			bind:InsertSymbolAtCursor
		/>

		{#if !hideControls}
			<GardinerTable
				OnClickSymbol={symbol => InsertSymbolAtCursor(g(symbol))}
			/>
		{/if}

		<div class="xl:hidden">
			{@render ShortcutTable()}
		</div>

	</div>

</main>

<div class="h-100 md:hidden"></div>
