import {PUBLIC_SUPABASE_URL} from "$env/static/public"
import {SUPABASE_SERVICE_ROLE_KEY} from "$env/static/private"
import {createClient} from "@supabase/supabase-js"
import type {Database} from "$lib/database.types"

const admin = createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
	auth: {autoRefreshToken: false, persistSession: false}
})

export default admin
