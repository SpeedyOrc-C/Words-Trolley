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
            console.error(error)
            redirect(303, '/auth/error')
        }
        else
        {
            redirect(303, '/')
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
            console.error(error)
            redirect(303, '/auth/error')
        }
        else
        {
            redirect(303, '/')
        }
    },
}