export type WordOf<C extends string> = _WordOf<C, MaxWordLength>

type MaxWordLength = 12

type _WordOf<c extends string, n extends number> =
	n extends 0 ? never :
	`${c}` | `${c}${_WordOf<c, Prev[n]>}`

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
