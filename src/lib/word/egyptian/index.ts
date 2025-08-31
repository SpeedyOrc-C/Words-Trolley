export enum Phoneme
{
	a = "a", // 𓄿
	i = "i", // 𓇋
	y = "y", // 𓇌
	e = "e", // 𓂝
	w = "w", // 𓅱
	b = "b", // 𓃀
	p = "p", // 𓊪
	f = "f", // 𓆑
	m = "m", // 𓅓
	n = "n", // 𓈖
	r = "r", // 𓂋
	h = "h", // 𓉔
	H = "H", // 𓎛
	x = "x", // 𓐍
	C = "C", // 𓄡
	s = "s", // 𓋴
	z = "z", // 𓊃
	S = "S", // 𓈙
	k = "k", // 𓎡
	g = "g", // 𓎼
	q = "q", // 𓈎
	t = "t", // 𓏏
	c = "c", // 𓍿
	d = "d", // 𓂧
	j = "j", // 𓆓
}

export const EgyptologyTransliteration: Record<Phoneme, string> = {
	[Phoneme.e]: "ꜥ",
	[Phoneme.C]: "ẖ",
	[Phoneme.H]: "ḥ",
	[Phoneme.S]: "š",
	[Phoneme.a]: "ꜣ",
	[Phoneme.b]: "b",
	[Phoneme.c]: "ṯ",
	[Phoneme.d]: "d",
	[Phoneme.f]: "f",
	[Phoneme.g]: "g",
	[Phoneme.h]: "h",
	[Phoneme.i]: "ỉ",
	[Phoneme.j]: "ḏ",
	[Phoneme.k]: "k",
	[Phoneme.m]: "m",
	[Phoneme.n]: "n",
	[Phoneme.p]: "p",
	[Phoneme.q]: "ḳ",
	[Phoneme.r]: "r",
	[Phoneme.s]: "s",
	[Phoneme.t]: "t",
	[Phoneme.w]: "w",
	[Phoneme.x]: "ḫ",
	[Phoneme.y]: "y",
	[Phoneme.z]: "z",
}
