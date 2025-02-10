/**
Performs the specified action for each element in an array,
continuing even if the callback `throw`s.
@param cb A function that accepts up to three arguments.
`forEach` calls the `cb` function one time for each element in the array.
@param thisArg An object to which the `this` keyword can refer in the `cb` function.
If `thisArg` is omitted, `undefined` is used as the `this` value.
*/
const tryFor = <T>(
	a: T[],
	cb: (x: T, i: number, a: T[]) => void,
	thisArg?: unknown
) => {
	const bound_cb = cb.bind(thisArg)

	const errs: unknown[] = []

	for (let i = 0; a.length > i; i++) {
		if (!(i in a)) continue
		try {
			bound_cb(a[i], i, a)
		}
		catch (e: unknown) {
			// the error probably contains `i`
			// so no need to include it
			errs.push(e)
		}
	}
	return errs
}
