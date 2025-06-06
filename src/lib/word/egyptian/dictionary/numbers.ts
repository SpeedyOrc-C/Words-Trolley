import {g, v, h, type Hieroglyphs} from "$lib/word/egyptian/hieroglyphs"
import type {EgyptianWordCandidate} from "$lib/word/egyptian/IME"

export function FromPower0(d: number): string
{
	switch (d)
	{
	case 1:
		return "𓏺"
	case 2:
		return "𓏻"
	case 3:
		return "𓏼"
	case 4:
		return "𓏽"
	case 5:
		return "𓏾"
	case 6:
		return "𓏿"
	case 7:
		return "𓐀"
	case 8:
		return "𓐁"
	case 9:
		return "𓐂"
	default:
		throw "Egyptian doesn't have a digit for zero"
	}
}

export function FromPower1(d: number): string
{
	switch (d)
	{
	case 1:
		return "𓎆"
	case 2:
		return "𓎇"
	case 3:
		return "𓎈"
	case 4:
		return "𓎉"
	case 5:
		return "𓎊"
	case 6:
		return "𓎋"
	case 7:
		return "𓎌"
	case 8:
		return "𓎍"
	case 9:
		return "𓎎"
	default:
		throw "Egyptian doesn't have a digit for zero"
	}
}

export function FromPower2(d: number): string
{
	switch (d)
	{
	case 1:
		return "𓍢"
	case 2:
		return "𓍣"
	case 3:
		return "𓍤"
	case 4:
		return "𓍥"
	case 5:
		return "𓍦"
	case 6:
		return "𓍧"
	case 7:
		return "𓍨"
	case 8:
		return "𓍩"
	case 9:
		return "𓍪"
	default:
		throw "Egyptian doesn't have a digit for zero"
	}
}

export function FromPower3(d: number): string
{
	switch (d)
	{
	case 1:
		return "𓆼"
	case 2:
		return "𓆽"
	case 3:
		return "𓆾"
	case 4:
		return "𓆿"
	case 5:
		return "𓇀"
	case 6:
		return "𓇁"
	case 7:
		return "𓇂"
	case 8:
		return "𓇃"
	case 9:
		return "𓇄"
	default:
		throw "Egyptian doesn't have a digit for zero"
	}
}

export function CandidatesFromNumber(x: number): EgyptianWordCandidate[]
{
	if (x <= 0 || x >= 10000)
		return []

	x = Math.floor(x)

	const d0 = x % 10
	const d1 = Math.floor((x % 100) / 10)
	const d2 = Math.floor((x % 1000) / 100)
	const d3 = Math.floor((x % 10000) / 1000)

	const result: Hieroglyphs[] = []

	if (d3 > 0)
		result.push(g(FromPower3(d3)))
	if (d2 > 0)
		result.push(g(FromPower2(d2)))
	if (d1 > 0)
		result.push(g(FromPower1(d1)))
	if (d0 > 0)
		result.push(g(FromPower0(d0)))

	if (result.length == 1)
		return result.map(v => ({Word: v}))
	if (result.length == 2)
		return [{Word: v(...result)}]
	else
		return [{Word: h(...result)}]
}
