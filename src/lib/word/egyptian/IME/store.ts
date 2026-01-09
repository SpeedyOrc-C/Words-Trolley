import {writable} from "svelte/store"
import * as IME from "../IME"

export class FocusedEgyptianInput
{
   Symbol: Symbol
   Get: () => IME.State
   Set: (value: IME.State) => void

   constructor(symbol: Symbol, Get: () => IME.State, Set: (value: IME.State) => void)
   {
      this.Symbol = symbol
      this.Get = Get
      this.Set = Set
   }
}

export const focusedEgyptianInput = writable<null | FocusedEgyptianInput>(null)

export const gardinerTablePromptOnSelect = writable<null | ((symbol: string) => void)>(null)
