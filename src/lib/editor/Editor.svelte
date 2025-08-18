<script module lang="ts">
	import type {SupabaseClient} from "@supabase/supabase-js"
	import type {Database} from "$lib/database.types"
	import type {Words} from "$lib"

	export type EditorProps = {
		online: boolean,
		db: SupabaseClient<Database>,
		name: string,
		id: string,
		words: Words,
	} | {
		online: false
	}
</script>

<script lang="ts">
	import Editor_ from "./Editor_.svelte"

	const props: EditorProps = $props()
</script>

<div class="relative w-svw h-svh flex flex-col">
	<Editor_ {...props}/>
</div>
