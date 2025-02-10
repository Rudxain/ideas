//@ts-check
'use strict'

/**
@param {number} x
*/
const is_prime = x => {
	// all unsafe `Int`s are even
	if (!Number.isSafeInteger(x))
		return false
	// this also prevents an infinite loop

	x = Math.abs(x)
	if (x < 2)
		return false

	// not using `i <= sqrt(x)`, for fairness
	for (let i = 2; i < x; i++)
		if (x % i == 0)
			return false

	return true
}

/**
@param {number} x
@throws If `abs(x)` is greater than the max `string.length`
*/
const is_prime_re = x =>
	Number.isInteger(x) &&
	// using null bytes for potential speed
	!/^.?$|^(..+?)\1+$/s.test('\0'.repeat(Math.abs(x)))

/**
@template T
@param {ReadonlyArray<T>} a
@param {number} n
*/
const chunks = (a, n) => {
	// `-0` is "valid"
	if (!Number.isInteger(n) || n < 0)
		throw new RangeError(`invalid length ${n}`)

	if (n > a.length)
		throw new RangeError(`${n} is invalid for array of length ${a.length}`)

	/**@type {T[][]}*/
	const out = []
	for (let i = 0; i < a.length; i += n)
		out.push(a.slice(i, i + n))
	return out
}

/**
@param {number} x
@throws If `abs(x)` is greater than the max `array.length`
*/
const is_prime_chunked = x => {
	if (!Number.isInteger(x))
		return false

	x = Math.abs(x)
	if (x < 2)
		return false

	/**@type {ReadonlyArray<false>}*/
	const a = Array(x).fill(false)
	// x is a `UInt32`
	//assert(x == (x >>> 0))
	for (let i = 2; i < x; i++)
		if (chunks(a, i).at(-1).length == i)
			return false

	return true
}

const LEN = 0x1000

let start_t = performance.now()
const trial = Array.from({ length: LEN }, (_, i) => +is_prime(i)).join('')
let stop_t = performance.now()
console.log(stop_t - start_t)

start_t = performance.now()
const re = Array.from({ length: LEN }, (_, i) => +is_prime_re(i)).join('')
stop_t = performance.now()
console.log(stop_t - start_t)

start_t = performance.now()
const chunky = Array.from({ length: LEN }, (_, i) => +is_prime_chunked(i)).join('')
stop_t = performance.now()
console.log(stop_t - start_t)

console.assert(trial == re)
console.assert(trial == chunky)
