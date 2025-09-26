<script lang="ts">
	import {_} from "$lib/i18n/store"

	const {data} = $props()
	const {errorCode} = data
</script>

<p>
	{$_.error.auth._}
</p>

<p>
	{$_.error.code}
	<code>{errorCode}</code>
</p>
