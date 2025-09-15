import {ValidateWords} from "$lib/word/validate"
import * as kit from "@sveltejs/kit"

export async function load({locals: {db}, params: {id}, depends})
{
	depends("supabase:db:sets")

	const {data} = await db
		.from("sets")
		.select("*")
		.eq("id", id)
		.single()

	if (data == null)
		kit.error(404)

	const {words: rawWords} = data

	const words = ValidateWords(rawWords)

	if (words instanceof TypeError)
		kit.error(409, `Cannot load until this erroneous word set is fixed. ${words.message}`)

	return {set: {...data, words}}
}
