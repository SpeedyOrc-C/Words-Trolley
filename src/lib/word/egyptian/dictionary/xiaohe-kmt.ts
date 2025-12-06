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

import {g} from "$lib/word/egyptian/hieroglyphs"
import type {EgyptianWordCandidate} from "."

export const XiaoheKmt: Record<string, string[]> = {
	"Q": ["𓂸", "𓄛", "𓃢", "𓃠"], // 且 犬 猫
	"W": ["𓀯"], // 王
	"E": ["𓈉", "𓅪"], // 山 恶 # “山”字像大写字母 E
	"R": ["𓄹"], // 肉
	"T": ["𓈘", "𓈇"], // 田 土
	"Y": ["𓃜", "𓃞"], // 羊
	"U": ["𓈒", "𓈓"], // 石 沙 (sh)
	"I": ["𓊖", "𓈐", "𓆙", "𓆏"], // 彳亍 城 蛇 蛙 (ch)
	"O": ["𓊗", "𓁻", "𓂉"], // 目 肉 # 圆圆的东西
	"P": ["𓋳"], // 衣 # 继承自小鹤音形

	"A": ["𓆟", "𓆍"], // 鱼 鳄 # A 像一条小鱼，继承自小鹤音形
	"S": ["𓍢"], // 丝
	"D": ["𓌪", "𓀿"], // 倒、殆 刀
	"F": ["𓂡", "𓂢"], // 拜 兴 打 # 与手相关
	"G": ["𓌙", "𓇠", "𓌽"], // 官 棍 谷
	"H": ["𓊮"], // 火
	"J": ["𓈔"], // 金
	"K": ["𓀁"], // 口
	"L": ["𓀉"], // 累

	"Z": ["𓂻", "𓀔"], // 足 子
	"X": ["𓏴", "𓏶", "𓇼"], // 叉 星
	"C": ["𓆰"], // 草
	"V": ["𓊛", "𓊝", "𓊜"], // 舟 (zh)
	"B": ["𓏐", "𓏑", "𓏒"], // 包
	"N": ["𓃒"], // 牛
	"M": ["𓆭", "𓃗", "𓃘"], // 木 马 驴

	"TL": ["𓇰", "𓇱"], // 天 + 力
	"RT": ["𓀋", "𓀆", "𓀇", "𓀈"], // 人 + 头
	"RZ": ["𓀉"], // 人 + 坐
	"RF": ["𓀞", "𓀢", "𓁏"], // 人 + 手
	"RG": ["𓀜", "𓀘"], // 人 + 棍
}

export function CandidatesFromXiaoheKmt(input: string): EgyptianWordCandidate[]
{
	const candidates = XiaoheKmt[input.toUpperCase()]

	if (candidates == undefined)
		return []

	return candidates.map(g).map(w => ({Word: w}))
}
