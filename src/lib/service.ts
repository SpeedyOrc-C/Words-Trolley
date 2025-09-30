import type {SupabaseClient} from "@supabase/supabase-js"
import type {Database, Json} from "./database.types"
import type {Language} from "./i18n/Language"
import type {Word} from "./word"

export class Service
{
   readonly WordSet: WordSet
   readonly Creator: Creator

   constructor(readonly db: SupabaseClient<Database>)
   {
      this.WordSet = new WordSet(db)
      this.Creator = new Creator(db)
   }
}

class Creator
{
   constructor(private readonly db: SupabaseClient<Database>) { }

   async Get(id: string)
   {
      const {data, error} = await this.db
         .from("profiles")
         .select("*")
         .eq("id", id)
         .single()

      return error ?? data
   }
}

class WordSet
{
   constructor(private readonly db: SupabaseClient<Database>) { }

   async Get(id: string)
   {
      const {data, error} = await this.db
         .from("sets")
         .select("*")
         .eq("id", id)
         .single()

      return error ?? data
   }

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

   async Search(query: string)
   {
      let _query = query.trim()

      if (! _query.startsWith("%"))
         _query = "%" + _query

      if (! _query.endsWith("%"))
         _query = _query + "%"

      const {data, error} = await this.db
         .from("sets")
         .select("id,name,language,creator,origin")
         .ilike("name", _query)

      if (error)
         return error

      return data
   }
}
