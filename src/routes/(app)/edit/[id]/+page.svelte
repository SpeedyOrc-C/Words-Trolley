<script lang="ts">
	import Editor from "$lib/editor/Editor.svelte"
	import type {Words} from "$lib"

	const {data} = $props()
	const {user, db, set: {name, id, origin, words: _words, creator}} = $derived(data)
	const words = $derived(_words as Words)
</script>

<Editor
	online {db} {id} {origin} {name} {words}
	isMine={user?.id === creator}
/>
