<script lang="ts">
	import * as Select from "$lib/components/ui/select"
	import {_} from "$lib/i18n/store"
	import {WordType} from "$lib/word/types"

	let {value = $bindable(), onchange = undefined}: {
		value: WordType
		onchange?: ((t: WordType) => any)
	} = $props()

	const onValueChange = onchange as ((t: string) => any) | undefined

	function _WordType(t: WordType): string
	{
		switch (t)
		{
		case WordType.Simple:
			return $_.WordType.Simple
		case WordType.English:
			return $_.WordType.English
		case WordType.Mandarin:
			return $_.WordType.Mandarin
		case WordType.Japanese:
			return $_.WordType.Japanese
		case WordType.French:
			return $_.WordType.French
		case WordType.German:
			return $_.WordType.German
		case WordType.Egyptian:
			return $_.WordType.Egyptian
		}
	}
</script>

<Select.Root bind:value {onValueChange} type="single">

	<Select.Trigger>{_WordType(value)}</Select.Trigger>

	<Select.Content>

		<Select.Item value={WordType.English}>
			{$_.WordType.English}
		</Select.Item>

		<Select.Item value={WordType.Japanese}>
			{$_.WordType.Japanese}
		</Select.Item>

		<Select.Item value={WordType.French}>
			{$_.WordType.French}
		</Select.Item>

		<Select.Item value={WordType.Mandarin}>
			{$_.WordType.Mandarin}
		</Select.Item>

		<Select.Item value={WordType.German}>
			{$_.WordType.German}
		</Select.Item>

		<Select.Separator/>

		<Select.Item value={WordType.Egyptian}>
			{$_.WordType.Egyptian}
		</Select.Item>

		<Select.Separator/>

		<Select.Item value={WordType.Simple}>
			{$_.WordType.Simple}
		</Select.Item>

	</Select.Content>

</Select.Root>
