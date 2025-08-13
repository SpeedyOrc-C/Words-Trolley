import {Final, Initial, IsAlveoloPalatal, IsLabial, Syllable, Tone} from "$lib/word/mandarin"
import {Nothing, pure, asum, str, char, anyChar} from "crazy-parser"
import {optional} from "crazy-parser/prefix"

export const pInitial = optional(asum(
    char("z").right(char("h").cmap(Initial.Zh).or(pure(Initial.Z))),
    char("c").right(char("h").cmap(Initial.Ch).or(pure(Initial.C))),
    char("s").right(char("h").cmap(Initial.Sh).or(pure(Initial.S))),
    char("b").cmap(Initial.B),
    char("p").cmap(Initial.P),
    char("m").cmap(Initial.M),
    char("f").cmap(Initial.F),
    char("d").cmap(Initial.D),
    char("t").cmap(Initial.T),
    char("n").cmap(Initial.N),
    char("l").cmap(Initial.L),
    char("g").cmap(Initial.G),
    char("k").cmap(Initial.K),
    char("h").cmap(Initial.H),
    char("j").cmap(Initial.J),
    char("q").cmap(Initial.Q),
    char("x").cmap(Initial.X),
    char("r").cmap(Initial.R),
))

export const pPinyinWithToneNumber = pInitial
    .bind(initial => asum(
        char("a").right(asum([
            char("i").cmap(Final.Ai),
            char("o").cmap(Final.Ao),
            char("n").right(asum([
                char("g").cmap(Final.Ang),
                pure(Final.An)
            ])),
            pure(Final.A)
        ])),
        char("o").right(asum([
            char("u").cmap(Final.Ou),
            str("ng").cmap(Final.Ong),
            pure(initial == Nothing ? Final.O : Final.Uo)
        ])),
        char("e").right(asum([
            char("i").cmap(Final.Ei),
            char("r").cmap(Final.Er).if(initial == Nothing),
            char("n").right(asum([
                char("g").cmap(Final.Eng),
                pure(Final.En)
            ])),
            pure(Final.E)
        ])),
        char("i").right(asum([
            char("a").right(asum([
                char("o").cmap(Final.Iao),
                char("n").right(asum([
                    char("g").cmap(Final.Iang),
                    pure(Final.Ian)
                ])),
                pure(Final.Ia)
            ])),
            char("e").cmap(Final.Ie),
            char("o").right(asum([
                str("ng").cmap(Final.Iong),
                pure(Final.Io)
            ])),
            char("u").cmap(Final.Iou),
            char("n").right(asum([
                char("g").cmap(Final.Ing),
                pure(Final.In)
            ])),
            pure(Final.I)
        ])),
        char("u").right(asum([
            char("a").right(asum([
                char("i").cmap(Final.Uai),
                char("n").right(asum([
                    char("g").cmap(Final.Uang),
                    pure(IsAlveoloPalatal(initial) ? Final.Yuan : Final.Uan)
                ])),
                pure(Final.Ua)
            ])),
            char("e").right(asum([
                str("ng").cmap(Final.Ueng),
                pure(Final.Yue)
            ])),
            char("i").cmap(Final.Uei),
            char("o").try().if(!IsLabial(initial)).cmap(Final.Uo),
            char("n").cmap(IsAlveoloPalatal(initial) ? Final.Yun : Final.Uen),
            pure(Final.U).if(initial != Nothing)
        ])),
        char("y").right(asum([
            char("a").right(asum([
                char("o").cmap(Final.Iao),
                char("n").right(asum([
                    char("g").cmap(Final.Iang),
                    pure(Final.Ian)
                ])),
                pure(Final.Ia)
            ])),
            char("e").cmap(Final.Ie),
            char("i").right(asum([
                char("n").right(asum([
                    char("g").cmap(Final.Ing),
                    pure(Final.In)
                ])),
                pure(Final.I)
            ])),
            char("o").right(asum([
                str("ng").cmap(Final.Iong),
                char("u").cmap(Final.Iou),
            ])),
            char("u").right(asum([
                char("e").cmap(Final.Yue),
                char("n").cmap(Final.Yun),
                pure(Final.Yu)
            ])),
        ])),
        char("w").right(asum([
            char("a").right(asum([
                char("i").cmap(Final.Uai),
                char("n").right(asum([
                    char("g").cmap(Final.Uang),
                    pure(Final.Uan)
                ])),
                pure(Final.Ua)
            ])),
            char("e").right(asum([
                char("n").right(asum([
                    char("g").cmap(Final.Ueng),
                    pure(Final.Uen)
                ])),
                char("i").cmap(Final.Uei),
            ])),
            char("o").cmap(Final.Uo),
            char("u").cmap(Final.U)
        ])),
        char("ü").cmap(Final.Yu).if(initial == Initial.L || initial == Initial.N),
        char("ê").cmap(Final.E2).if(initial == Nothing)
    ).bind(final => asum(
        char("1").cmap<Tone>(Tone.Flat),
        char("2").cmap<Tone>(Tone.Rise),
        char("3").cmap<Tone>(Tone.FallRise),
        char("4").cmap<Tone>(Tone.Fall),
        optional(char("0")).cmap<Tone>(Tone.Neutral),
    ).map(tone =>
        new Syllable(initial == Nothing ? null : initial, final, tone))
    ))

export const pTone = asum(
    anyChar(["a", "e", "ê", "i", "o", "u", "ü"]).cmap(Tone.Neutral),
    anyChar(["ā", "ē", "ī", "ō", "ū", "ṻ"]).cmap(Tone.Flat),
    anyChar(["á", "é", "ế", "í", "ó", "ú", "ǘ"]).cmap(Tone.Rise),
    anyChar(["ǎ", "ě", "ǐ", "ǒ", "ǔ", "ǚ"]).cmap(Tone.FallRise),
    anyChar(["à", "è", "ề", "ì", "ò", "ù", "ǜ"]).cmap(Tone.Fall),
)
