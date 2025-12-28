import type {Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"

export namespace BlockEditor
{
   export type Document = Block[]
   export type Block = Tag | Text | Void | Egyptian
   export type Tag = [`h${1 | 2}` | "p" | "span" | "b", {class: string}, Document]
   export type Text = ["text", string]
   export type Void = "br" | "hr"
   export type Egyptian = ["egyptian", Hieroglyphs[]]

   export function DocumentAbstract(x: Document): string
   {
      if (x.length == 0)
         return ""

      return BlockAbstract(x[0])
   }

   export function BlockAbstract(x: Block): string
   {
      if (typeof x == "string" || x[0] == "egyptian")
         return ""

      if (x[0] == "text")
         return x[1]

      return DocumentAbstract(x[2])
   }
}
