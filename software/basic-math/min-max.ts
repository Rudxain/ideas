type PosInfinity = 1e999
type NegInfinity = -1e999

const fmin = <T extends number>(a: ReadonlyArray<T>) =>
	a.reduce((pre, x) => pre <= x ? pre : x, Infinity) as T | PosInfinity
const fmax = <T extends number>(a: ReadonlyArray<T>) =>
	a.reduce((pre, x) => pre > x ? pre : x, -Infinity) as T | NegInfinity

const imin = <T extends bigint>(a: ReadonlyArray<T>) =>
	a.reduce((pre, x) => pre <= x ? pre : x)
const imax = <T extends bigint>(a: ReadonlyArray<T>) =>
	a.reduce((pre, x) => pre > x ? pre : x)

