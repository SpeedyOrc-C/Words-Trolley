import type {SupabaseClient} from "@supabase/supabase-js"
import type {Database, Json} from "./database.types"
import type {Language} from "./i18n/Language"
import type {Word} from "./word"

export class Service
{
   readonly WordSet: WordSet

   constructor(readonly db: SupabaseClient<Database>)
   {
      this.WordSet = new WordSet(db)
   }
}

class WordSet
{
   constructor(private readonly db: SupabaseClient<Database>) { }

   async Save(id: string, words: Word[])
   {
      const {error} = await this.db
         .from("sets")
         .update({words: words as Json})
         .eq("id", id)
         .single()

      if (error)
         return error
   }

   async Delete(id: string)
   {
      const {error} = await this.db
         .from("sets")
         .delete()
         .eq("id", id)
         .single()

      if (error)
         return error
   }

   async Rename(id: string, newName: string)
   {
      const {error} = await this.db
         .from("sets")
         .update({name: newName})
         .eq("id", id)
         .single()

      if (error)
         return error
   }

   async ChangeMainLanguage(id: string, language: Language | null)
   {
      const {error} = await this.db
         .from("sets")
         .update({language})
         .eq("id", id)
         .single()

      if (error)
         return error
   }

   /**
    * @returns ID of the new word set
    */
   async Fork(id: string)
   {
      const {data, error} = await this.db
         .from("sets")
         .select("*")
         .eq("id", id)
         .single()

      if (error)
         return error

      const {data: newSet, error: newSetError} = await this.db
         .from("sets")
         .insert({
            origin: id,
            name: data.name,
            words: data.words,
            language: data.language,
         })
         .select("id")
         .single()

      if (newSetError)
         return newSetError

      return newSet.id
   }
}
