import type {Session, SupabaseClient, User} from '@supabase/supabase-js'
import type {Database} from '$lib/service/types'
import type {Service} from '$lib/service'

declare global
{
	namespace App
	{
		// interface Error {}

		interface Locals
		{
			db: SupabaseClient<Database>
			service: Service
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
			session: Session | null
			user: User | null
			acceptLanguage: string | null
		}

		interface PageData
		{
			session: Session | null
		}

		// interface PageState {}

		// interface Platform {}
	}
}

export {}