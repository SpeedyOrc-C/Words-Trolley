import {array, asum, eq, sequence, str, type Validator, lazy} from "crazy-parser/json/validate"
import {HeightOfGlyph} from "../glyph/height"
import type {Phoneme} from ".."

export enum Structure
{
	Glyph = "G",
	Vertical = "V",
	Horizontal = "H",
	Ligature = "L",
	Cartouche = "C",
}

type HieroglyphsGlyph = [Structure.Glyph, string]

export type Hieroglyphs
	= HieroglyphsGlyph
	| [Structure.Vertical, Hieroglyphs[]]
	| [Structure.Horizontal, Hieroglyphs[]]
	| [Structure.Ligature, HieroglyphsGlyph[]]
	| [Structure.Cartouche, Hieroglyphs]

const _ValidateHieroglyphsGlyph = sequence(eq(Structure.Glyph as const), str)

const _Validate: () => Validator<Hieroglyphs> = () => asum(
	_ValidateHieroglyphsGlyph,
	sequence(eq(Structure.Vertical as const), array(lazy(_Validate))),
	sequence(eq(Structure.Horizontal as const), array(lazy(_Validate))),
	sequence(eq(Structure.Ligature as const), array(_ValidateHieroglyphsGlyph)),
)

export const Validate = _Validate()

export const g = (g: string): HieroglyphsGlyph => [Structure.Glyph, g]
export const v = (...v: Hieroglyphs[]): Hieroglyphs => [Structure.Vertical, v]
export const h = (...h: Hieroglyphs[]): Hieroglyphs => [Structure.Horizontal, h]
export const l = (...l: HieroglyphsGlyph[]): Hieroglyphs => [Structure.Ligature, l]
export const c = (hie: Hieroglyphs): Hieroglyphs => [Structure.Cartouche, hie]

export function RoughAutoStackPhonemes(ps: Phoneme[]): Hieroglyphs[]
{
	const result: Hieroglyphs[] = []

	const buffer: HieroglyphsGlyph[] = []
	let bufferHeight = 0

	for (const p of ps)
	{
		const height = HeightOfGlyph(p)

		if (height + bufferHeight <= 1 && buffer.length < 3)
		{
			buffer.push(g(p))
			bufferHeight += height
		}
		else if (buffer.length > 1)
		{
			result.push(v(...buffer))
			buffer.length = 0
			buffer.push(g(p))
			bufferHeight = height
		} else if (buffer.length == 1)
		{
			result.push(buffer[0])
			buffer.length = 0
			buffer.push(g(p))
			bufferHeight = height
		} else
		{
			result.push(g(p))
		}
	}

	if (buffer.length > 1)
		result.push(v(...buffer))
	else if (buffer.length == 1)
		result.push(buffer[0])

	return result
}

export function Split(hie: Hieroglyphs): Hieroglyphs[]
{
	switch (hie[0])
	{
	case Structure.Glyph:
		return [hie]
	case Structure.Vertical:
	case Structure.Horizontal:
		return hie[1]
	case Structure.Ligature:
		return hie[1]
	case Structure.Cartouche:
		return [hie[1]]
	}
}

export function JoinVertically(a: Hieroglyphs, b: Hieroglyphs): Hieroglyphs
{
	if (a[0] == Structure.Vertical)
		if (b[0] == Structure.Vertical)
			return v(...a[1], ...b[1])
		else
			return v(...a[1], b)
	else
		if (b[0] == Structure.Vertical)
			return v(a, ...b[1])
		else
			return v(a, b)
}

export function JoinHorizontally(a: Hieroglyphs, b: Hieroglyphs): Hieroglyphs
{
	if (a[0] == Structure.Horizontal)
		if (b[0] == Structure.Horizontal)
			return h(...a[1], ...b[1])
		else
			return h(...a[1], b)
	else
		if (b[0] == Structure.Horizontal)
			return h(a, ...b[1])
		else
			return h(a, b)

}

export function Overlap(a: Hieroglyphs, b: Hieroglyphs): Hieroglyphs
{
	if (a[0] == Structure.Ligature)
	{
		if (b[0] == Structure.Ligature)
			return l(...a[1], ...b[1])
		else if (b[0] == Structure.Glyph)
			return l(...a[1], b)
		else
			throw "Cannot overlap non-glyph hieroglyphs."
	}
	else if (a[0] == Structure.Glyph)
	{
		if (b[0] == Structure.Ligature)
			return l(a, ...b[1])
		else if (b[0] == Structure.Glyph)
			return l(a, b)
		else
			throw "Cannot overlap non-glyph hieroglyphs."
	}
	else
		throw "Cannot overlap non-glyph hieroglyphs."
}

export function Ungroup(x: Hieroglyphs): Hieroglyphs[]
{
	switch (x[0])
	{
	case Structure.Vertical:
	case Structure.Horizontal:
	case Structure.Ligature:
		return x[1]
	case Structure.Glyph:
		throw "Cannot ungroup a glyph."
	default:
		return [x]
	}
}

function DumpHieroglyphsItem([type, arg]: Hieroglyphs): string
{
	switch (type)
	{
	case Structure.Glyph:
		return arg
	case Structure.Vertical:
		return `V${arg.length}${arg.map(DumpHieroglyphsItem).join("")}`
	case Structure.Horizontal:
		return `H${arg.length}${arg.map(DumpHieroglyphsItem).join("")}`
	case Structure.Ligature:
		return `L${arg.length}${arg.map(DumpHieroglyphsItem).join("")}`
	case Structure.Cartouche:
		return `C${DumpHieroglyphsItem(arg)}`
	}
}

export function DumpHieroglyphs(xs: Hieroglyphs[]): string
{
	return xs.map(DumpHieroglyphsItem).join("")
}
