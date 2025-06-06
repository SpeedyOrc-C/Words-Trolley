import {error} from '@sveltejs/kit'

export async function load({locals: {service}})
{
   const saved_word_sets = await service.Save.GetIndex()

   if (saved_word_sets instanceof Error)
      error(500, saved_word_sets.message)

   return {saved_word_sets}
}
