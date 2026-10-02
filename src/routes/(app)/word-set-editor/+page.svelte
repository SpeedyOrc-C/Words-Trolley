<script>
    import {_} from "#lib/i18n/store.ts"
    import Editor from "#lib/components/word-set-editor/Editor.svelte"
</script>

<svelte:head>
    <title>{$_.editor._}</title>
</svelte:head>

<Editor online={false}/>
