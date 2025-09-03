import Glyph from "$lib/word/egyptian/glyph"

export enum Structure
{
	G = "G",
	V = "V",
	H = "H",
}

export type Hieroglyphs
	= [Structure.G, Glyph]
	| [Structure.V, Hieroglyphs[]]
	| [Structure.H, Hieroglyphs[]]

export const g = (g: Glyph): Hieroglyphs => [Structure.G, g]
export const v = (...v: Hieroglyphs[]): Hieroglyphs => [Structure.V, v]
export const h = (...h: Hieroglyphs[]): Hieroglyphs => [Structure.H, h]

export function Decompose(hie: Hieroglyphs): Hieroglyphs[]
{
	switch (hie[0])
	{
		case Structure.G:
			return [hie]
		case Structure.V:
		case Structure.H:
			return hie[1]
	}
}
