import type {Actions} from "@sveltejs/kit"
import * as kit from "@sveltejs/kit"

export const actions: Actions = {
	do: async ({request, locals: {db}}) =>
	{
		const formData = await request.formData()
		const name = formData.get("name") as string

		const {error} = await db
			.from("profiles")
			.insert({name})

		if (error)
			kit.error(500, error.message)

		kit.redirect(303, "/")
	}
}
