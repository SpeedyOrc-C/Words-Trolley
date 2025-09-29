import {Service} from '$lib/service'

export async function load({url, locals: {db}})
{
   const query = url.searchParams.get("query")

   if (query == null)
      return {query, preFetchedResult: null}

   const service = new Service(db)

   const preFetchedResult = await service.WordSet.Search(query)

   if (preFetchedResult instanceof Error)
      return {query, preFetchedResult: null}

   return {query, preFetchedResult}
}
