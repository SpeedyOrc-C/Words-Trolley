import * as kit from "@sveltejs/kit"
import admin from "$lib/admin"

export async function load({locals: {db}, params: {id}})
{
	const {data: {user}} = await admin.auth.admin.getUserById(id)

	if (user == null)
		kit.error(404)

	const {data: sets, error} = await db
		.from("sets")
		.select("id,name")
		.eq("creator", id)

	if (sets == null || error != null)
		kit.error(404)

	return {sets, creator: {id: user.id}}
}
