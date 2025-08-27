<script lang="ts" module>
	import type {SupabaseClient} from "@supabase/supabase-js"
	import type {Database} from "$lib/database.types"
	import type {Word} from "$lib"

	export type EditorProps = {
		online: true,
		db: SupabaseClient<Database>,
		name: string,
		id: string,
		origin: string | null,
		isMine: boolean,
		words: Word[],
	} | {
		online: false
	}
</script>

<script lang="ts">
	import Editor_ from "./Editor_.svelte"

	const props: EditorProps = $props()
</script>

<Editor_ {...props}/>
