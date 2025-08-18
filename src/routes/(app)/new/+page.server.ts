import {type Actions, redirect} from "@sveltejs/kit"

export const actions: Actions = {
	do: async ({request, locals: {db}}) =>
	{
		const formData = await request.formData()

		const name = formData.get('name') as string
		const words: never[] = []

		const {data, error} = await db.from("sets").insert({name, words}).select()

		if (error)
		{
			console.error(error)
			redirect(303, "/set/new/error")
		}

		return redirect(303, `/edit/${data[0].id}`)
	}
}
