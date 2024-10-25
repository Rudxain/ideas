// "Poor Man's `Maybe`"
/**
If `None` was encoded as `never[]`,
it would create interoperability issues
with `ReadonlyOption`.

And mutating `None` is unsafe anyways.
*/
type Option<T> = [T] | readonly []
type ReadonlyOption<T> = readonly [T] | readonly []

const is_some = <T,>(o: ReadonlyOption<T>): o is readonly [T] =>
	o.length > 0
const is_none = <T,>(o: ReadonlyOption<T>): o is readonly [] =>
	o.length == 0

const successor = function*<T extends Exclude<unknown, undefined>>(init: T | undefined, mapper: (a: T) => T | undefined) {
	while (init !== undefined) {
		yield init
		init = mapper(init)
	}
}

// to-do: allow TS to infer if gen is infinite
const successor_infer0 = function*<T extends Exclude<unknown, undefined>, O extends T | undefined>(init: O, mapper: (a: T) => O): Generator<O, void, unknown> {
	while (init !== undefined) {
		yield init
		init = mapper(init)
	}
}
const successor_infer1 = function*<O, T extends Exclude<O, undefined>>(init: O, mapper: (a: T) => O) {
	while (init !== undefined) {
		yield init
		init = mapper(init)
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

const successor_res = function*<T>(init: IteratorResult<T, unknown>, mapper: (a: T) => IteratorResult<T, unknown>) {
	while (!init.done) {
		const { value } = init
		yield value
		init = mapper(value)
	}
}

/*
successors allow structured (serialized) dumping of internal state,
and debugging without debuggers!
*/

const LAST = 3
console.log([...successor(0, n => n < LAST ? n + 1 : undefined)])
console.log([...successor_monad([0], n => n < LAST ? [n + 1] : [])])
