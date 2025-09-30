import {ValidateWords} from "$lib/word/validate"
import {error} from "@sveltejs/kit"

export async function load({locals: {service}, params: {id}, depends})
{
	depends("supabase:db:sets")

	const word_set = await service.WordSet.Get(id)

	if (word_set instanceof Error)
		error(404)

	const words = ValidateWords(word_set.words)

	if (words instanceof TypeError)
		error(409, `Cannot load until this erroneous word set is fixed. ${words.message}`)

	if (word_set.creator == null)
		return {word_set: {...word_set, words}}

	const creator_profile = await service.Creator.Get(word_set.creator)

	return {
		word_set: {...word_set, words},
		creator_profile: creator_profile instanceof Error ? null : creator_profile
	}
}
