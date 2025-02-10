//@ts-check

/**
@template T
@param {ReadonlyArray<T>} a
*/
const pick_rand = a => a[Math.random() * a.length >>> 0]

/**
The Burner of Random-Access Memories™
(The Caretaker and Daft Punk ref??!1!?11?!1!)

Can't delete `symbol`s.
@param {Record<string|number|symbol, unknown>} o
*/
const forget_rand = o =>
	delete o[pick_rand(Object.getOwnPropertyNames(o))]


const dementia = new Proxy(globalThis, {
	get(g, k) {
		if (k === Symbol.unscopables) return {}
		/*
		Recalling `k` should make `g[k]` more likely
		to be remembered.
		This hasn't been implemented yet,
		so forget indiscriminately!
		*/
		forget_rand(g)

		if (typeof k == 'symbol') {
			// Predatory garbage-collection
			delete g[k]
			// peak JS
			return pick_rand([undefined, null, k, NaN])
		}
		return g[k]
	},
	set(g, k, v) {
		// forget anything but what we just learned
		forget_rand(g)
		if (typeof k == 'symbol') {
			// never no-op (no double-`free`)
			delete g[k]
			return false
		}
		g[k] = v
		return true
	},
	has(g, k) {
		forget_rand(g)
		if (typeof k == 'symbol') {
			// never no-op (no double-`free`)
			delete g[k]
			// `symbol`s? what's that?
			return false
		}
		return k in g
	}
})

const top = globalThis

//@ts-expect-error
with (dementia) {
	forget_me_not = 42
	top.console.log(forget_me_not)
}
