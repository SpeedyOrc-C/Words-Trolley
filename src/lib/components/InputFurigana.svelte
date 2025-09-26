<script lang="ts" module>
	function CheckFurigana(text: string, furi: [number, number, string][]): boolean
	{
		if (furi.some(([start, length]) => start + length > text.length))
			return false

		const covered: boolean[] = new Array(text.length).fill(false)

		for (const [start, length] of furi)
			for (let i = start; i < start + length; i += 1)
				if (covered[i])
					return false
				else
					covered[i] = true

		return covered.every(v => v)
	}
</script>

<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {_} from "$lib/i18n/store"
	import {type Furigana, FuriganaTemplateFromWord} from "$lib/word/japanese"

	import SeparatorHorizontal from "@lucide/svelte/icons/separator-horizontal"
	import ArrowUpToLine from "@lucide/svelte/icons/arrow-up-to-line"
	import ArrowDownToLine from "@lucide/svelte/icons/arrow-down-to-line"

	let {
		text,
		value = $bindable([]),
		onchange,
	}: {
		text: string
		value: [number, number, string][] // start, length, furi (partial)
		onchange?: (value: Furigana) => void
	} = $props()

	$effect(() =>
	{
		if (! CheckFurigana(text, value))
		{
			console.warn(
				"Broken furigana, now use default.",
				$state.snapshot(text),
				$state.snapshot(value),
			)

			value = FuriganaTemplateFromWord(text)
			onchange?.(value)
		}
	})

	function MergeIntoAbove(i: number)
	{
		if (i <= 0)
			throw "Cannot merge 1st element."

		const start = value[i - 1][0]
		const length = value[i - 1][1] + value[i][1]
		const furi = value[i - 1][2] + value[i][2]

		value.splice(i - 1, 2, [start, length, furi])
		onchange?.(value)
	}

	function MergeIntoBelow(i: number)
	{
		if (i >= value.length - 1)
			throw "Cannot merge last element."

		const start = value[i][0]
		const length = value[i][1] + value[i + 1][1]
		const furi = value[i][2] + value[i + 1][2]

		value.splice(i, 2, [start, length, furi])
		onchange?.(value)
	}

	function Split(i: number)
	{
		if (value[i][1] <= 1)
			throw "Cannot split element of length 1."

		const head = value.slice(0, i)
		const tail = value.slice(i + 1, value.length)
		const midStart = value[i][0]
		const mid = new Array(value[i][1]).fill(null).map((_, i) => [midStart + i, 1, ""] as [number, number, string])

		mid[0][2] = value[i][2]

		value = [...head, ...mid, ...tail]
		onchange?.(value)
	}
</script>

<div class="flex flex-col gap-1">

	{#each value as [start, length], i}

		<div class="flex items-center gap-1">

			<div lang="ja" class="min-w-10 text-center w-fit">
				{text.slice(start, start + length)}
			</div>

			<Input class="flex-1" bind:value={value[i][2]} onchange={() => onchange?.(value)}/>

			<Button
				size="icon" variant="outline"
				onclick={() => MergeIntoAbove(i)}
				disabled={i === 0}
				title={$_.editor.furigana_editor.merge_into_above}
			>
				<ArrowUpToLine/>
			</Button>

			<Button
				size="icon" variant="outline"
				onclick={() => MergeIntoBelow(i)}
				disabled={i === value.length - 1}
				title={$_.editor.furigana_editor.merge_into_below}
			>
				<ArrowDownToLine/>
			</Button>

			<Button
				size="icon" variant="outline"
				onclick={() => Split(i)}
				disabled={length === 1}
				title={$_.editor.furigana_editor.split}
			>
				<SeparatorHorizontal/>
			</Button>

		</div>

	{/each}

</div>
