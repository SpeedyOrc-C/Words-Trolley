<script lang="ts">
	import Editor from "$lib/editor/Editor.svelte"
	import type {Words} from "$lib"

	const {data} = $props()
	const {db, set: {name, id, words: _words}} = $derived(data)
	const words = $derived(_words as Words)
</script>

<Editor online {db} {id} {name} {words}/>
