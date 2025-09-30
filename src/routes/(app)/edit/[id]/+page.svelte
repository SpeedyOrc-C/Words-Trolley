<script lang="ts">
	import Editor from "$lib/components/editor/Editor.svelte"

	const {data} = $props()
	const {user, service, set: {name, id, origin, words, language, creator}} = $derived(data)
</script>

<Editor
	online {id} {origin} {name} {words} {language} {service}
	isMine={user?.id === creator}
/>
