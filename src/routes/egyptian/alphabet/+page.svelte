<script lang="ts">
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import * as T from "$lib/components/ui/table"
	import {Phoneme} from "$lib/word/egyptian"
	import {g} from "$lib/word/egyptian/hieroglyphs"
	import {Phoneme2Egyptology} from "$lib/word/egyptian/transliteration/egyptology"

	const pronunciations = [
		"ʔ",
		"j",
		"j",
		"ʕ",
		"w",
		"b",
		"p",
		"f",
		"m",
		"n",
		"r",
		"h",
		"ħ",
		"x",
		"ç",
		"s",
		"z",
		"ʃ",
		"k",
		"g",
		"q",
		"t",
		"c",
		"d",
		"ɟ",
	]
</script>

<svelte:head>
	<title>Egyptian Alphabet</title>
</svelte:head>

<article class="mx-auto p-4 w-full max-w-xl">

	<header class="my-4 text-3xl font-bold">
		Egyptian Alphabet
	</header>

	<section>

		<header class="my-4 text-2xl font-bold">
			Uniliteral
		</header>

		<div class="m-auto w-fit flex gap-4">
			<T.Root>

				<T.Header>
					<T.Row>
						<T.Head>
							<div class="v">
								IPA
							</div>
						</T.Head>
						<T.Head>
							<div class="v">
								Glyph
							</div>
						</T.Head>
						<T.Head>
							<div class="v">
								Gardiner
							</div>
						</T.Head>
					</T.Row>
				</T.Header>

				<T.Body>
					{#each Object.entries(Phoneme).slice(0, 11) as [_, phoneme], i}
						<T.Row>
							<T.Cell class="text-3xl text-center">
								{pronunciations[i]}
							</T.Cell>
							<T.Cell class="text-3xl text-center">
								<EgyptianText t={[g(phoneme)]}/>
							</T.Cell>
							<T.Cell class="text-3xl text-center">
								<code>{Phoneme2Egyptology[phoneme]}</code>
							</T.Cell>
						</T.Row>
					{/each}
				</T.Body>

			</T.Root>

			<T.Root>

				<T.Header>
					<T.Row>
						<T.Head>
							<div class="v">
								IPA
							</div>
						</T.Head>
						<T.Head>
							<div class="v">
								Glyph
							</div>
						</T.Head>
						<T.Head>
							<div class="v">
								Gardiner
							</div>
						</T.Head>
					</T.Row>
				</T.Header>

				<T.Body>
					{#each Object.entries(Phoneme).slice(11) as [_, phoneme], i}
						<T.Row>
							<T.Cell class="text-3xl text-center">
								{pronunciations[11 + i]}
							</T.Cell>
							<T.Cell class="text-3xl text-center">
								<EgyptianText t={[g(phoneme)]}/>
							</T.Cell>
							<T.Cell class="text-3xl text-center">
								<code>{Phoneme2Egyptology[phoneme]}</code>
							</T.Cell>
						</T.Row>
					{/each}
				</T.Body>

			</T.Root>

		</div>

	</section>

</article>

<style>
	@reference "tailwindcss";

	.v {
		@apply mx-2;
		writing-mode: vertical-rl;
		text-orientation: mixed;
	}
</style>
