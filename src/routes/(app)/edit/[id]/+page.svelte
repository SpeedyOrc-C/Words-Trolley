<script lang="ts">
	import {_} from "$lib/i18n/store"
	import Editor from "$lib/components/word-set-editor/Editor.svelte"

	const {data} = $props()
	const {user, service, set: {name, id, origin, words, language, creator}} = $derived(data)

	let saved = $state(true)
</script>

<svelte:head>
	<title>{(saved ? $_.editor.title.edit : $_.editor.title.unsaved)(name)}</title>
</svelte:head>

<Editor
	online {id} {origin} {name} {words} {language} {service}
	isMine={user?.id === creator}
	OnSavedStatusChange={status => saved = status}
/>
