import {createServerClient} from '@supabase/ssr'
import {type Handle} from '@sveltejs/kit'
import {PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY} from '$env/static/public'
import type {Database} from "$lib/service/types"
import {Service} from '$lib/service'

export const handle: Handle = async ({event, resolve}) =>
{
	const cookieLanguage = event.cookies.get("language")

	event.locals.acceptLanguage =
		cookieLanguage ?? event.request.headers.get("Accept-Language")

	if (event.url.pathname.startsWith("/offline"))
	{
		event.locals.safeGetSession = async () => ({user: null, session: null})
		return resolve(event)
	}

	/**
	 * Creates a Supabase client specific to this server request.
	 *
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.db = createServerClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			/**
			 * SvelteKit's cookies API requires `path` to be explicitly set in
			 * the cookie options. Setting `path` to `/` replicates previous/
			 * standard behavior.
			 */
			setAll: (cookiesToSet) =>
			{
				cookiesToSet.forEach(({name, value, options}) =>
				{
					event.cookies.set(name, value, {...options, path: '/'})
				})
			},
		},
	})

	event.locals.service = new Service(event.locals.db)

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
	event.locals.safeGetSession = async () =>
	{
		const {data: {session}} = await event.locals.db.auth.getSession()

		if (! session)
			return {session: null, user: null}

		const {data: {user}, error} = await event.locals.db.auth.getUser()

		if (error)
			// JWT validation has failed
			return {session: null, user: null}

		return {session, user}
	}

	const cookieColourScheme = event.cookies.get("color-scheme")

	return resolve(event, {
		filterSerializedResponseHeaders(name)
		{
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === 'content-range' || name === 'x-supabase-api-version'
		},
		transformPageChunk: ({html}) => html
			.replace('%ssr.color-scheme%', cookieColourScheme == "dark" ? "dark" : "")
			.replace("%ssr.language%", cookieLanguage ?? "")
	})
}
