import {ValidateLanguage} from "$lib/i18n/Language"
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
		kit.error(409, `Invalid words: ${words.message}`)

	const language = ValidateLanguage(data.language)

	if (language instanceof TypeError)
		kit.error(409, `Invalid language: ${language.message}`)

	return {set: {...data, words, language}}
}

export const ssr = false
