import {h, v, l, g, type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
import {asum, char, digit, eof, lazy, one, type Parser} from "crazy-parser"
import {many} from "crazy-parser/prefix"

const pStackCount = digit.map(parseInt).where(x => 2 <= x && x <= 9)

const pItem: Parser<Hieroglyphs> = lazy(() =>
	asum(
		pHorizontalStack,
		pVerticalStack,
		pLigature,
		pGlyph,
	)
)

const pGlyph: Parser<Hieroglyphs> =
	one.where(c => {
		const code = c.codePointAt(0)
		return code != undefined && 0x13000 <= code && code <= 0x1342F
	}).map(g)

const pHorizontalStack: Parser<Hieroglyphs> =
	char("H").$_(pStackCount).bind(c => pItem.x(c).map(xs => h(...xs)))

const pVerticalStack: Parser<Hieroglyphs> =
	char("V").$_(pStackCount).bind(c => pItem.x(c).map(xs => v(...xs)))

const pLigature: Parser<Hieroglyphs> =
	char("L").$_(pItem.x(2).map(([a, b]) => l(a, b)))

export const pHieroglyphs: Parser<Hieroglyphs[]> =
	many(pItem.try())._$(eof)
