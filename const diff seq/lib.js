//@ts-check
'use strict'

/**
@template {number|bigint} T
@param {T} x
*/
const abs = x => /**@type {T}*/(x < 0 ? -x : x)

/**
https://math.stackexchange.com/questions/1345205/perfect-powers-of-successive-naturals-can-you-always-reach-a-constant-differenc
@template {number|bigint} T
@param {Iterable<T>} iter
*/
const same_diff = function* (iter) {
	/**@type {T|undefined}*/
	let x_prev
	/**@type {T|undefined}*/
	let diff
	for (const x_now of iter) {
		if (x_prev === undefined) {
			x_prev = x_now
			yield undefined
			continue
		}
		if (diff === undefined) {
			//@ts-ignore
			diff = abs(x_prev - x_now)
			yield undefined
			continue
		}
		if (diff != abs(x_prev - x_now)) {
			yield false
			continue
		}
		yield true
		x_prev = x_now
	}
}
/*
const f = iter => {
	iter = [...iter]
	let i = 0
	while (same_diff(iter) && iter.length > 0);
	return iter[0]
}
 */
