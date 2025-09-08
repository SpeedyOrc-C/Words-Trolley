<script lang="ts">
	const {data} = $props()
	const {errorCode} = data
</script>

<p>
	Authentication Error
</p>

<p>
	<code>{errorCode}</code>
</p>
