import
{
   type Validator,
   obj, asum,
   eq,
   array,
   str,
   lazy,
   sequence
} from "crazy-parser/json/validate"
import {Validate as _ValidateEgyptian} from "$lib/word/egyptian/hieroglyphs"
import type {BlockEditor} from "."

const ValidateText = sequence(eq("text" as const), str)
const ValidateVoid = asum(eq("br" as const), eq("hr" as const))
const ValidateEgyptian = sequence(eq("egyptian" as const), array(_ValidateEgyptian))

const ValidateTag = () => lazy<Validator<BlockEditor.Tag>>(() => sequence(
   asum(
      eq("h1" as const),
      eq("h2" as const),
      eq("p" as const),
      eq("span" as const),
      eq("b" as const),
   ),
   obj({class: str}),
   ValidateDocument(),
))

const ValidateBlock = () => lazy<Validator<BlockEditor.Block>>(() => asum(
   ValidateTag,
   ValidateText,
   ValidateVoid,
   ValidateEgyptian,
))

const ValidateDocument = () => lazy<Validator<BlockEditor.Document>>(() => array(ValidateBlock()))

export const Validate = ValidateDocument()

