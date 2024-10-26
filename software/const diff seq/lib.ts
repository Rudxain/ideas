function abs(x: number): number
function abs(x: bigint): bigint
function abs(x: number | bigint) {
	return x < 0 ? -x : x
}

function sub(a: number, b: number): number
function sub(a: bigint, b: bigint): bigint
function sub(a: number | bigint, b: number | bigint) {
	//@ts-expect-error
	return a - b
}
/**
check if iterator values have the same difference between each other,
`yield`ing bools at each step
*/
export const same_diff = function*<I extends Iterable<number> | Iterable<bigint>>(iter: I) {
	let x_prev: (I extends Iterable<bigint> ? bigint : number) | undefined
	let diff: (I extends Iterable<bigint> ? bigint : number) | undefined

	for (const _x of iter) {
		const x_now = _x as I extends Iterable<bigint> ? bigint : number

		if (x_prev === undefined) {
			x_prev = x_now
			yield undefined
			continue
		}
		if (diff === undefined) {
			//@ts-expect-error
			diff = abs(sub(x_prev, x_now))
			yield undefined
			continue
		}
		//@ts-expect-error
		if (diff != abs(sub(x_prev, x_now))) {
			yield false
			continue
		}
		yield true
		x_prev = x_now
	}
}
