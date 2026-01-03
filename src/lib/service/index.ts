import type {SupabaseClient} from "@supabase/supabase-js"
import type {Database, Json} from "../database.types"
import type {Language} from "../i18n/Language"
import type {Word} from "../word"
import {ValidateWords} from "../word/validate"

export class Service
{
   readonly Profile: Profile
   readonly WordSet: WordSet
   readonly Creator: Creator
   readonly Save: Save

   constructor(readonly db: SupabaseClient<Database>)
   {
      this.Profile = new Profile(db)
      this.WordSet = new WordSet(db)
      this.Creator = new Creator(db)
      this.Save = new Save(db)
   }
}

class Profile
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

   async PutName(id: string, name: string)
   {
      const {error} = await this.db
         .from("profiles")
         .update({name})
         .eq("id", id)
         .single()

      if (error)
         return error
   }
}

class Save
{
   constructor(private readonly db: SupabaseClient<Database>) { }

   async Get(wordSetId: string)
   {
      const {data} = await this.db
      .from("saves")
      .select("*")
      .eq("set", wordSetId)
      .single()

      return data != null
   }

   async GetIndex()
   {
      const {data, error} = await this.db
         .from("saves")
         .select("sets(id,name,language)")

      return error ?? data.map(item => item.sets)
   }

   async Put(wordSetId: string)
   {
      const {error} = await this.db
         .from("saves")
         .insert({set: wordSetId})

      if (error)
         return error
   }

   async Delete(wordSetId: string)
   {
      const {error} = await this.db
         .from("saves")
         .delete()
         .eq("set", wordSetId)

      if (error)
         return error
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

      if (error != null)
         return error

      const words = ValidateWords(data.words)

      if (words instanceof TypeError)
         return words

      return {...data, words}
   }

   async Put(id: string, words: Word[])
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

   async PutMetadata(id: string, meta: { name: string, language: Language | null })
   {
      const {error} = await this.db
         .from("sets")
         .update(meta)
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
