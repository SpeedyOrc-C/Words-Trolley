import {defineEnvVars} from "@sveltejs/kit/env"

export const variables = defineEnvVars({
	PUBLIC_SUPABASE_URL: {public: true},
	PUBLIC_SUPABASE_ANON_KEY: {public: true}
})
