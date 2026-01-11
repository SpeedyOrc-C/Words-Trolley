import type {Glyph, Prefix, Subfix, Suffix, Superfix} from "../glyph"

export enum Structure
{
   Glyph = "G",
   Prefix = "P",
   Suffix = "S",
   Superfix = "T",
   Subfix = "B",
   Horizontal = "H",
   Vertical = "V",
   Four = "4",
   Ligature = "L",
}

export type Hieroglyphs
   = [Structure.Glyph, Glyph]
   | [Structure.Prefix, Prefix]
   | [Structure.Suffix, Suffix]
   | [Structure.Superfix, Superfix]
   | [Structure.Subfix, Subfix]
   | [Structure.Horizontal, Hieroglyphs[]]
   | [Structure.Vertical, Hieroglyphs[]]
   | [Structure.Four, [Hieroglyphs, Hieroglyphs, Hieroglyphs, Hieroglyphs]]
   | [Structure.Ligature, Hieroglyphs[]]
