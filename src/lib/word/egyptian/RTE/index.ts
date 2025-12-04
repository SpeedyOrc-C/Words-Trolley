import {mount} from "svelte"
import Quill from "quill"
import Embed from "quill/blots/embed"

import EgyptianText from "$lib/components/EgyptianText.svelte"
import type {Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"

export class QuillEgyptianText extends Embed
{
   static blotName = "EgyptianText"
   static tagName = "span"
   static DataAttribute = "data-egyptian-text"

   static create(value: Hieroglyphs)
   {
      const node = super.create() as HTMLSpanElement
      node.setAttribute(QuillEgyptianText.DataAttribute, JSON.stringify(value))
      mount(EgyptianText, {target: node, props: {t: [value]}})
      return node
   }

   static value(node: HTMLSpanElement): Hieroglyphs
   {
      return JSON.parse(node.getAttribute(QuillEgyptianText.DataAttribute)!)
   }

   value()
   {
      return QuillEgyptianText.value(this.domNode as HTMLSpanElement)
   }
}

Quill.register(QuillEgyptianText, false)
