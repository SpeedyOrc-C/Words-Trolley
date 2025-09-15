<script lang="ts" module>
	import type {Word} from "$lib/word"
	import type {SupabaseClient} from "@supabase/supabase-js"
	import type {Database} from "$lib/database.types"

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
