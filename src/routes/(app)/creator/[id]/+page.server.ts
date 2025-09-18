import * as kit from "@sveltejs/kit"

export async function load({locals: {db}, params: {id}})
{
	const {data: sets} = await db
		.from("sets")
		.select("id,name")
		.eq("creator", id)

	if (sets == null)
		kit.error(404)

	const {data: creator} = await db
		.from("profiles")
		.select("*")
		.eq("id", id)
		.single()

	return {sets, creator}
}
