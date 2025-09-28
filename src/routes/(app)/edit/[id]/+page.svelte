<script lang="ts">
	import Editor from "$lib/components/editor/Editor.svelte"
	import {Service} from "$lib/service"

	const {data} = $props()
	const {user, db, set: {name, id, origin, words, language, creator}} = $derived(data)
</script>

<Editor
	online {id} {origin} {name} {words} {language} service={new Service(db)}
	isMine={user?.id === creator}
/>
