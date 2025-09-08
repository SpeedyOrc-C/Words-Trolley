import {g, h, v, type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"

const Important: [Hieroglyphs, string][] = [
	[g("𓏭"), "𓇌"],
	[g("𓏥"), "𓅱"],
	[g("𓏲"), "𓅱"],
	[g("𓀀"), "𓇋"],
	[v(g("𓍿"), g("𓈖"), g("𓏥")), "𓍿𓈖"],
	[v(g("𓏏"), g("𓈖"), g("𓏥")), "𓏏𓈖"],
	[h(g("𓋴"), v(g("𓈖"), g("𓏥"))), "𓋴𓈖"],
	[v(g("𓊃"), g("𓈖"), g("𓏥")), "𓊃𓈖"],
]

export default Important
