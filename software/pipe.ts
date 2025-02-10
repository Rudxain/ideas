// how to define `zipN`
// and preserve `length` at the type-system level?
function* zip2<A, B>(
	a: Iterable<A>,
	b: Iterable<B>
): Generator<[A, B], void, unknown> {
	const a_it: Iterator<A, unknown, unknown> = a[Symbol.iterator]()
	const b_it: Iterator<B, unknown, unknown> = b[Symbol.iterator]()

	while (true) {
		const a_x = a_it.next()
		const b_x = b_it.next()
		if (a_x.done || b_x.done)
			break
		//yield* ???
		yield [a_x.value, b_x.value]
	}
}

/**
Checks if x satisfies all the predicates
*/
const fn_every = <T>(
	x: T,
	fns: Iterable<(x: T) => boolean>
) => {
	for (const f of fns)
		if (!f(x)) return false
	return true
}
/**
Checks if x satisfies at least 1 predicate.
*/
const fn_some = <T>(
	x: T,
	fns: Iterable<(x: T) => boolean>
) => {
	for (const f of fns)
		if (f(x)) return true
	return false
}

/**
Applies fns to values, entry-wise.
*/
function* fn_map<A, B>(
	a: Iterable<readonly [A, (a: A) => B]>
) {
	for (const [x, f] of a)
		yield f(x)
}

/**
Applies mapping fns to a value,
passing the output of the previous as the input to the next.

Only supports homo-types.
*/
const fn_reduce = <T>(
	x: T,
	fns: Iterable<(x: T) => T>
) => {
	for (const f of fns)
		x = f(x)
	return x
}

/**
"Poor Man's" pipeline feature.

Supports hetero-types,
while being type-safe and
preserving type-info.
*/
class Chainer<T> {
	x: T
	constructor(x: T) {
		this.x = x
	}
	apply<U>(f: (x: T) => U) {
		return new Chainer(f(this.x))
	}
	apply2<U, V>(f: (x: T, v: V) => U, v: V) {
		return new Chainer(f(this.x, v))
	}
	done() {
		return this.x
	}
	valueOf() {
		return this.x?.valueOf?.() ?? this.x
	}
}
