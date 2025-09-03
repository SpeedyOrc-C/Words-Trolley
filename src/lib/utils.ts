import {clsx, type ClassValue} from "clsx"
import {Parser} from "crazy-parser"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[])
{
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null }

export function InverseRecord<A extends string, B extends string>(record: Record<A, B>): Record<B, A>
{
	return Object.fromEntries(
		Object.entries(record)
			.map(([k, v]) => [v, k as A])
	)
}

export function InverseRecord1ToN<A extends string, B extends string>(record: Record<A, B>): Map<B, A[]>
{
	const result: Map<B, A[]> = new Map()

	for (const k in record)
	{
		const v = record[k]

		const array = result.get(v)

		if (array == undefined)
			result.set(v, [])
		else
			array.push(k)
	}

	return result
}

export function ParserFromRecord<A>(record: Record<string, A>)
{
	return new Parser<A, Error>((input, state) =>
	{
		if (state.index >= input.length)
			return new Error()

		const char = String.fromCodePoint(input[state.index])

		if (!(char in record))
			return new Error()

		state.index += 1

		return record[char]
	})
}
