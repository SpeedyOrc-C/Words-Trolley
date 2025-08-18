<script lang="ts">
	import {_} from "$lib/i18n"
	import {Category} from "$lib/word/french"

	const {
		onchange: _onchange,
		value: _value,
	}: {
		onchange: (c: Category) => any,
		value: Category
	} = $props()

	let value = $state(_value)
</script>

<select bind:value class="input flex-1" onchange={() => _onchange(value)}>

	<option value={Category.Word}>
		{$_.editor.word}
	</option>

	<option value={Category.Noun}>
		{$_.linguistics.noun}
	</option>

</select>
