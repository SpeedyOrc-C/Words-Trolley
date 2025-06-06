import {type Actions, redirect} from '@sveltejs/kit'

export const actions: Actions = {
	signup: async ({request, locals: {db}}) =>
	{
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const {error} = await db.auth.signUp({email, password})
		if (error)
		{
			const {code} = error
			redirect(303, typeof code == "string" ? `/auth/error/${code}` : '/auth/error')
		}
		else
		{
			redirect(303, '/onboarding')
		}
	},
	login: async ({request, locals: {db}}) =>
	{
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const {error} = await db.auth.signInWithPassword({email, password})
		if (error)
		{
			const {code} = error
			redirect(303, typeof code == "string" ? `/auth/error/${code}` : '/auth/error')
		}
		else
		{
			redirect(303, '/')
		}
	},
}
