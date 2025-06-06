import {type Actions, redirect} from "@sveltejs/kit"

export const actions: Actions = {
	do: async ({request, locals: {db}}) =>
	{
		const formData = await request.formData()

		const name = formData.get("name") as string

		const {data, error} = await db
			.from("sets")
			.insert({name})
			.select("id")

		if (error)
		{
			console.error(error)
			redirect(303, "/set/new/error")
		}

		return redirect(303, `/edit/${data[0].id}`)
	}
}
