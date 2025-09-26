<script lang="ts">

	import {_} from "$lib/i18n/store"
	import {Category} from "$lib/word/french"
	import * as Select from "$lib/components/ui/select"

	const {
		onchange: _onchange,
		value: _value,
	}: {
		onchange: (c: Category) => any,
		value: Category
	} = $props()

	function _Category(c: Category)
	{
		switch (c)
		{
		case Category.Word:
			return $_.editor.word
		case Category.Noun:
			return $_.linguistics.noun
		}
	}

	let value = $state(_value)
</script>

<Select.Root type="single" bind:value onValueChange={() => _onchange(value)}>

	<Select.Trigger>{_Category(value)}</Select.Trigger>

	<Select.Content>

		<Select.Item value={Category.Word}>
			{$_.editor.word}
		</Select.Item>

		<Select.Item value={Category.Noun}>
			{$_.linguistics.noun}
		</Select.Item>

	</Select.Content>

</Select.Root>
