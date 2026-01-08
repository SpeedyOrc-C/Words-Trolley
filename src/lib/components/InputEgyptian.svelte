<script lang="ts">
	import {_} from "$lib/i18n/store"
	import {type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
	import * as IME from "$lib/word/egyptian/IME"
	import {onMount} from "svelte"

	import EgyptianEditorView from "./EgyptianEditorView.svelte"
	import InputEgyptianTextField from "./InputEgyptianTextField.svelte"
	import {settings} from "$lib/settings/store"
	import {EgyptianImeMode} from "$lib/settings"
	import {focusedEgyptianInput, FocusedEgyptianInput as FocusedEgyptianInputProxy} from "$lib/word/egyptian/IME/store"

	let {
		value = $bindable([]),
		onchange,
		editing: _editing = false,
		InsertSymbolAtCursor = $bindable(() => {}),
		color = "inherit",
		height = 26,
	}: {
		value?: Hieroglyphs[]
		editing?: boolean
		onchange?: (hie: Hieroglyphs[]) => void
		InsertSymbolAtCursor?: (symbol: Hieroglyphs) => void
		color?: string
		height?: number
	} = $props()

	const symbol = Symbol()

	let editing = $state(_editing)
	let ctx: IME.State = $state({cursor: value.length, value: value})

	const proxy = new FocusedEgyptianInputProxy(symbol, () => ctx, _ctx => (ctx = _ctx))

	$effect(() => {value = ctx.value})

	// TODO)) Insert symbol at cursor

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
	style:--height-10="{height * 0.1}px"
	style:--height="{height}px"
>
	<EgyptianEditorView {editing} {ctx} {height} {color} {OnFocus} />

	{#if $settings.Egyptian.Mode == EgyptianImeMode.TextField && editing}
		<InputEgyptianTextField bind:ctx {OnSubmit} />
	{/if}
</div>
