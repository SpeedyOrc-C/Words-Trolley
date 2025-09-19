<script lang="ts">
	import Editor from "$lib/components/editor/Editor.svelte"

	import type {Word} from "$lib/word"

	const {data} = $props()
	const {user, db, set: {name, id, origin, words, language, creator}} = $derived(data)
</script>

<Editor
	online {db} {id} {origin} {name} {words} {language}
	isMine={user?.id === creator}
/>
