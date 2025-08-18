export enum Category
{
	Word = "word",
	Verb = "verb",
}

export enum Mora
{
	A = "あ", I = "い", U = "う", E = "え", O = "お",
	Ka = "か", Ki = "き", Ku = "く", Ke = "け", Ko = "こ",
	Ga = "が", Gi = "ぎ", Gu = "ぐ", Ge = "げ", Go = "ご",
	Sa = "さ", Si = "し", Su = "す", Se = "せ", So = "そ",
	Za = "ざ", Zi = "じ", Zu = "ず", Ze = "ぜ", Zo = "ぞ",
	Ta = "た", Ti = "ち", Tu = "つ", Te = "て", To = "と",
	Da = "だ", Di = "ぢ", Du = "づ", De = "で", Do = "ど",
	Na = "な", Ni = "に", Nu = "ぬ", Ne = "ね", No = "の",
	Ha = "は", Hi = "ひ", Hu = "ふ", He = "へ", Ho = "ほ",
	Ba = "ば", Bi = "び", Bu = "ぶ", Be = "べ", Bo = "ぼ",
	Pa = "ぱ", Pi = "ぴ", Pu = "ぷ", Pe = "ぺ", Po = "ぽ",
	Ma = "ま", Mi = "み", Mu = "む", Me = "め", Mo = "も",
	Ya = "や", Yu = "ゆ", Yo = "よ",
	Ra = "ら", Ri = "り", Ru = "る", Re = "れ", Ro = "ろ",
	Wa = "わ", Wi = "ゐ", We = "ゑ", Wo = "を",
	Kya = "きゃ", Kyu = "きゅ", Kyo = "きょ",
	Gya = "ぎゃ", Gyu = "ぎゅ", Gyo = "ぎょ",
	Sya = "しゃ", Syu = "しゅ", Syo = "しょ",
	Zya = "じゃ", Zyu = "じゅ", Zyo = "じょ",
	Tya = "ちゃ", Tyu = "ちゅ", Tyo = "ちょ",
	Dya = "ぢゃ", Dyu = "ぢゅ", Dyo = "ぢょ",
	Nya = "にゃ", Nyu = "にゅ", Nyo = "にょ",
	Hya = "ひゃ", Hyu = "ひゅ", Hyo = "ひょ",
	Bya = "びゃ", Byu = "びゅ", Byo = "びょ",
	Pya = "ぴゃ", Pyu = "ぴゅ", Pyo = "ぴょ",
	N = "ん", Q = "っ", Bar = "ー",
}

export enum VerbType
{
	Irregular = 0, Consonant = 1, Vowel = 2, Noun = 3
}

const Magic1 = ["う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む"] as const

const Magic2 = [
	"あ", "う", "お",
	"か", "く", "こ",
	"が", "ぐ", "ご",
	"さ", "す", "そ",
	"ざ", "ず", "ぞ",
	"た", "つ", "と",
	"だ", "づ", "ど",
	"な", "ぬ", "の",
	"は", "ふ", "ほ",
	"ば", "ぶ", "ぼ",
	"ぱ", "ぷ", "ぽ",
	"ま", "む", "も",
	"ら", "る", "ろ",
	"や", "ゆ", "よ",
	"わ",
] as const

export function VerbTypeFromRecursiveForm(word: string): VerbType | null
{
	if (word.length < 2)
		return null

	const c1 = word[word.length - 1]

	if (Magic1.some(c => c == c1))
		return VerbType.Consonant

	if (c1 != "る")
		return null

	const c2 = word[word.length - 2]

	if (word.endsWith("する"))
		return VerbType.Noun

	if (word == "くる")
		return VerbType.Irregular

	if (Magic2.some(c => c == c2))
		return VerbType.Consonant

	return null
}
