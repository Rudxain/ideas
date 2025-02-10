function assert(condition: boolean, msg?: string): asserts condition {
	if (!condition)
		throw new Error(msg)
}

function is_multiple(x: number, m: number): boolean
function is_multiple(x: bigint, m: bigint): boolean
function is_multiple(x: number | bigint, m: number | bigint) {
	return m == 0 ?
		x == 0 :
		(x as any) % (m as any) == 0
}

// tests
assert(is_multiple(0, 0))
assert(is_multiple(0, 1) && !is_multiple(1, 0))
assert(is_multiple(2, 1) && !is_multiple(1, 2))
assert(is_multiple(4, 2) && !is_multiple(2, 4))
assert(is_multiple(9, 3) && !is_multiple(3, 9))

function* range(n: bigint, end?: bigint) {
	for (; end === undefined ? Infinity : n < end; n++)
		yield n
}

const generic_fizzbuzz = (cases: Map<bigint, string>) =>
	range(0n).map(i => [...cases.entries()
		.filter(([k]) => is_multiple(i, k))
		.map(([, v]) => v)
	].join('') || i)

console.log([...generic_fizzbuzz(
	new Map([[3n, "Fizz"], [5n, "Buzz"], [7n, "Bazz"]] as const)
).take(3 * 5 * 7 + 1)])

