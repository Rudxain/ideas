'use strict'
/**
@param {string} s
@return {string[]}
*/
const splitGraphemes = s => [...(new Intl.Segmenter()).segment(s)].map(x => x.segment)

/**
shallow strict
@param {unknown} a
@param {unknown} b
*/
const arrayEquals = (a, b) => {
	if (!Array.isArray(a) || !Array.isArray(b))
		return false

	const len = a.length
	if (len !== b.length) return false

	for (let i = 0; i < len; i++)
		if (a[i] !== b[i]) return false
	return true
}

/**@param {Iterable} x*/
const is_palindrome = x => arrayEquals([...x], [...x].reverse())

/**
searches for unique max-length palindromes, ignoring size=1
@param {string} s
*/
const find_palindromes = s => {
	s = splitGraphemes(s)

	const len = s.length

	/**@type {Set<string>}*/
	const pals = new Set

	if (len == 2) {
		if (is_palindrome(s)) pals.add(s.join(''))
		return pals
	}
	for (let i = 0, j = 2; j < len;) {
		const sub = s.slice(i, j)
		if (is_palindrome(sub)) {
			if (i < 1) {
				if (++j >= len) {
					pals.add(sub)
					break
				}

			}
			else {
				i--
			}
		}
		else
			j = ++i + 2
	}
	return pals
}