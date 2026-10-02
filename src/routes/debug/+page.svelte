<script lang="ts">
	import InputEgyptian from "#lib/components/InputEgyptian.svelte"
	import MayaHieroglyphs from "#lib/components/MayaHieroglyphs.svelte"
	import {Checkbox} from "#lib/components/ui/checkbox/index.ts"
	import JsonEditor from "#lib/components/ui/json-editor/json-editor.svelte"
	import * as T from "#lib/components/ui/table/index.ts"
	import {settings} from "#lib/settings/store/index.ts"
	import {voices} from "#lib/speak.ts"
	import {Glyph, Subfix, Superfix} from "#lib/word/maya/glyph/index.ts"
	import {Structure} from "#lib/word/maya/hieroglyphs/index.ts"
	import {onMount} from "svelte"

	onMount(() =>
	{
		console.debug($settings)
		console.debug(navigator.languages)
	})

	$effect(() => console.debug($voices))
</script>

<svelte:head>
	<title>Diagnosis - Words Trolley</title>
</svelte:head>

<header class="m-2 text-3xl text-center font-bold">
	DIAGNOSIS
</header>

<main class="m-auto p-2 w-fit">

	<section>
		<header>Maya Hieroglyphs</header>

		<MayaHieroglyphs
			hie={
				[Structure.Vertical, [
					[Structure.Horizontal, [
						[Structure.Vertical, [
							[Structure.Vertical, [
								[Structure.Horizontal, [
									[Structure.Glyph, Glyph.Placeholder],
									[Structure.Glyph, Glyph.Placeholder],
								]],
								[Structure.Subfix, Subfix.Placeholder],
								[Structure.Subfix, Subfix.Placeholder],
							]],
						]],
						[Structure.Vertical, [
							[Structure.Vertical, [
								[Structure.Superfix, Superfix.Placeholder],
								[Structure.Horizontal, [
									[Structure.Glyph, Glyph.Placeholder],
									[Structure.Glyph, Glyph.Placeholder],
								]],
								[Structure.Superfix, Superfix.Placeholder],
							]],
						]],
					]],
					[Structure.Horizontal, [
						[Structure.Vertical, [
							[Structure.Horizontal, [
								[Structure.Glyph, Glyph.Placeholder],
								[Structure.Glyph, Glyph.Placeholder],
							]],
						]],
						[Structure.Vertical, [
							[Structure.Vertical, [
								[Structure.Glyph, Glyph.Placeholder],
								[Structure.Glyph, Glyph.Placeholder],
							]],
						]],
					]],
				]]
			}
			lineHeight={96}
		/>
	</section>

	<section>
		<header>Egyptian Input</header>

		<div class="flex flex-col gap-4">
			<InputEgyptian />
			<InputEgyptian />
		</div>

	</section>

	<section>
		<header>Navigator Languages</header>

		<p class="inline-flex gap-4 flex-wrap">
			{#each navigator.languages as lang}
				<code>{lang}</code>
			{/each}
		</p>
	</section>

	<section>
		<header>Feature Availability</header>

		<ul class="flex flex-col gap-2">
			<li class="flex gap-2 items-center">
				<Checkbox checked={window.navigator.clipboard != undefined} readonly />
				<span>Clipboard</span>
			</li>
		</ul>
	</section>

	<section>
		<header>JSON of Settings</header>
		<JsonEditor value={$settings} />
	</section>

	<section>
		<header>Available TTS Voices</header>

		<T.Root>

			<T.Header>
				<T.Row>
					<T.Head>Is default</T.Head>
					<T.Head>Is local</T.Head>
					<T.Head>Language</T.Head>
					<T.Head>Name</T.Head>
				</T.Row>
			</T.Header>

			<T.Body>
				{#each $voices as voice}
					<T.Row>
						<T.Cell>
							<Checkbox readonly checked={voice.default} />
						</T.Cell>
						<T.Cell>
							<Checkbox readonly checked={voice.localService} />
						</T.Cell>
						<T.Cell>
							<code>{voice.lang}</code>
						</T.Cell>
						<T.Cell lang={voice.lang}>
							{voice.name}
						</T.Cell>
					</T.Row>
				{/each}
			</T.Body>

			<T.Footer>
				<T.Row>
					<T.Cell colspan={4}>
						Count: {$voices.length}
					</T.Cell>
				</T.Row>
			</T.Footer>

		</T.Root>
	</section>

</main>

<style lang="postcss">
	@reference "tailwindcss";

	main {
		& > section {
			& > header {
				@apply text-2xl mb-2;
			}
		}
	}

	section {
		@apply mb-6;
	}
</style>
