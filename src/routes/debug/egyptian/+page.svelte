<script lang="ts">
	import LetterN from "./LetterN.svelte"

	const h = 128
	const g = h * 0.15
</script>

<div class="h-30"></div>

<div
	class="flex gap-2 outline-1 h-20"
	style="height: {h}px; gap: {g}px"
>
	<div style="font-size: {h}px; line-height: 100%">𓅱</div>
	<div style="font-size: {h}px; line-height: 100%">𓋴</div>
	<LetterN/>
	<div style="font-size: {h}px; line-height: 0%" class="flex flex-col align-bottom">
		<div>𓈖</div>
		<div>𓈖</div>
	</div>
	<div style="font-size: {h}px; line-height: 100%">𓂧</div>
	<div style="font-size: {h}px; line-height: 100%">𓎡</div>
</div>

<style>
	* {
		font-family: Font_Egyptian, sans-serif;
	}
</style>
