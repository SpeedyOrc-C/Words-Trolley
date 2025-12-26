import type {Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"

export namespace BlockEditor
{
   export type Document = Block[]
   export type Block = Tag | Text | Void | Egyptian
   export type Tag = [`h${1 | 2}` | "p" | "span" | "b", {class: string}, Document]
   export type Text = ["text", string]
   export type Void = "br" | "hr"
   export type Egyptian = ["egyptian", Hieroglyphs[]]
}
