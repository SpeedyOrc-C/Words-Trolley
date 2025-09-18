import {ValidateWords} from "$lib/word/validate"
import {error} from "@sveltejs/kit"

export async function load({locals: {db}, params: {id}, depends})
{
	depends("supabase:db:sets")

	const {data: word_set} = await db
		.from("sets")
		.select("*")
		.eq("id", id)
		.single()

	if (word_set == null)
		error(404)

	const words = ValidateWords(word_set.words)

	if (words instanceof TypeError)
		error(409, `Cannot load until this erroneous word set is fixed. ${words.message}`)

	if (word_set.creator == null)
		return {word_set: {...word_set, words}}

	const {data: creator_profile} = await db
		.from("profiles")
		.select("*")
		.eq("id", word_set.creator)
		.single()

	return {word_set: {...word_set, words}, creator_profile}
}
