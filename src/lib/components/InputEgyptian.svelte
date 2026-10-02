<script lang="ts">
	import {EgyptianImeMode} from "../settings"
	import {settings} from "../settings/store"
	import {type Hieroglyphs} from "../word/egyptian/hieroglyphs"
	import * as IME from "../word/egyptian/IME"
	import {focusedEgyptianInput, FocusedEgyptianInput as FocusedEgyptianInputProxy} from "../word/egyptian/IME/store"
	import {onMount} from "svelte"
	import InputEgyptianBufferView from "./InputEgyptianBufferView.svelte"
	import InputEgyptianOperator from "./InputEgyptianOperator.svelte"

	let {
		value = $bindable([]),
		onchange,
		editing: _editing = false,
		InsertSymbolAtCursor = $bindable(() => {}),
		color = "inherit",
		height = 26
	}: {
		value?: Hieroglyphs[]
		editing?: boolean
		onchange?: (hie: Hieroglyphs[]) => void
		InsertSymbolAtCursor?: (symbol: Hieroglyphs) => void
		color?: string
		height?: number
	} = $props()

	const symbol = Symbol()

	let editing = $derived(_editing)
	let ctx: IME.State = $state({cursor: value.length, value: value})

	const proxy = new FocusedEgyptianInputProxy(symbol, () => ctx, _ctx => (ctx = _ctx))

	$effect(() => {value = ctx.value})
	$effect(() => {ctx.value = value})

	onMount(() =>
	{
		const unsubscribe = focusedEgyptianInput.subscribe(OnFocusedEgyptianInputChange)

		return () =>
		{
			unsubscribe()

			if ($focusedEgyptianInput == proxy)
				focusedEgyptianInput.set(null)
		}
	})

	function OnFocusedEgyptianInputChange(newProxy: null | FocusedEgyptianInputProxy)
	{
		if (newProxy == null)
		{
			editing = false
			return
		}

		editing = newProxy.Symbol == proxy.Symbol
	}

	function OnFocus()
	{
		focusedEgyptianInput.set(proxy)
	}

	function OnSubmit()
	{
		focusedEgyptianInput.set(null)
		onchange?.(ctx.value)
	}
</script>

<div
	class="flex flex-col gap-1"
	style:--height="{height}px"
	style:--height-10="{height * 0.1}px"
>
	<InputEgyptianBufferView {OnFocus} bind:ctx {color} {editing} {height} />

	{#if $settings.Egyptian.Mode == EgyptianImeMode.TextField && editing}
		<InputEgyptianOperator bind:ctx {OnSubmit} />
	{/if}
</div>
