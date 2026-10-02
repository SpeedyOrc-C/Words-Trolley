<script lang="ts">
	import {_, language} from "#lib/i18n/store.ts"
	import EgyptianText from "#lib/components/EgyptianText.svelte"
	import * as T from "#lib/components/ui/table/index.ts"
	import {Phoneme} from "#lib/word/egyptian/index.ts"
	import {g} from "#lib/word/egyptian/hieroglyphs/index.ts"
	import {Phoneme2Egyptology} from "#lib/word/egyptian/transliteration/egyptology.ts"
	import {Language} from "#lib/i18n/Language.ts"

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
						<T.Cell class="text-3xl text-center">
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
						<T.Cell class="text-3xl text-center">
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
				<span class="phoneme">l</span> 音用
				<span class="text-nowrap">
					{@render P(Phoneme.n)} <span class="phoneme">n</span> 或
					{@render P(Phoneme.r)} <span class="phoneme">r</span> 表示，
				</span>
				大概是因为字母表所基于的方言把 <span class="phoneme">l</span> 合并进了 <span class="phoneme">n</span> 或 <span class="phoneme">r</span>。
			</p>
			<p>
				在僧侣体（行书）中，
				<span class="text-nowrap">
					{@render P(Phoneme.y)} <span class="phoneme">j</span> 和
					{@render P(Phoneme.w)} <span class="phoneme">w</span>
				</span>
				通常简写为
				<span class="text-nowrap">
					{@render P("𓏭")} 和
					{@render P("𓏲")}
				</span>
				。
			</p>
			<p>
				如果 <span class="phoneme">j</span> 音在词首，或在重读元音后面，则会写作
				<EgyptianText t={[g(Phoneme.i)]}/>。
			</p>
			<p>
				如果 <span class="phoneme">j</span> 音在重读元音前面，则会写作
				<EgyptianText t={[g(Phoneme.y)]}/>。
			</p>
			<p>
				在中古埃及语中，
				<EgyptianText t={[g(Phoneme.z)]}/> <span class="phoneme">z</span>
				的发音变成了 <span class="phoneme">s</span>，因此
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.s)]}/> 和
					<EgyptianText t={[g(Phoneme.z)]}/>
				</span>
				可以互换使用。
				<EgyptianText t={[g(Phoneme.i)]}/>
				的发音也变成了 <span class="phoneme">ʔ</span>。
			</p>
			<p>
				在晚期埃及语中，除了
				<EgyptianText t={[g(Phoneme.i)]}/> <span class="phoneme">j</span>
				，还有
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> <span class="phoneme">t</span>、
					<EgyptianText t={[g(Phoneme.r)]}/> <span class="phoneme">r</span>、和
					<EgyptianText t={[g(Phoneme.w)]}/> <span class="phoneme">w</span>
				</span>
				在重读元音后面都变成了 <span class="phoneme">ʔ</span>。
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.c)]}/> <span class="phoneme">c</span> 和
					<EgyptianText t={[g(Phoneme.j)]}/> <span class="phoneme">ɟ</span>
				</span>
				经常被合并到
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> <span class="phoneme">t</span> 和
					<EgyptianText t={[g(Phoneme.d)]}/> <span class="phoneme">d</span>
				</span>
				中。
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.d)]}/> <span class="phoneme">d</span>、
					<EgyptianText t={[g(Phoneme.j)]}/> <span class="phoneme">ɟ</span>、和
					<EgyptianText t={[g(Phoneme.g)]}/> <span class="phoneme">g</span>
				</span>
				逐渐被合并到
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> <span class="phoneme">t</span>、
					<EgyptianText t={[g(Phoneme.c)]}/> <span class="phoneme">c</span>、和
					<EgyptianText t={[g(Phoneme.k)]}/> <span class="phoneme">k</span>
				</span>
				中。
			</p>
		{:else}

			<header class="text-xl font-bold">
				Note
			</header>
			<p>
				Sound <span class="phoneme">l</span> is written as either
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.n)]}/> <span class="phoneme">n</span> or
					<EgyptianText t={[g(Phoneme.r)]}/> <span class="phoneme">r</span>,
				</span>
				probably because the alphabet was created based on a dialect
				whose <span class="phoneme">l</span> was merged into <span class="phoneme">n</span> or <span class="phoneme">r</span>.
			</p>
			<p>
				In hieratic script,
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.y)]}/> <span class="phoneme">j</span> and
					<EgyptianText t={[g(Phoneme.w)]}/> <span class="phoneme">w</span>
				</span>
				are usually abbreviated as
				<span class="text-nowrap">
					<EgyptianText t={[g("𓏭")]}/> and
					<EgyptianText t={[g("𓏲")]}/>
				</span>
				respectively.
			</p>
			<p>
				<EgyptianText t={[g(Phoneme.i)]}/> will be written if the <span class="phoneme">j</span> sound
				is at the beginning of a word, or it’s after a stressed vowel.
			</p>
			<p>
				<EgyptianText t={[g(Phoneme.y)]}/> will be written if the <span class="phoneme">j</span> sound
				is before a stressed vowel.
			</p>
			<p>
				In Middle Egyptian, pronunciation of
				<EgyptianText t={[g(Phoneme.z)]}/> <span class="phoneme">z</span>
				became <span class="phoneme">s</span>, so that
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.s)]}/> and
					<EgyptianText t={[g(Phoneme.z)]}/>
				</span>
				can be used interchangeably. Pronunciation of
				<EgyptianText t={[g(Phoneme.i)]}/>
				became <span class="phoneme">ʔ</span> as well.
			</p>
			<p>
				In Late Egyptian, not only
				<EgyptianText t={[g(Phoneme.i)]}/> <span class="phoneme">j</span>
				but also
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> <span class="phoneme">t</span>,
					<EgyptianText t={[g(Phoneme.r)]}/> <span class="phoneme">r</span>, and
					<EgyptianText t={[g(Phoneme.w)]}/> <span class="phoneme">w</span>
				</span>
				became pronounced as <span class="phoneme">ʔ</span> after a stressed vowel.
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.c)]}/> <span class="phoneme">c</span> and
					<EgyptianText t={[g(Phoneme.j)]}/> <span class="phoneme">ɟ</span>
				</span>
				were often merged into
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> <span class="phoneme">t</span> and
					<EgyptianText t={[g(Phoneme.d)]}/> <span class="phoneme">d</span>
				</span>
				respectively.
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.d)]}/> <span class="phoneme">d</span>,
					<EgyptianText t={[g(Phoneme.j)]}/> <span class="phoneme">ɟ</span>, and
					<EgyptianText t={[g(Phoneme.g)]}/> <span class="phoneme">g</span>
				</span>
				were gradually being merged into
				<span class="text-nowrap">
					<EgyptianText t={[g(Phoneme.t)]}/> <span class="phoneme">t</span>,
					<EgyptianText t={[g(Phoneme.c)]}/> <span class="phoneme">c</span>, and
					<EgyptianText t={[g(Phoneme.k)]}/> <span class="phoneme">k</span>
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

	.phoneme {
		&::before, &::after {
			content: "/";
		}
	}
</style>
