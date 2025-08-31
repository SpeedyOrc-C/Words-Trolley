import Glyph from "$lib/word/egyptian/glyph"

export enum Structure
{
	G = "G",
	V = "V",
	H = "H",
}

export type Hieroglyphics
	= [Structure.G, Glyph]
	| [Structure.V, Hieroglyphics[]]
	| [Structure.H, Hieroglyphics[]]

export const g = (g: Glyph): Hieroglyphics => [Structure.G, g]
export const v = (...v: Hieroglyphics[]): Hieroglyphics => [Structure.V, v]
export const h = (...h: Hieroglyphics[]): Hieroglyphics => [Structure.H, h]

export function Decompose(hie: Hieroglyphics): Hieroglyphics[]
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
