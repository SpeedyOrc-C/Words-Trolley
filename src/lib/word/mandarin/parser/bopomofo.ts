import {Final, Initial, IsLabial, Syllable, Tone} from "$lib/word/mandarin"
import {asum, char, Nothing, pure} from "crazy-parser"
import {optional} from "crazy-parser/prefix"

const pInitial = optional(asum(
    char("ㄅ").cmap(Initial.B),
    char("ㄆ").cmap(Initial.P),
    char("ㄇ").cmap(Initial.M),
    char("ㄈ").cmap(Initial.F),
    char("ㄉ").cmap(Initial.D),
    char("ㄊ").cmap(Initial.T),
    char("ㄋ").cmap(Initial.N),
    char("ㄌ").cmap(Initial.L),
    char("ㄍ").cmap(Initial.G),
    char("ㄎ").cmap(Initial.K),
    char("ㄏ").cmap(Initial.H),
    char("ㄐ").cmap(Initial.J),
    char("ㄑ").cmap(Initial.Q),
    char("ㄒ").cmap(Initial.X),
    char("ㄓ").cmap(Initial.Zh),
    char("ㄔ").cmap(Initial.Ch),
    char("ㄕ").cmap(Initial.Sh),
    char("ㄖ").cmap(Initial.R),
    char("ㄗ").cmap(Initial.Z),
    char("ㄘ").cmap(Initial.C),
    char("ㄙ").cmap(Initial.S),
))

export const pBopomofo = pInitial
    .bind(initial => asum(
        char("ㄚ").cmap(Final.A),
        char("ㄛ").cmap(IsLabial(initial) ? Final.Uo : Final.O),
        char("ㄜ").cmap(Final.E),
        char("ㄝ").cmap(Final.E2),
        char("ㄞ").cmap(Final.Ai),
        char("ㄟ").cmap(Final.Ei),
        char("ㄠ").cmap(Final.Ao),
        char("ㄡ").cmap(Final.Ou),
        char("ㄢ").cmap(Final.An),
        char("ㄣ").cmap(Final.En),
        char("ㄤ").cmap(Final.Ang),
        char("ㄥ").cmap(Final.Eng),
        char("ㄦ").cmap(Final.Er),
        char("ㄧ").right(asum(
            char("ㄚ").cmap(Final.Ia),
            char("ㄞ").cmap(Final.Iai),
            char("ㄠ").cmap(Final.Iao),
            char("ㄢ").cmap(Final.Ian),
            char("ㄤ").cmap(Final.Iang),
            char("ㄝ").cmap(Final.Ie),
            char("ㄛ").cmap(Final.Io),
            char("ㄡ").cmap(Final.Iou),
            char("ㄣ").cmap(Final.In),
            char("ㄥ").cmap(Final.Ing),
            pure(Final.I),
        )),
        char("ㄨ").right(asum(
            char("ㄚ").cmap(Final.Ua),
            char("ㄞ").cmap(Final.Uai),
            char("ㄢ").cmap(Final.Uan),
            char("ㄤ").cmap(Final.Uang),
            char("ㄟ").cmap(Final.Uei),
            char("ㄣ").cmap(Final.Uen),
            char("ㄥ").cmap(initial == Nothing ? Final.Ueng : Final.Ong),
            char("ㄛ").cmap(Final.Uo),
            pure(Final.U),
        )),
        char("ㄩ").right(asum(
            char("ㄢ").cmap(Final.Yuan),
            char("ㄝ").cmap(Final.Yue),
            char("ㄣ").cmap(Final.Yun),
            char("ㄥ").cmap(Final.Iong),
            pure(Final.Yu),
        )),
        pure(Final.I).if(
            initial == Initial.J ||
            initial == Initial.Q ||
            initial == Initial.X ||
            initial == Initial.Zh ||
            initial == Initial.Ch ||
            initial == Initial.Sh ||
            initial == Initial.R ||
            initial == Initial.Z ||
            initial == Initial.C ||
            initial == Initial.S
        )
    ).bind(final => asum(
        char("ˇ").cmap(Tone.FallRise),
        char("ˋ").cmap(Tone.Fall),
        char("ˊ").cmap(Tone.Rise),
        char("˙").cmap(Tone.Neutral),
        pure(Tone.Flat)
    ).map(tone =>
        new Syllable(initial == Nothing ? null : initial, final, tone)
    )))
