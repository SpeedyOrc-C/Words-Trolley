<script lang="ts">
	import {_, language} from "$lib/i18n/store"
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import * as T from "$lib/components/ui/table"
	import {Phoneme} from "$lib/word/egyptian"
	import {g} from "$lib/word/egyptian/hieroglyphs"
	import {Phoneme2Egyptology} from "$lib/word/egyptian/transliteration/egyptology"
	import {Language} from "$lib/i18n/Language"

	const pronunciations = [
		"ʔ", "j", "j", "ʕ", "w", "b", "p", "f", "m", "n", "r",
		"h","ħ","x","ç","s","z","ʃ","k","g","q","t","c","d","ɟ",
	]

	const t = $derived($_.learning_resources.egyptian.alphabet.inner)
</script>

<svelte:head>
	<title>{t.title}</title>
	<meta name="description" content={t.meta_description}/>
</svelte:head>

<header class="p-4 text-center text-3xl">
	{t.title}
</header>

<main class="mx-auto p-4 w-full max-w-xl">

	<div class="mx-auto max-w-sm flex gap-4 break-after-page">
		{#snippet header()}
			<T.Header>
				<T.Row>
					<T.Head class="text-center">
						<span style="writing-mode: vertical-rl">
							{$_.linguistics.ipa}
						</span>
					</T.Head>
					<T.Head class="text-center">
						<span style="writing-mode: vertical-rl">
							{t.letter}
						</span>
					</T.Head>
					<T.Head class="text-center">
						<span style="writing-mode: vertical-rl">
							{$_.egyptian.transliteration.gardiner}
						</span>
					</T.Head>
				</T.Row>
			</T.Header>
		{/snippet}

		<T.Root>

			{@render header()}

			<T.Body>
				{#each Object.entries(Phoneme).slice(0, 13) as [_, phoneme], i}
					<T.Row>
						<T.Cell class="text-3xl text-center">
							{pronunciations[i]}
						</T.Cell>
						<T.Cell class="text-3xl text-center">
							<EgyptianText t={[g(phoneme)]}/>
						</T.Cell>
						<T.Cell class="text-3xl text-center font-egy-trans">
							{Phoneme2Egyptology[phoneme]}
						</T.Cell>
					</T.Row>
				{/each}
			</T.Body>

		</T.Root>

		<T.Root>

			{@render header()}

			<T.Body>
				{#each Object.entries(Phoneme).slice(13) as [_, phoneme], i}
					<T.Row>
						<T.Cell class="text-3xl text-center">
							{pronunciations[13 + i]}
						</T.Cell>
						<T.Cell class="text-3xl text-center">
							<EgyptianText t={[g(phoneme)]}/>
						</T.Cell>
						<T.Cell class="text-3xl text-center font-egy-trans">
							{Phoneme2Egyptology[phoneme]}
						</T.Cell>
					</T.Row>
				{/each}
			</T.Body>

		</T.Root>

	</div>

	<div class="h-4"></div>

	<section>
		{#snippet P(p: string)}
			<EgyptianText t={[g(p)]}/>
		{/snippet}

		{#if $language == Language.ZhCn}

			<header class="text-xl font-bold">
				注意
			</header>
			<p>
				/l/ 音用
				<span class="text-nowrap">
					{@render P(Phoneme.n)} /n/ 或
					{@render P(Phoneme.r)} /r/ 表示，
				</span>
				大概是因为字母表所基于的方言把 /l/ 合并进了 /n/ 或 /r/。
			</p>
			<p>
				在僧侣体（行书）中，
				<span class="text-nowrap">
					{@render P(Phoneme.y)} /j/ 和
					{@render P(Phoneme.w)} /w/
				</span>
				通常简写为
				<span class="text-nowrap">
					{@render P("𓏭")} 和
					{@render P("𓏲")}
				</span>
				。
			</p>
			<p>
				如果 /j/ 音在词首，或在重读元音后面，则会写作
				<EgyptianText t={[g(Phoneme.i)]}/>。
			</p>
			<p>
				如果 /j/ 音在重读元音前面，则会写作
				<EgyptianText t={[g(Phoneme.y)]}/>。
			</p>
			<p>
				在中古埃及语中，
				<EgyptianText t={[g(Phoneme.z)]}/> /z/
				的发音变成了 /s/，因此
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.s)]}/> 和
					<EgyptianText t={[g(Phoneme.z)]}/>
				</span>
				可以互换使用。
				<EgyptianText t={[g(Phoneme.i)]}/>
				的发音也变成了 /ʔ/。
			</p>
			<p>
				在晚期埃及语中，除了
				<EgyptianText t={[g(Phoneme.i)]}/> /j/
				，还有
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> /t/、
					<EgyptianText t={[g(Phoneme.r)]}/> /r/、和
					<EgyptianText t={[g(Phoneme.w)]}/> /w/
				</span>
				在重读元音后面都变成了 /ʔ/。
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.c)]}/> /c/ 和
					<EgyptianText t={[g(Phoneme.j)]}/> /ɟ/
				</span>
				经常被合并到
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> /t/ 和
					<EgyptianText t={[g(Phoneme.d)]}/> /d/
				</span>
				中。
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.d)]}/> /d/、
					<EgyptianText t={[g(Phoneme.j)]}/> /ɟ/、和
					<EgyptianText t={[g(Phoneme.g)]}/> /g/
				</span>
				逐渐被合并到
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> /t/、
					<EgyptianText t={[g(Phoneme.c)]}/> /c/、和
					<EgyptianText t={[g(Phoneme.k)]}/> /k/
				</span>
				中。
			</p>
		{:else}

			<header class="text-xl font-bold">
				Note
			</header>
			<p>
				Sound /l/ is written as either
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.n)]}/> /n/ or
					<EgyptianText t={[g(Phoneme.r)]}/> /r/,
				</span>
				probably because the alphabet was created based on a dialect
				whose /l/ was merged into /n/ or /r/.
			</p>
			<p>
				In hieratic script,
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.y)]}/> /j/ and
					<EgyptianText t={[g(Phoneme.w)]}/> /w/
				</span>
				are usually abbreviated as
				<span class="text-nowrap">
					<EgyptianText t={[g("𓏭")]}/> and
					<EgyptianText t={[g("𓏲")]}/>
				</span>
				respectively.
			</p>
			<p>
				<EgyptianText t={[g(Phoneme.i)]}/> will be written if the /j/ sound
				is at the beginning of a word, or it’s after a stressed vowel.
			</p>
			<p>
				<EgyptianText t={[g(Phoneme.y)]}/> will be written if the /j/ sound
				is before a stressed vowel.
			</p>
			<p>
				In Middle Egyptian, pronunciation of
				<EgyptianText t={[g(Phoneme.z)]}/> /z/
				became /s/, so that
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.s)]}/> and
					<EgyptianText t={[g(Phoneme.z)]}/>
				</span>
				can be used interchangeably. Pronunciation of
				<EgyptianText t={[g(Phoneme.i)]}/>
				became /ʔ/ as well.
			</p>
			<p>
				In Late Egyptian, not only
				<EgyptianText t={[g(Phoneme.i)]}/> /j/
				but also
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> /t/,
					<EgyptianText t={[g(Phoneme.r)]}/> /r/, and
					<EgyptianText t={[g(Phoneme.w)]}/> /w/
				</span>
				became pronounced as /ʔ/ after a stressed vowel.
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.c)]}/> /c/ and
					<EgyptianText t={[g(Phoneme.j)]}/> /ɟ/
				</span>
				were often merged into
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> /t/ and
					<EgyptianText t={[g(Phoneme.d)]}/> /d/
				</span>
				respectively.
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.d)]}/> /d/,
					<EgyptianText t={[g(Phoneme.j)]}/> /ɟ/, and
					<EgyptianText t={[g(Phoneme.g)]}/> /g/
				</span>
				were gradually being merged into
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> /t/,
					<EgyptianText t={[g(Phoneme.c)]}/> /c/, and
					<EgyptianText t={[g(Phoneme.k)]}/> /k/
				</span>
				respectively.
			</p>

		{/if}
	</section>

</main>

<style lang="postcss">
	@reference "tailwindcss";

	p {
		@apply my-3;
	}
</style>