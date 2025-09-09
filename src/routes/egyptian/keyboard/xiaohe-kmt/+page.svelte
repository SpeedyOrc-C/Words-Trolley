<script lang="ts">
	import EgyptianGlyph from "$lib/components/EgyptianGlyph.svelte"

	const row1 = [
		["Q", [["𓂸", "𓄛"]]],
		["W", [["𓀯"]]],
		["E", [["𓈉"], ["𓅪"]]],
		["R", [["𓀀", "𓄹"]]],
		["T", [["𓇯"], ["𓈘"], ["𓈇"]]],
		["Y", [["𓏜", "𓋳"]]],
		["U", [["𓈓"]]],
		["I", [["𓊖", "𓈐"], ["𓆙"]]],
		["O", [["𓇳", "𓇹"], ["𓁻"]]],
		["P", [["𓀭"]]],
	] as const

	const row2 = [
		["A", [["𓆟"]]],
		["S", [["𓍢"]]],
		["D", [["𓀿"], ["𓌪"]]],
		["F", [["𓀢", "𓁏",], ["𓀜"]]],
		["G", [["𓀙", "𓌙"], ["𓇠"]]],
		["H", [["𓊮"]]],
		["J", [["𓈔"]]],
		["K", [["𓀁"]]],
		["L", [["𓀘", "𓀉"]]],
	]

	const row3 = [
		["Z", [["𓂻", "𓀔"]]],
		["X", [["𓏴", "𓇼"]]],
		["C", [["𓆰"]]],
		["V", [["𓊛"]]],
		["B", [["𓏒"]]],
		["N", [["𓁐", "𓃒"]]],
		["M", [["𓆭"]]],
	]
</script>

<main class="overflow-auto">

	<div class="inline-block">
		<div class="m-2 flex flex-col gap-2">
			{#each [row1, row2, row3] as row, i}
				<div class="flex gap-2">
					{#each row as [letter, detRows]}
						<div class="key">
							<div class="letter">
								{letter}
							</div>
							<div class="det-col">
								{#each detRows as detRow}
									<div class="det-row">
										{#each detRow as det}
											<EgyptianGlyph lineHeight={50} g={det}/>
										{/each}
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{/each}

		</div>
	</div>

</main>

<style>
	@reference "tailwindcss";

	.key {
		@apply inline-block overflow-hidden relative outline-1 w-30 h-30;
	}

	.letter {
		@apply absolute flex items-center justify-around text-8xl w-full h-full opacity-10;
	}

	.det-col {
		@apply h-full flex flex-col items-center;
	}

	.det-row {
		@apply h-full flex items-center justify-evenly gap-4;
		font-size: 2.5rem;
	}
</style>
