<script lang="ts">

	import {_} from "$lib/i18n/store"
	import {Region} from "$lib/word/mandarin"
	import * as Select from "$lib/components/ui/select"

	const {
		onchange: _onchange,
		value: _value,
	}: {
		onchange: (c: Region) => any,
		value: Region
	} = $props()

	function _Region(r: Region)
	{
		switch (r)
		{
		case Region.PRC:
			return $_.mandarin.region.prc
		case Region.ROC:
			return $_.mandarin.region.roc
		}
	}

	let value = $state(_value)
</script>

<Select.Root type="single" bind:value onValueChange={() => _onchange(value)}>

	<Select.Trigger>{_Region(value)}</Select.Trigger>

	<Select.Content>

		<Select.Item value={Region.PRC}>
			{$_.mandarin.region.prc}
		</Select.Item>

		<Select.Item value={Region.ROC}>
			{$_.mandarin.region.roc}
		</Select.Item>

	</Select.Content>

</Select.Root>
