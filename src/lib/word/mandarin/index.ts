import {Nothing} from "crazy-parser"

export enum Initial
{
    B = "b", P = "p", M = "m", F = "f",
    D = "d", T = "t", N = "n", L = "l",
    G = "g", K = "k", H = "h",
    J = "j", Q = "q", X = "x",
    Zh = "zh", Ch = "ch", Sh = "sh", R = "r",
    Z = "z", C = "c", S = "s",
}

export enum Vowel
{
    A = "a", O = "o", E = "e", E2 = "ê",
    I = "i", U = "u", Yu = "ü",
}

export enum Final
{
    A = "a", O = "o", E = "e", E2 = "ê", I = "i", U = "u", Yu = "yu",
    Ai = "ai", Ao = "ao", An = "an", Ang = "ang",
    Ou = "ou", Ong = "ong",
    Ei = "ei", En = "en", Eng = "eng", Er = "er",
    Ia = "ia", Iai = "iai", Iao = "iao", Ian = "ian", Iang = "iang",
    Io = "io", Iong = "iong", Iou = "iou", Ie = "ie", In = "in", Ing = "ing",
    Ua = "ua", Uai = "uai", Uan = "uan", Uang = "uang",
    Uei = "uei", Uen = "uen", Ueng = "ueng", Uo = "uo",
    Yuan = "yuan", Yue = "yue", Yun = "yun",
}

export enum Tone
{
    Neutral = 0, Flat = 1, Rise = 2, FallRise = 3, Fall = 4,
}

export interface ISyllable {
    Initial: Initial | null
    Final: Final
    Tone: Tone
}

export class Syllable implements ISyllable
{
    constructor(public Initial: Initial | null, public Final: Final, public Tone: Tone) {}

    Show(): string
    {
        return `${this.Initial}-${this.Final}-${this.Tone}`
    }

    Equal<const S extends Syllable>(other: S): boolean
    {
        return (
            this.Initial == other.Initial &&
            this.Final == other.Final &&
            this.Tone == other.Tone
        )
    }

    get Pinyin(): string
    {
        if (this.Initial == null)
            return this.FinalOnlyPinyin

        const initial = this.InitialPinyin
        const final = this.FinalPinyin

        return initial + final
    }

    get FinalOnlyPinyin(): string
    {
        const tone = this.Tone

        function T(vowel: Vowel) { return AddTone(vowel, tone) }

        switch (this.Final)
        {
        case Final.A:
            return T(Vowel.A)
        case Final.O:
            return T(Vowel.O)
        case Final.E:
            return T(Vowel.E)
        case Final.E2:
            return T(Vowel.E2)
        case Final.I:
            return "y" + T(Vowel.I)
        case Final.U:
            return "w" + T(Vowel.U)
        case Final.Yu:
            return "y" + T(Vowel.U)
        case Final.Ai:
            return T(Vowel.A) + "i"
        case Final.Ao:
            return T(Vowel.A) + "o"
        case Final.An:
            return T(Vowel.A) + "n"
        case Final.Ang:
            return T(Vowel.A) + "ng"
        case Final.Ou:
            return T(Vowel.O) + "u"
        case Final.Ong:
            return T(Vowel.O) + "ng"
        case Final.Ei:
            return T(Vowel.E) + "i"
        case Final.En:
            return T(Vowel.E) + "n"
        case Final.Eng:
            return T(Vowel.E) + "ng"
        case Final.Er:
            return T(Vowel.E) + "r"
        case Final.Ia:
            return "y" + T(Vowel.A)
        case Final.Iai:
            return "y" + T(Vowel.A) + "i"
        case Final.Iao:
            return "y" + T(Vowel.A) + "o"
        case Final.Ian:
            return "y" + T(Vowel.A) + "n"
        case Final.Iang:
            return "y" + T(Vowel.A) + "ng"
        case Final.Io:
            return "y" + T(Vowel.O)
        case Final.Iong:
            return "y" + T(Vowel.O) + "ng"
        case Final.Ie:
            return "y" + T(Vowel.E)
        case Final.Iou:
            return "y" + T(Vowel.O) + "u"
        case Final.In:
            return "y" + T(Vowel.I) + "n"
        case Final.Ing:
            return "y" + T(Vowel.I) + "ng"
        case Final.Ua:
            return "w" + T(Vowel.A)
        case Final.Uai:
            return "w" + T(Vowel.A) + "i"
        case Final.Uan:
            return "w" + T(Vowel.A) + "n"
        case Final.Uang:
            return "w" + T(Vowel.A) + "ng"
        case Final.Ueng:
            return "w" + T(Vowel.E) + "ng"
        case Final.Uei:
            return "w" + T(Vowel.E) + "i"
        case Final.Uo:
            return "w" + T(Vowel.O)
        case Final.Uen:
            return "w" + T(Vowel.E) + "n"
        case Final.Yuan:
            return "yu" + T(Vowel.A) + "n"
        case Final.Yue:
            return "yu" + T(Vowel.E)
        case Final.Yun:
            return "y" + T(Vowel.U) + "n"
        }
    }

    get InitialPinyin(): string
    {
        switch (this.Initial)
        {
        case Initial.B:
            return "b"
        case Initial.P:
            return "p"
        case Initial.M:
            return "m"
        case Initial.F:
            return "f"
        case Initial.D:
            return "d"
        case Initial.T:
            return "t"
        case Initial.N:
            return "n"
        case Initial.L:
            return "l"
        case Initial.G:
            return "g"
        case Initial.K:
            return "k"
        case Initial.H:
            return "h"
        case Initial.J:
            return "j"
        case Initial.Q:
            return "q"
        case Initial.X:
            return "x"
        case Initial.Zh:
            return "zh"
        case Initial.Ch:
            return "ch"
        case Initial.Sh:
            return "sh"
        case Initial.R:
            return "r"
        case Initial.Z:
            return "z"
        case Initial.C:
            return "c"
        case Initial.S:
            return "s"
        case null:
            throw new Error("No initial.")
        }
    }

    get FinalPinyin(): string
    {
        if (this.Initial == null)
            throw new Error("No initial.")

        const tone = this.Tone

        function T(vowel: Vowel) { return AddTone(vowel, tone) }

        switch (this.Final)
        {
        case Final.A:
            return T(Vowel.A)
        case Final.O:
            return T(Vowel.O)
        case Final.E:
            return T(Vowel.E)
        case Final.E2:
            throw new Error("No initial can have `ê` as a final.")
        case Final.I:
            return T(Vowel.I)
        case Final.U:
            return T(Vowel.U)
        case Final.Yu:
            return AddTone(IsAlveoloPalatal(this.Initial) ? Vowel.U : Vowel.Yu, tone)
        case Final.Ai:
            return T(Vowel.A) + "i"
        case Final.Ao:
            return T(Vowel.A) + "o"
        case Final.An:
            return T(Vowel.A) + "n"
        case Final.Ang:
            return T(Vowel.A) + "ng"
        case Final.Ou:
            return T(Vowel.O) + "u"
        case Final.Ong:
            return T(Vowel.O) + "ng"
        case Final.Ei:
            return T(Vowel.E) + "i"
        case Final.En:
            return T(Vowel.E) + "n"
        case Final.Eng:
            return T(Vowel.E) + "ng"
        case Final.Er:
            throw new Error("No initial can have `er` as a final.")
        case Final.Ia:
            return "i" + T(Vowel.A)
        case Final.Iai:
            throw new Error("No initial can have `iai` as a final.")
        case Final.Iao:
            return "i" + T(Vowel.A) + "o"
        case Final.Ian:
            return "i" + T(Vowel.A) + "n"
        case Final.Iang:
            return "i" + T(Vowel.A) + "ng"
        case Final.Io:
            throw new Error("No initial can have `io` as a final.")
        case Final.Iong:
            return "i" + T(Vowel.O) + "ng"
        case Final.Ie:
            return "i" + T(Vowel.E)
        case Final.Iou:
            return "i" + T(Vowel.U)
        case Final.In:
            return T(Vowel.I) + "n"
        case Final.Ing:
            return T(Vowel.I) + "ng"
        case Final.Ua:
            return "u" + T(Vowel.A)
        case Final.Uai:
            return "u" + T(Vowel.A) + "i"
        case Final.Uan:
            return "u" + T(Vowel.A) + "n"
        case Final.Uang:
            return "u" + T(Vowel.A) + "ng"
        case Final.Ueng:
            throw new Error("No initial can have `ueng` as a final.")
        case Final.Uei:
            return "u" + T(Vowel.I)
        case Final.Uo:
            return IsLabial(this.Initial) ? T(Vowel.O) : "u" + T(Vowel.O)
        case Final.Uen:
            return T(Vowel.U) + "n"
        case Final.Yuan:
            return "u" + T(Vowel.A) + "n"
        case Final.Yue:
            return "u" + T(Vowel.E)
        case Final.Yun:
            return T(Vowel.U) + "n"
        }
    }

    get PinyinWithToneNumber()
    {
        const tone = this.Tone == 0 ? "" : this.Tone.toString()

        if (this.Initial == null)
            return this.FinalOnlyPinyinToneless + tone

        const initial = this.InitialPinyin
        const final = this.FinalPinyinToneless

        return initial + final + tone
    }

    get FinalOnlyPinyinToneless()
    {
        switch (this.Final)
        {
        case Final.A:
            return Vowel.A
        case Final.O:
            return Vowel.O
        case Final.E:
            return Vowel.E
        case Final.E2:
            return Vowel.E2
        case Final.I:
            return "y" + Vowel.I
        case Final.U:
            return "w" + Vowel.U
        case Final.Yu:
            return "y" + Vowel.U
        case Final.Ai:
            return Vowel.A + "i"
        case Final.Ao:
            return Vowel.A + "o"
        case Final.An:
            return Vowel.A + "n"
        case Final.Ang:
            return Vowel.A + "ng"
        case Final.Ou:
            return Vowel.O + "u"
        case Final.Ong:
            return Vowel.O + "ng"
        case Final.Ei:
            return Vowel.E + "i"
        case Final.En:
            return Vowel.E + "n"
        case Final.Eng:
            return Vowel.E + "ng"
        case Final.Er:
            return Vowel.E + "r"
        case Final.Ia:
            return "y" + Vowel.A
        case Final.Iai:
            return "y" + Vowel.A + "i"
        case Final.Iao:
            return "y" + Vowel.A + "o"
        case Final.Ian:
            return "y" + Vowel.A + "n"
        case Final.Iang:
            return "y" + Vowel.A + "ng"
        case Final.Io:
            return "y" + Vowel.O
        case Final.Iong:
            return "y" + Vowel.O + "ng"
        case Final.Ie:
            return "y" + Vowel.E
        case Final.Iou:
            return "y" + Vowel.O + "u"
        case Final.In:
            return "y" + Vowel.I + "n"
        case Final.Ing:
            return "y" + Vowel.I + "ng"
        case Final.Ua:
            return "w" + Vowel.A
        case Final.Uai:
            return "w" + Vowel.A + "i"
        case Final.Uan:
            return "w" + Vowel.A + "n"
        case Final.Uang:
            return "w" + Vowel.A + "ng"
        case Final.Ueng:
            return "w" + Vowel.E + "ng"
        case Final.Uei:
            return "w" + Vowel.E + "i"
        case Final.Uo:
            return "w" + Vowel.O
        case Final.Uen:
            return "w" + Vowel.E + "n"
        case Final.Yuan:
            return "yu" + Vowel.A + "n"
        case Final.Yue:
            return "yu" + Vowel.E
        case Final.Yun:
            return "y" + Vowel.U + "n"
        }
    }

    get FinalPinyinToneless()
    {
        if (this.Initial == null)
            throw new Error("No initial.")

        switch (this.Final)
        {
        case Final.A:
            return Vowel.A
        case Final.O:
            return Vowel.O
        case Final.E:
            return Vowel.E
        case Final.E2:
            throw new Error("No initial can have `ê` as a final.")
        case Final.I:
            return Vowel.I
        case Final.U:
            return Vowel.U
        case Final.Yu:
            return IsAlveoloPalatal(this.Initial) ? Vowel.U : Vowel.Yu
        case Final.Ai:
            return Vowel.A + "i"
        case Final.Ao:
            return Vowel.A + "o"
        case Final.An:
            return Vowel.A + "n"
        case Final.Ang:
            return Vowel.A + "ng"
        case Final.Ou:
            return Vowel.O + "u"
        case Final.Ong:
            return Vowel.O + "ng"
        case Final.Ei:
            return Vowel.E + "i"
        case Final.En:
            return Vowel.E + "n"
        case Final.Eng:
            return Vowel.E + "ng"
        case Final.Er:
            throw new Error("No initial can have `er` as a final.")
        case Final.Ia:
            return "i" + Vowel.A
        case Final.Iai:
            throw new Error("No initial can have `iai` as a final.")
        case Final.Iao:
            return "i" + Vowel.A + "o"
        case Final.Ian:
            return "i" + Vowel.A + "n"
        case Final.Iang:
            return "i" + Vowel.A + "ng"
        case Final.Io:
            throw new Error("No initial can have `io` as a final.")
        case Final.Iong:
            return "i" + Vowel.O + "ng"
        case Final.Ie:
            return "i" + Vowel.E
        case Final.Iou:
            return "i" + Vowel.U
        case Final.In:
            return Vowel.I + "n"
        case Final.Ing:
            return Vowel.I + "ng"
        case Final.Ua:
            return "u" + Vowel.A
        case Final.Uai:
            return "u" + Vowel.A + "i"
        case Final.Uan:
            return "u" + Vowel.A + "n"
        case Final.Uang:
            return "u" + Vowel.A + "ng"
        case Final.Ueng:
            throw new Error("No initial can have `ueng` as a final.")
        case Final.Uei:
            return "u" + Vowel.I
        case Final.Uo:
            return IsLabial(this.Initial) ? Vowel.O : "u" + Vowel.O
        case Final.Uen:
            return Vowel.U + "n"
        case Final.Yuan:
            return "u" + Vowel.A + "n"
        case Final.Yue:
            return "u" + Vowel.E
        case Final.Yun:
            return Vowel.U + "n"
        }
    }

    get Bopomofo(): string
    {
        const initial = this.InitialBopomofo
        const final = this.FinalBopomofo
        const tone = this.ToneBopomofo

        return initial + final + tone
    }

    get InitialBopomofo(): string
    {
        if (this.Initial == null)
            return ""

        switch (this.Initial)
        {
        case Initial.B:
            return "ㄅ"
        case Initial.P:
            return "ㄆ"
        case Initial.M:
            return "ㄇ"
        case Initial.F:
            return "ㄈ"
        case Initial.D:
            return "ㄉ"
        case Initial.T:
            return "ㄊ"
        case Initial.N:
            return "ㄋ"
        case Initial.L:
            return "ㄌ"
        case Initial.G:
            return "ㄍ"
        case Initial.K:
            return "ㄎ"
        case Initial.H:
            return "ㄏ"
        case Initial.J:
            return "ㄐ"
        case Initial.Q:
            return "ㄑ"
        case Initial.X:
            return "ㄒ"
        case Initial.Zh:
            return "ㄓ"
        case Initial.Ch:
            return "ㄔ"
        case Initial.Sh:
            return "ㄕ"
        case Initial.R:
            return "ㄖ"
        case Initial.Z:
            return "ㄗ"
        case Initial.C:
            return "ㄘ"
        case Initial.S:
            return "ㄙ"
        }
    }

    get FinalBopomofo(): string
    {
        switch (this.Final)
        {
        case Final.A:
            return "ㄚ"
        case Final.O:
            return "ㄛ"
        case Final.E:
            return "ㄜ"
        case Final.E2:
            return "ㄝ"
        case Final.I:
            if (this.Initial == Initial.J ||
                this.Initial == Initial.Q ||
                this.Initial == Initial.X ||
                this.Initial == Initial.Zh ||
                this.Initial == Initial.Ch ||
                this.Initial == Initial.Sh ||
                this.Initial == Initial.R ||
                this.Initial == Initial.Z ||
                this.Initial == Initial.C ||
                this.Initial == Initial.S)
                return ""
            return "ㄧ"
        case Final.U:
            return "ㄨ"
        case Final.Yu:
            return "ㄩ"
        case Final.Ai:
            return "ㄞ"
        case Final.Ao:
            return "ㄠ"
        case Final.An:
            return "ㄢ"
        case Final.Ang:
            return "ㄤ"
        case Final.Ou:
            return "ㄡ"
        case Final.Ong:
            return "ㄨㄥ"
        case Final.Ei:
            return "ㄟ"
        case Final.En:
            return "ㄣ"
        case Final.Eng:
            return "ㄥ"
        case Final.Er:
            return "ㄦ"
        case Final.Ia:
            return "ㄧㄚ"
        case Final.Iai:
            return "ㄧㄞ"
        case Final.Iao:
            return "ㄧㄠ"
        case Final.Ian:
            return "ㄧㄢ"
        case Final.Iang:
            return "ㄧㄤ"
        case Final.Io:
            return "ㄧㄛ"
        case Final.Iong:
            return "ㄩㄥ"
        case Final.Iou:
            return "ㄧㄡ"
        case Final.Ie:
            return "ㄧㄝ"
        case Final.In:
            return "ㄧㄣ"
        case Final.Ing:
            return "ㄧㄥ"
        case Final.Ua:
            return "ㄨㄚ"
        case Final.Uai:
            return "ㄨㄞ"
        case Final.Uan:
            return "ㄨㄢ"
        case Final.Uang:
            return "ㄨㄤ"
        case Final.Uei:
            return "ㄨㄟ"
        case Final.Uen:
            return "ㄨㄣ"
        case Final.Ueng:
            return "ㄨㄥ"
        case Final.Uo:
            return "ㄨㄛ"
        case Final.Yuan:
            return "ㄩㄢ"
        case Final.Yue:
            return "ㄩㄝ"
        case Final.Yun:
            return "ㄩㄣ"
        }
    }

    get ToneBopomofo(): string
    {
        switch (this.Tone)
        {
        case Tone.Neutral:
            return "˙"
        case Tone.Flat:
            return ""
        case Tone.Rise:
            return "ˊ"
        case Tone.FallRise:
            return "ˇ"
        case Tone.Fall:
            return "ˋ"
        }
    }
}


export function AddTone(vowel: Vowel, tone: Tone): string
{
    switch (vowel)
    {
    case Vowel.A:
        switch (tone)
        {
        case 0:
            return "a"
        case 1:
            return "ā"
        case 2:
            return "á"
        case 3:
            return "ǎ"
        case 4:
            return "à"
        }
        throw new Error("Impossible.")
    case Vowel.O:
        switch (tone)
        {
        case 0:
            return "o"
        case 1:
            return "ō"
        case 2:
            return "ó"
        case 3:
            return "ǒ"
        case 4:
            return "ò"
        }
        throw new Error("Impossible.")
    case Vowel.E:
        switch (tone)
        {
        case 0:
            return "e"
        case 1:
            return "ē"
        case 2:
            return "é"
        case 3:
            return "ě"
        case 4:
            return "è"
        }
        throw new Error("Impossible.")
    case Vowel.E2:
        switch (tone)
        {
        case 0:
            return "ê"
        case 2:
            return "ế"
        case 4:
            return "ề"
        default:
            throw new Error("Tone 1 & 3 are invalid for ê.")
        }
    case Vowel.I:
        switch (tone)
        {
        case 0:
            return "i"
        case 1:
            return "ī"
        case 2:
            return "í"
        case 3:
            return "ǐ"
        case 4:
            return "ì"
        }
        throw new Error("Impossible.")
    case Vowel.U:
        switch (tone)
        {
        case 0:
            return "u"
        case 1:
            return "ū"
        case 2:
            return "ú"
        case 3:
            return "ǔ"
        case 4:
            return "ù"
        }
        throw new Error("Impossible.")
    case Vowel.Yu:
        switch (tone)
        {
        case 0:
            return "ü"
        case 1:
            return "ṻ"
        case 2:
            return "ǘ"
        case 3:
            return "ǚ"
        case 4:
            return "ǜ"
        }
        throw new Error("Impossible.")
    }
}

export function IsLabial(i: Initial | typeof Nothing)
{
    switch (i)
    {
    case Initial.B:
    case Initial.P:
    case Initial.M:
    case Initial.F:
        return true
    default:
        return false
    }
}

export function IsAlveoloPalatal(i: Initial | typeof Nothing)
{
    switch (i)
    {
    case Initial.J:
    case Initial.Q:
    case Initial.X:
        return true
    default:
        return false
    }
}

export function SyllablesEqual(ss1: Array<Syllable>, ss2: Array<Syllable>): boolean
{
    if (ss1.length != ss2.length)
        return false

    for (const i in ss1)
        if (!ss1[i].Equal(ss2[i]))
            return false

    return true
}
