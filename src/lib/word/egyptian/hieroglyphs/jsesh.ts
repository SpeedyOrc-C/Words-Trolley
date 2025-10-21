import {Structure, type Hieroglyphs} from "."
import {Literal2Gardiner} from "../gardiner/gardiner-literal"

function Intersperse<T>(arr: T[], sep: T): T[]
{
   if (arr.length == 0)
      return []

   if (arr.length == 1)
      return [arr[0]]

   const result: T[] = []

   for (let i = 0; i < arr.length - 1; i++)
   {
      result.push(arr[i])
      result.push(sep)
   }

   result.push(arr[arr.length - 1])

   return result
}

export function ToJSesh(text: Hieroglyphs[]): string
{
   return Intersperse(text.map(ToJsesh_), "-").join("")
}

function ToJsesh_(h: Hieroglyphs): string
{
   const [type, arg] = h

   switch (type)
   {
      case Structure.G:
         return Literal2Gardiner[arg]
      case Structure.H:
         return `(${Intersperse(arg.map(ToJsesh_), "*").join("")})`
      case Structure.V:
         return `(${Intersperse(arg.map(ToJsesh_), ":").join("")})`
      case Structure.L:
         return `(${ToJsesh_(arg[0])}&${ToJsesh_(arg[1])})`
   }
}
