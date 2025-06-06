import {createClient} from "@supabase/supabase-js"
import {PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY} from "$env/static/public"
import type {Database} from "$lib/database.types"

export const db = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
