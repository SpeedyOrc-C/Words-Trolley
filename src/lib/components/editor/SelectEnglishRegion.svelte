<script lang="ts">

	import {_} from "$lib/i18n/store"
	import {Region} from "$lib/word/english"
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
		case Region.GB:
			return $_.english.region.gb
		case Region.US:
			return $_.english.region.us
		}
	}

	let value = $state(_value)
</script>

<Select.Root type="single" bind:value onValueChange={() => _onchange(value)}>

	<Select.Trigger>{_Region(value)}</Select.Trigger>

	<Select.Content>

		<Select.Item value={Region.GB}>
			{$_.english.region.gb}
		</Select.Item>

		<Select.Item value={Region.US}>
			{$_.english.region.us}
		</Select.Item>

	</Select.Content>

</Select.Root>
