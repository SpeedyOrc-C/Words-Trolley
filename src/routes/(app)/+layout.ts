import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public"
import type {Database} from "$lib/service/types"
import {AutoDetectLanguage} from "$lib/i18n"
import {createBrowserClient, createServerClient, isBrowser} from "@supabase/ssr"
import {redirect} from "@sveltejs/kit"
import type {LayoutLoad} from "./$types"
import {Service} from "$lib/service"

export const load: LayoutLoad = async ({url, data, depends, fetch}) =>
{
	// Set the language based on the Accept-Language header.
	// This is done before components mount, so there's no flicker.
	const acceptLanguage = data.acceptLanguage

	if (acceptLanguage != null)
	{
		const language = acceptLanguage.split(",")[0]
		AutoDetectLanguage(language)
	}

	/**
	 * Declare a dependency so the layout can be invalidated, for example, on
	 * session refresh.
	 */
	depends("supabase:auth")

	const db = isBrowser()
		? createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			global: {
				fetch
			}
		})
		: createServerClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			global: {
				fetch
			},
			cookies: {
				getAll()
				{
					return data.cookies
				}
			}
		})

	const service = new Service(db)

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {data: {session}} = await db.auth.getSession()
	const {data: {user}} = await db.auth.getUser()

	if (user == null)
		return {session, db, service, user, profile: null}

	const _profile = await service.Profile.Get(user.id)
	const profile = _profile instanceof Error ? null : _profile

	// If logged in but has no profile, redirect to onboarding.
	if (profile == null && !url.pathname.startsWith("/onboarding"))
		redirect(303, "/onboarding")

	return {session, db, service, user, profile}
}
