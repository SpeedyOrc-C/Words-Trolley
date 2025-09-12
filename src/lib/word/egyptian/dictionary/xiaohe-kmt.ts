/*
Xiaohe KMT is a way to type voiceless determinative using a scheme inspired
by Xiaohe Yinxing (小鹤音形). It gives each determinative a Chinese character
that somehow resembles it. Then they're indexed by their Pinyin initials,
which means you need to know Mandarin to use it.

Original Xiaohe Yinxing scheme: https://flypy.cc/help/#/zg

“小鹤埃及”是用于输入埃及文中没有声音的定符的输入方案，灵感来自“小鹤音形”。
它为每个定符分配了一个与之形似的汉字，然后通过这些汉字的拼音首字母进行索引，
这就要求使用者需要懂一些普通话才能使用这个输入法。

“小鹤音形”原始方案见：https://flypy.cc/help/#/zg
*/

import {g, type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"

const XiaoheKmt: Record<string, string[]> = {
	"Q": ["𓂸", "𓄛", "𓃠"], // 且 犬
	"W": ["𓀯"], // 王
	"E": ["𓈉", "𓅪"], // 山 恶 # “山”自像大写字母 E
	"R": ["𓀀", "𓄹"], // 人 肉
	"T": ["𓇯", "𓈘", "𓈇"], // 天 田 土
	"Y": ["𓏜", "𓋳"], // 聿 衣
	"U": ["𓈓"], // 石 沙 # sh
	"I": ["𓊖", "𓈐", "𓆙"], // 彳亍 城 虫 # ch
	"O": ["𓇳", "𓇹", "𓁻"], // 日 月 目 # 圆圆的东西
	"P": ["𓀭"], // 神 # 继承自小鹤音形

	"A": ["𓆟"], // 鱼 # A 像一条小鱼，继承自小鹤音形
	"S": ["𓍢"], // 丝
	"D": ["𓀿", "𓌪"], // 倒 刀
	"F": ["𓀢", "𓁏", "𓀜"], // 拜 兴 打
	"G": ["𓀙", "𓌙", "𓇠"], // 官 棍 谷
	"H": ["𓊮"], // 火
	"J": ["𓈔"], // 金
	"K": ["𓀁"], // 口
	"L": ["𓀘", "𓀉"], // 老 累

	"Z": ["𓂻", "𓀔"], // 足 子
	"X": ["𓏴", "𓇼"], // 叉 星
	"C": ["𓆰"], // 草
	"V": ["𓊛"], // 舟 # zh
	"B": ["𓏒"], // 包
	"N": ["𓁐", "𓃒"], // 女 牛
	"M": ["𓆭"], // 木
}

export function CandidatesFromXiaoheKmt(input: string): Hieroglyphs[]
{
	const candidates = XiaoheKmt[input.toUpperCase()]

	if (candidates == undefined)
		return []

	return candidates.map(g)
}
