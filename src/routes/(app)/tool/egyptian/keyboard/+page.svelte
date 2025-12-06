<script lang="ts">
	import EgyptianGlyph from "$lib/components/EgyptianGlyph.svelte"
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import {preferredEgyptianTransliterationDumperForRead, preferredEgyptianTransliterationParserForRead} from "$lib/settings/store/egyptian"
	import {g} from "$lib/word/egyptian/hieroglyphs"
	import {QuickSymbols} from "$lib/word/egyptian/IME"

	const numbers = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"0",
	] as const

	const row1 = [
		["Q", "𓈎", [["𓂸", "𓄛"], ["𓃢", "𓃠"]]],
		["W", "𓅱", [["𓀯"]]],
		["E", "𓂝", [["𓈉"], ["𓅪"]]],
		["R", "𓂋", [["𓄹"]]],
		["T", "𓏏", [["𓈘", "𓈇"]]],
		["Y", "𓇌", [["𓃜", "𓃞"]]],
		["U", "𓈙", [["𓈒", "𓈓"]]],
		["I", "𓇋", [["𓊖", "𓈐"], ["𓆙", "𓆏"]]],
		["O", null, [["𓊗"], ["𓁻", "𓂉"]]],
		["P", "𓊪", [["𓋳"]]],
		["[", null, null],
		["]", null, null],
		["\\", null, null],
	] as const

	const row2 = [
		["A", "𓄿", [["𓆟", "𓆍"]]],
		["S", "𓋴", [["𓍢"]]],
		["D", "𓂧", [["𓀿"], ["𓌪"]]],
		["F", "𓆑", [["𓂡", "𓂢"]]],
		["G", "𓎼", [["𓌙"], ["𓇠", "𓌽"]]],
		["H", "𓉔", [["𓊮"]]],
		["J", "𓆓", [["𓈔"]]],
		["K", "𓎡", [["𓀁"]]],
		["L", "𓎛", [["𓀉"]]],
		[";", null, null],
	] as const

	const row3 = [
		["Z", "𓊃", [["𓂻", "𓀔"]]],
		["X", "𓐍", [["𓏴", "𓏶", "𓇼"]]],
		["C", "𓍿", [["𓆰"]]],
		["V", "𓄡", [["𓊛", "𓊜"], ["𓊝"]]],
		["B", "𓃀", [["𓏐", "𓏑", "𓏒"]]],
		["N", "𓈖", [["𓃒"]]],
		["M", "𓅓", [["𓆭"], ["𓃗", "𓃘"]]],
	] as const
</script>

<main class="m-4 inline-block">

	<div class="m-2 flex flex-col gap-2">

		<div class="flex gap-2">

			{#each numbers as code}

				<div class="key">
					<div class="flex justify-between items-center">
						<div class="text-3xl ml-2 text-foreground/50">
							{code}
						</div>
					</div>
					<div class="flex justify-around text-3xl">
						<EgyptianText t={[g(QuickSymbols[code])]} />
					</div>
				</div>

			{/each}

			<div class="key">
				<div class="flex justify-between items-center">
					<div class="text-3xl ml-2 text-foreground/50">
						-
					</div>
				</div>
				<div class="text-center text-xl">
					横向组合
				</div>
			</div>

			<div class="key">
				<div class="flex justify-between items-center">
					<div class="text-3xl ml-2 text-foreground/50">
						=
					</div>
				</div>
				<div class="text-center text-xl">
					纵向组合
				</div>
			</div>

		</div>

		{#each [row1, row2, row3] as row, i}
			<div class="flex gap-2" style:margin-left="{3*(i+1)}rem">

				{#each row as [code, egyptianLetter, detRows]}
					<div class="key">

						<div class="flex justify-between items-center">
							<div class="text-3xl ml-2 text-foreground/50">
								{code}
							</div>

							{#if i == 0 && code == "O"}
								<div class="mr-2">
									定符模式
								</div>
							{:else if egyptianLetter != null}
								<div class="text-3xl text-amber-700 dark:text-amber-200">
									<EgyptianText t={[g(egyptianLetter)]} />
								</div>
								<div class="text-3xl mr-2 text-blue-800 dark:text-blue-300">
									{$preferredEgyptianTransliterationDumperForRead[egyptianLetter]}
								</div>
							{/if}
						</div>

						{#if i == 0}
							{#if code == "["}
								<div class="text-center text-xl">
									重复上个字并横向组合
								</div>
							{:else if code == "]"}
								<div class="text-center text-xl">
									重复上个字并纵向组合
								</div>
							{:else if code == "\\"}
								<div class="text-center text-xl">
									创建连字
								</div>
							{/if}
						{/if}

						{#if i == 1 && code == ";"}
							<div class="text-center text-xl">
								重复上个字
							</div>
						{:else}
							{#each detRows as detRow}
								<div class="flex flex-wrap justify-evenly items-center text-3xl">
									{#each detRow as det}
										<div>
											<EgyptianText t={[g(det)]} />
										</div>
									{/each}
								</div>
							{/each}
						{/if}

					</div>
				{/each}

			</div>
		{/each}

	</div>

</main>

<style lang="postcss">
	@reference "tailwindcss";

	.key {
		@apply rounded-lg outline-1 w-29 h-29;
	}
</style>
