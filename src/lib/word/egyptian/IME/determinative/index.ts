import { Xiaohuan } from "./xiaohuan"
import { Thomas } from "./thomas"
import { g } from "$lib/word/egyptian/hieroglyphs"
import type { EgyptianWordCandidate } from "$lib/word/egyptian/dictionary"

export enum EgyptianDeterminativeScheme
{
   Xiaohuan = "xiaohuan",
   Thomas = "thomas",
}

export const EgyptianDeterminativeSchemes: Record<EgyptianDeterminativeScheme, Record<string, string[]>> = {
   [EgyptianDeterminativeScheme.Xiaohuan]: Xiaohuan,
   [EgyptianDeterminativeScheme.Thomas]: Thomas,
}

export function CandidatesFromDeterminativeScheme(scheme: Record<string, string[]>, input: string): EgyptianWordCandidate[]
{
   const candidates = scheme[input.toUpperCase()]

   if (candidates == undefined)
      return []

   return candidates.map(g).map(w => ({ Word: w }))
}
