import {mount} from "svelte"
import Quill from "quill"
import Embed from "quill/blots/embed"

import EgyptianText from "$lib/components/EgyptianText.svelte"
import type {Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
import {writable, type Writable} from "svelte/store"

export class QuillEgyptianText extends Embed
{
   static blotName = "EgyptianText"
   static tagName = "span"
   static DataAttribute = "data-egyptian-text"

   public static updateSignal: Writable<unknown> = writable({})

   static create(value: Hieroglyphs)
   {
      const node = super.create() as HTMLSpanElement
      node.className = "inline-block"

      node.setAttribute(QuillEgyptianText.DataAttribute, JSON.stringify(value))

      mount(EgyptianText, {
         target: node,
         props: {
            t: [value],
            updateSignal: QuillEgyptianText.updateSignal,
         }
      })

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

Quill.register(QuillEgyptianText)
