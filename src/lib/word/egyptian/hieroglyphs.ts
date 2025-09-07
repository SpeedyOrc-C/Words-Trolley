import Glyph from "$lib/word/egyptian/glyph"

export enum Structure
{
	G = "G",
	V = "V",
	H = "H",
}

export type Hieroglyphs
	= [Structure.G, string]
	| [Structure.V, Hieroglyphs[]]
	| [Structure.H, Hieroglyphs[]]

export const g = (g: string): Hieroglyphs => [Structure.G, g]
export const v = (...v: Hieroglyphs[]): Hieroglyphs => [Structure.V, v]
export const h = (...h: Hieroglyphs[]): Hieroglyphs => [Structure.H, h]

export function Split(hie: Hieroglyphs): Hieroglyphs[]
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

export type HieroglyphsEditorState = {
	cursor: number
	content: Hieroglyphs[]
}

export type HieroglyphsEditCommand
	= ["column", number]
	| ["row", number]
	| ["overlap"]
	| ["split"]
	| ["jump", number]
	| ["left"]
	| ["right"]
	| ["backspace"]
	| ["insert", Hieroglyphs]

export function ExecuteHieroglyphsEditorCommand
(
	state: HieroglyphsEditorState,
	command: HieroglyphsEditCommand,
): HieroglyphsEditorState
{
	const {cursor, content} = state
	const {length} = content
	const [type, arg] = command

	switch (type)
	{
	case "column":
	{
		if (cursor < arg)
			throw "Not enough characters."

		const left = content.slice(0, cursor - arg)
		const middle = content.slice(cursor - arg, cursor)
		const right = content.slice(cursor)

		return {
			cursor: cursor - arg + 1,
			content: [...left, v(...middle), ...right]
		}
	}
	case "row":
	{
		if (cursor < arg)
			throw "Not enough characters."

		const left = content.slice(0, cursor - arg)
		const middle = content.slice(cursor - arg, cursor)
		const right = content.slice(cursor)

		return {
			cursor: cursor - arg + 1,
			content: [...left, h(...middle), ...right]
		}
	}
	case "overlap":
	{
		throw "Not implemented."
	}
	case "split":
	{
		if (cursor === 0)
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
	case "jump":
	{
		if (arg < 0 || arg > content.length)
			throw "Out of range."

		return {
			cursor: arg,
			content,
		}
	}
	case "left":
	{
		if (cursor == 0)
			throw "Already at the beginning."

		return {
			cursor: cursor - 1,
			content,
		}
	}
	case "right":
	{
		if (cursor == length)
			throw "Already at the end."

		return {
			cursor: cursor + 1,
			content,
		}
	}
	case "backspace":
	{
		if (cursor == 0)
			throw "No character to delete."

		const left = content.slice(0, cursor - 1)
		const right = content.slice(cursor)

		if (content[cursor - 1][0] == Structure.G)
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
	case "insert":
	{
		const left = content.slice(0, cursor)
		const right = content.slice(cursor)

		return {
			cursor: cursor + 1,
			content: [...left, arg, ...right]
		}
	}
	}
}
