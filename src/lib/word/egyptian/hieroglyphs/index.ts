import {array, asum, eq, sequence, str, type Validator} from "crazy-parser/json/validate"

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

const lazy = <T>(f: () => Validator<T>) => (input: unknown) => f()(input)

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

export type HieroglyphsEditorState = {
	cursor: number
	content: Hieroglyphs[]
}

export enum EgyptianEditCmdKind
{
	Column,
	Row,
	Overlap,
	Cartouche,
	Split,
	DuplicateLast,
	Jump,
	Left,
	Right,
	Backspace,
	Insert,
	Replace,
}

export type EgyptianEditCmd
	= [EgyptianEditCmdKind.Column]
	| [EgyptianEditCmdKind.Row]
	| [EgyptianEditCmdKind.Overlap]
	| [EgyptianEditCmdKind.Cartouche]
	| [EgyptianEditCmdKind.Split]
	| [EgyptianEditCmdKind.DuplicateLast]
	| [EgyptianEditCmdKind.Jump, number]
	| [EgyptianEditCmdKind.Left]
	| [EgyptianEditCmdKind.Right]
	| [EgyptianEditCmdKind.Backspace]
	| [EgyptianEditCmdKind.Insert, Hieroglyphs]
	| [EgyptianEditCmdKind.Replace, Hieroglyphs[]]

export function HieroglyphsEditCommandNoSideEffect(command: EgyptianEditCmd): boolean
{
	const [type] = command
	return type === EgyptianEditCmdKind.Jump || type === EgyptianEditCmdKind.Left || type === EgyptianEditCmdKind.Right
}

export function ExecuteHieroglyphsEditCommand
(
	state: HieroglyphsEditorState,
	command: EgyptianEditCmd,
): HieroglyphsEditorState
{
	const {cursor, content} = state
	const {length} = content
	const [kind, arg] = command

	switch (kind)
	{
	case EgyptianEditCmdKind.Column:
	{
		if (cursor < 2)
			throw "Not enough characters."

		const left = content.slice(0, cursor - 2)
		const middle = content.slice(cursor - 2, cursor)
		const right = content.slice(cursor)

		return {
			cursor: cursor - 1,
			content: [...left, JoinVertically(middle[0], middle[1]), ...right]
		}
	}
	case EgyptianEditCmdKind.Row:
	{
		if (cursor < 2)
			throw "Not enough characters."

		const left = content.slice(0, cursor - 2)
		const middle = content.slice(cursor - 2, cursor)
		const right = content.slice(cursor)

		return {
			cursor: cursor - 1,
			content: [...left, JoinHorizontally(middle[0], middle[1]), ...right]
		}
	}
	case EgyptianEditCmdKind.Overlap:
	{
		if (cursor < 2)
			throw "Not enough characters."

		const left = content.slice(0, cursor - 2)
		const middle = content.slice(cursor - 2, cursor)
		const right = content.slice(cursor)

		return {
			cursor: cursor - 1,
			content: [...left, Overlap(middle[0], middle[1]), ...right]
		}
	}
	case EgyptianEditCmdKind.Cartouche:
	{
		if (cursor == 0)
			throw "No character to enclose."

		const hie = content[cursor - 1]
		const left = content.slice(0, cursor - 1)
		const right = content.slice(cursor)

		return {
			cursor: cursor,
			content: [...left, c(hie), ...right]
		}
	}
	case EgyptianEditCmdKind.Split:
	{
		if (cursor == 0)
			throw "No character to split."

		const hie = content[cursor - 1]
		const split = Split(hie)
		const left = content.slice(0, cursor - 1)
		const right = content.slice(cursor)

		return {
			cursor: cursor + split.length - 1,
			content: [...left, ...split, ...right]
		}
	}
	case EgyptianEditCmdKind.DuplicateLast:
	{
		if (cursor == 0)
			throw "No character to duplicate."

		const hie = content[cursor - 1]
		const left = content.slice(0, cursor)
		const right = content.slice(cursor)

		return {
			cursor: cursor + 1,
			content: [...left, hie, ...right]
		}
	}
	case EgyptianEditCmdKind.Jump:
	{
		if (arg < 0 || arg > content.length)
			throw "Out of range."

		return {
			cursor: arg,
			content,
		}
	}
	case EgyptianEditCmdKind.Left:
	{
		if (cursor == 0)
			throw "Already at the beginning."

		return {
			cursor: cursor - 1,
			content,
		}
	}
	case EgyptianEditCmdKind.Right:
	{
		if (cursor == length)
			throw "Already at the end."

		return {
			cursor: cursor + 1,
			content,
		}
	}
	case EgyptianEditCmdKind.Backspace:
	{
		if (cursor == 0)
			throw "No character to delete."

		const left = content.slice(0, cursor - 1)
		const right = content.slice(cursor)

		if (content[cursor - 1][0] == Structure.Glyph)
		{
			return {
				cursor: cursor - 1,
				content: [...left, ...right]
			}
		}
		else
		{
			const split = Split(content[cursor - 1])

			return {
				cursor: cursor + split.length - 1,
				content: [...left, ...split, ...right]
			}
		}
	}
	case EgyptianEditCmdKind.Insert:
	{
		const left = content.slice(0, cursor)
		const right = content.slice(cursor)

		return {
			cursor: cursor + 1,
			content: [...left, arg, ...right]
		}
	}
	case EgyptianEditCmdKind.Replace:
	{
		return {
			cursor: arg.length,
			content: arg,
		}
	}
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
