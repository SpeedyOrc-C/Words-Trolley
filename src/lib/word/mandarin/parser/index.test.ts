import {test} from "vitest"
import {pBopomofo} from "$lib/word/mandarin/parser/bopomofo"

test("", () =>
{
    console.log(pBopomofo.eval("ㄆㄚ"))
})