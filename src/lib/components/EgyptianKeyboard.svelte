<script lang="ts" module>
	const row1 = [
		["Q", "ḳ", "𓈎", -23],
		["W", "w", "𓅱", -10],
		["E", "ꜥ", "𓂝", -30],
		["R", "r", "𓂋", -30],
		["T", "t", "𓏏", -32],
		["Y", "y", "𓇌", -10],
		["U", "ḥ", "𓎛", -10],
		["I", "ỉ", "𓇋", -10],
		["O", "ẖ", "𓄡", -27],
		["P", "p", "𓊪", -23],
	] as const

	const row2 = [
		["A", "ꜣ", "𓄿", -10],
		["S", "s", "𓋴", -12],
		["D", "d", "𓂧", -30],
		["F", "f", "𓆑", -30],
		["G", "g", "𓎼", -23],
		["H", "h", "𓉔", -20],
		["J", "ḏ", "𓆓", -10],
		["K", "k", "𓎡", -27],
		["L", "", "", -0],
	] as const

	const row3 = [
		["Z", "š", "𓈙", -30],
		["X", "ḫ", "𓐍", -23],
		["C", "ṯ", "𓍿", -27],
		["V", "", "", 0],
		["B", "b", "𓃀", -10],
		["N", "n", "𓈖", -32],
		["M", "m", "𓅓", -10],
	] as const
</script>

<!-- https://svgcrop.com -->
<div class="absolute bottom-0 w-full flex flex-col"
	  style="aspect-ratio: 10/3; padding: 0.4vw"
>

	<div class="flex-1 flex">
		{#each row1 as [key, transliteration, glyph, offsetY]}
			<div class="kbd-key bg-accent">
				<div class="letters">
					<code class="transliteration">
						{transliteration}
					</code>
					<code class="key">
						{key}
					</code>
				</div>
				<div class="glyph" style="transform: translateY({offsetY}%)">
					{glyph}
				</div>
			</div>
		{/each}
	</div>

	<div class="flex-1 flex">
		<div class="flex-1"></div>
		{#each row2 as [key, transliteration, glyph, offsetY]}
			<div class="kbd-key bg-accent">
				<div class="letters">
					<code class="transliteration">
						{transliteration}
					</code>
					<code class="key">
						{key}
					</code>
				</div>
				<div class="glyph" style="transform: translateY({offsetY}%)">
					{glyph}
				</div>
			</div>
		{/each}
		<div class="flex-2"></div>
	</div>

	<div class="flex-1 flex">
		<div class="flex-2"></div>
		{#each row3 as [key, transliteration, glyph, offsetY]}
			<div class="kbd-key bg-accent">
				<div class="letters">
					<code class="transliteration">
						{transliteration}
					</code>
					<code class="key">
						{key}
					</code>
				</div>
				<div class="glyph" style="transform: translateY({offsetY}%)">
					<div>{glyph}</div>
				</div>
			</div>
		{/each}
		<div class="flex-7"></div>
	</div>

</div>

<style>
	@reference "tailwindcss";

	.kbd-key {
		@apply flex-3 flex select-none cursor-pointer rounded md:rounded-lg;
		margin: 0.4vw;

		& > .letters {
			@apply flex flex-col justify-between;

			& > code {
				@apply text-center;
				font-size: 2vw;
				margin-left: 0.7vw;
			}

			& > .key {
				@apply opacity-10;
			}
		}

		& > .glyph {
			@apply grow flex items-end justify-around;
			font-size: 4vw;
			font-family: Font_Egyptian;
		}
	}

	:global(svg) {
		@apply mx-auto w-1/2 h-full;
	}
</style>
