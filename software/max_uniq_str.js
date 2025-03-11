//@ts-check
'use strict'

/**
The theoretical number of states that an
ECMAScript string could have.

The numeral is so big that it won't even fit
in this observable universe.
So you'll be better off just listing the exponents alone.
*/
const MAX_UNIQ_STRINGS = (() => {
	let out = 0n
	for (let len = 0n; len < 2n ** 53n; len++)
		/*
		A code-unit is 16bits,
		so the `Set` of all strs of size `len`
		is the right-side of the assignment.

		By adding all possible states of each `len`,
		we get all possible states for
		all possible strs of all sizes.
		*/
		//out += 2n ** (len * 16n)
		out |= 1n << (len << 4n)
	return out
})()

/*
It seems that a closed-form expression would be like:
`(1 << (1 << (53 + 16))) / ((1 << 16) - 1)`
See also: https://math.stackexchange.com/a/971770

I inferred this by observing that
`2^n / M(m)` (a power of two divided by a Mersenne)
yields a pattern of 1s spaced by `m - 1` 0s,
like so "1...1...1".
*/
