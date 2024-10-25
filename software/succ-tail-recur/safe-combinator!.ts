// boilerplate
class BigUint {
	/** Zero */
	static N0() {
		return new BigUint(0n)
	}
	/** One */
	static N1() {
		return new BigUint(1n)
	}

	#x
	constructor(x: string | number | bigint | boolean) {
		const n = BigInt(x)
		if (n < 0n) throw new RangeError('Value must be unsigned')
		this.#x = n
	}
	// `get` would be misleading
	valueOf() { return this.#x }

	/** equal */
	eq(n: BigUint) {
		return this.#x == n.#x
	}
	/** not equal */
	ne(n: BigUint) {
		return this.#x != n.#x
	}
	/** less than or equal */
	le(n: BigUint) {
		return this.#x <= n.#x
	}
	/** less than */
	lt(n: BigUint) {
		return this.#x < n.#x
	}
	/** greater than or equal */
	ge(n: BigUint) {
		return this.#x >= n.#x
	}
	/** greater than */
	gt(n: BigUint) {
		return this.#x > n.#x
	}

	/** sum (plus) */
	add(n: BigUint) {
		return new BigUint(this.#x + n.#x)
	}
	/** increment */
	inc() {
		return new BigUint(this.#x + 1n)
	}
	/** subtract (minus) */
	sub(n: BigUint) {
		if (this.#x < n.#x)
			throw new RangeError('Underflow')
		return new BigUint(this.#x - n.#x)
	}
	/** decrement */
	dec() {
		if (this.#x == 0n)
			throw new RangeError('Underflow: cannot decrement zero')
		return new BigUint(this.#x - 1n)
	}
	/** multiply */
	mul(n: BigUint) {
		return new BigUint(this.#x * n.#x)
	}
	/** divide */
	div(d: BigUint) {
		return new BigUint(this.#x / d.#x)
	}
	/** remainder */
	rem(d: BigUint) {
		return new BigUint(this.#x % d.#x)
	}

	/** power (exponential) */
	pow(e: BigUint) {
		return new BigUint(this.#x ** e.#x)
	}
}

// more boilerplate:
// https://github.com/microsoft/TypeScript/issues/36336
const enum RecurResKind {
	Cont,
	Ret
}
interface Cont<C> {
	kind: RecurResKind.Cont
	0: C
}
interface Ret<R> {
	kind: RecurResKind.Ret
	0: R
}
type RecurRes<C, R> = Cont<C> | Ret<R>
// key is 0 for tuple-like API
const RecurRes = {
	Cont<C>(c: C): Cont<C> {
		return {
			kind: RecurResKind.Cont,
			0: c
		}
	},
	Ret<R>(r: R): Ret<R> {
		return {
			kind: RecurResKind.Ret,
			0: r
		}
	}
}

/**
https://users.rust-lang.org/t/when-will-rust-have-tco-tce/20790/3
*/
const tail_recurse = <C, R,>(init: C, f: (a: C) => RecurRes<C, R>): R => {
	while (true) {
		const out = f(init)
		switch (out.kind) {
			case RecurResKind.Cont: { init = out[0]; break }
			case RecurResKind.Ret: return out[0]
		}
	}
}

/** factorial */
const fact = (n: BigUint) =>
	tail_recurse<[BigUint, BigUint], BigUint>([n, BigUint.N1()], ([a, b]) =>
		a.eq(BigUint.N0())
			? RecurRes.Ret(b)
			: RecurRes.Cont([a.dec(), a.mul(b)])
	)
