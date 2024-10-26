const split_graphemes = (s: string) =>
	[...(new Intl.Segmenter()).segment(s)].map(x => x.segment)

/**
shallow strict
*/
const arr_eq = <T,>(a: ReadonlyArray<T>, b: ReadonlyArray<T>) =>
	a.length == b.length && a.every((a_i, i) => a_i === b[i])

/**
Doesn't accept `Iterable`s, because:
- they can be bigger than an `Array`
- they aren't guaranteed to be reversible
*/
const is_palindrome = <T,>(x: ReadonlyArray<T>) => arr_eq(x, x.toReversed())

/**
searches for unique max-length palindromes, ignoring size=1
*/
export const find_palindromes = (s: string) => {
	const graphemes = split_graphemes(s)
	const len = graphemes.length

	const pals: Set<string> = new Set

	if (len == 2) {
		if (is_palindrome(graphemes))
			pals.add(graphemes.join(''))
		return pals
	}
	for (let i = 0, j = 2; j < len;) {
		const sub_graphemes = graphemes.slice(i, j)

		if (is_palindrome(sub_graphemes)) {
			if (i < 1) {
				if (++j >= len) {
					pals.add(sub_graphemes.join(''))
					break
				}
			}
			else { i-- }
		}
		else {
			i++
			j = i + 2
		}
	}
	return pals
}
