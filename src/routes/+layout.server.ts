import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = async ({locals: {safeGetSession, acceptLanguage}, cookies}) =>
{
    const {session} = await safeGetSession()
    return {
        session,
        acceptLanguage,
        cookies: cookies.getAll(),
    }
}
