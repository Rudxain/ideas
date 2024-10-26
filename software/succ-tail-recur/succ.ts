/**
"Poor Man's `Maybe`"

If `None` was encoded as `never[]`,
it would create interoperability issues
with `ReadonlyOption`.

And mutating `None` is unsafe anyways.
*/
type Option<T> = [T] | readonly []
/**
"Poor Man's `Maybe`"
*/
type ReadonlyOption<T> = readonly [T] | readonly []
// Haskell and Rust: "Look what they need to mimic a fraction of our power!"

const is_some = <T,>(o: ReadonlyOption<T>): o is readonly [T] =>
	o.length > 0
const is_none = <T,>(o: ReadonlyOption<T>): o is readonly [] =>
	o.length == 0

/*
Should `init` and `mapper` return-type
be different templates?
*/
const successor = function*<
	O,
	T extends Exclude<O, undefined>
>(init: O, mapper: (a: T) => O) {
	while (init !== undefined) {
		yield init as O extends undefined ? never : T
		init = mapper(init as T)
	}
}

const successor_monad = function*<T>(init: ReadonlyOption<T>, mapper: (a: T) => ReadonlyOption<T>) {
	//while let Some(unwrap) = init
	while (is_some(init)) {
		const [unwrap] = init
		yield unwrap
		init = mapper(unwrap)
	}
}

/*
successors allow structured (serialized) dumping of internal state,
and debugging without debuggers!
*/

const LAST = 3
console.log([...successor(0, n => n < LAST ? n + 1 : undefined)])
console.log([...successor_monad([0], n => n < LAST ? [n + 1] : [])])
