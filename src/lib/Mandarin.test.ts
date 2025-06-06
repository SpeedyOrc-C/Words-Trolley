import {test} from "vitest";
import {pInitial, pSyllablePinyinWithToneNumber} from "$lib/word/mandarin";

test("", () =>
{
    const result = pSyllablePinyinWithToneNumber.eval("cao4")

    console.log(result)
})