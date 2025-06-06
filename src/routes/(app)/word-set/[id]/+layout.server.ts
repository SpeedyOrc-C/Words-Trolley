import {error} from "@sveltejs/kit"

export async function load({locals: {service}, params: {id}, depends, setHeaders})
{
	depends("supabase:db:sets")

	const word_set = await service.WordSet.Get(id)

	if (word_set instanceof TypeError)
		error(409, `Cannot load until this erroneous word set is fixed. ${word_set.message}`)

	if (word_set instanceof Error)
		error(404)

	const saved = await service.Save.Get(id)

	setHeaders({
		"cache-control": "private, max-age=3600, must-revalidate",
	})

	if (word_set.creator == null)
		return {saved, word_set}

	const creator_profile = await service.Creator.Get(word_set.creator)

	return {
		saved,
		word_set,
		creator_profile: creator_profile instanceof Error ? null : creator_profile
	}
}
