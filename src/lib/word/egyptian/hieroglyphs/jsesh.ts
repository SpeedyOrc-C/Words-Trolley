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
   return Intersperse(text.map(x => ToJsesh_(x)), "-").join("")
}

const binaryStructurePrecedence = {
   [Structure.Ligature]: 1,
   [Structure.Horizontal]: 2,
   [Structure.Vertical]: 3,
} as const

function ToJsesh_(
   h: Hieroglyphs,
   parent
      : Structure.Horizontal
      | Structure.Vertical
      | Structure.Ligature
      | null = null
): string
{
   const [type, arg] = h

   switch (type)
   {
   case Structure.Glyph:
      return Literal2Gardiner[arg]
   case Structure.Horizontal: {
      const inner = Intersperse(arg.map(x => ToJsesh_(x, type)), "*").join("")
      if (parent == null || binaryStructurePrecedence[parent] > binaryStructurePrecedence[type])
         return inner
      return `(${inner})`
   }
   case Structure.Vertical: {
      const inner = Intersperse(arg.map(x => ToJsesh_(x, type)), ":").join("")
      if (parent == null || binaryStructurePrecedence[parent] > binaryStructurePrecedence[type])
         return inner
      return `(${inner})`
   }
   case Structure.Ligature: {
      const inner = Intersperse(arg.map(x => ToJsesh_(x, type)), "&").join("")
      if (parent == null || binaryStructurePrecedence[parent] > binaryStructurePrecedence[type])
         return inner
      return `(${inner})`
   }
   case Structure.Cartouche:
      return `<-${ToJsesh_(arg)}->`
   }
}
