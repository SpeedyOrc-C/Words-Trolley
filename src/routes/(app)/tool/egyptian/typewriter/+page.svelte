<script lang="ts">
	import InputEgyptian from "$lib/components/InputEgyptian.svelte"
	import GardinerTable from "$lib/components/GardinerTable.svelte"
	import {Label} from "$lib/components/ui/label"
	import {Slider} from "$lib/components/ui/slider"
	import {Switch} from "$lib/components/ui/switch"
	import * as T from "$lib/components/ui/table"
	import * as A from "$lib/components/ui/accordion"
	import {QuickSymbols} from "$lib/word/egyptian/IME"
	import {g} from "$lib/word/egyptian/hieroglyphs"

	import {_} from "$lib/i18n/store"
	import type {Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
	import EgyptianText from "$lib/components/EgyptianText.svelte"

	let useCustomTextColour = $state(false)
	let customTextColour = $state("#000000")
	let height = $state(48)
	let InsertSymbolAtCursor: (symbol: Hieroglyphs) => void = $state(() => {})

	const textColour = $derived(
		useCustomTextColour ? customTextColour : "inherit",
	)
</script>

<svelte:head>
	<title>{$_.egyptian.typewriter.title}</title>
	<meta
		name="description"
		content={$_.learning_resources.egyptian.typewriter.inner.meta_description}
	/>
</svelte:head>

<header class="p-4 text-center text-3xl">
	<h1>{$_.egyptian.typewriter.title}</h1>
</header>

<main class="mx-auto p-4 max-w-3xl flex flex-col space-y-4">
	<InputEgyptian
		color={textColour}
		{height}
		editing
		bind:InsertSymbolAtCursor
	/>

	<A.Root type="single">
		<A.Item>
			<A.Trigger>{$_.egyptian.typewriter.gardiner_symbol_table}</A.Trigger>
			<A.Content>
				<GardinerTable
					OnClickSymbol={symbol => InsertSymbolAtCursor(g(symbol))}
				/>
			</A.Content>
		</A.Item>

		<A.Item value="quick-reference">
			<A.Trigger>{$_.egyptian.typewriter.quick_reference}</A.Trigger>
			<A.Content class="flex justify-between">
				<T.Root class="w-fit caption-top text-center">
					<T.Caption>{$_.egyptian.typewriter.number_shortcut}</T.Caption>

					<T.Header>
						<T.Row>
							<T.Head>{$_.egyptian.typewriter.number}</T.Head>
							<T.Head>{$_.egyptian.typewriter.glyph}</T.Head>
						</T.Row>
					</T.Header>

					<T.Body class="text-xl font-mono">
						{#each ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] as key}
							<T.Row>
								<T.Cell class="p-0">{key}</T.Cell>
								<T.Cell class="p-0">
									<EgyptianText t={[g(QuickSymbols[key])]} />
								</T.Cell>
							</T.Row>
						{/each}
					</T.Body>
				</T.Root>

				<T.Root class="w-fit caption-top">
					<T.Caption>{$_.egyptian.typewriter.other_shortcuts}</T.Caption>

					<T.Header>
						<T.Row>
							<T.Head>{$_.egyptian.typewriter.key}</T.Head>
							<T.Head>{$_.egyptian.typewriter.action}</T.Head>
						</T.Row>
					</T.Header>

					<T.Body>
						{@const rows = [
							["-", $_.input_egyptian.join_horizontally],
							["=", $_.input_egyptian.join_vertically],
							["\\", $_.input_egyptian.make_ligature],
							[")|", $_.input_egyptian.add_cartouche],
						]}
						{#each rows as [key, action]}
							<T.Row>
								<T.Cell class="font-mono">{key}</T.Cell>
								<T.Cell>{action}</T.Cell>
							</T.Row>
						{/each}
					</T.Body>
				</T.Root>
			</A.Content>
		</A.Item>

		<A.Item>
			<A.Trigger>{$_.settings.appearance._}</A.Trigger>
			<A.Content class="flex flex-col gap-4">
				<div class="flex gap-4">
					<Label for="height">{$_.egyptian.typewriter.height}</Label>
					<Slider
						bind:value={height}
						id="height"
						class="flex-1"
						max={96}
						min={16}
						type="single"
					/>
					<code>{height}</code>
				</div>

				<div class="flex gap-4 items-center">
					<div class="flex items-center gap-2">
						<Switch
							bind:checked={useCustomTextColour}
							title={$_.egyptian.typewriter.enable_custom_text_colour}
						/>
						<input
							bind:value={customTextColour}
							class="h-9 w-12 outline-1"
							id="text-colour"
							type="color"
						/>
					</div>
					<Label for="text-colour">
						{$_.egyptian.typewriter.custom_text_colour}
					</Label>
				</div>
			</A.Content>
		</A.Item>
	</A.Root>
</main>

<div class="h-100 md:hidden"></div>
