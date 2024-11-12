export type NonEmptyArray<T> = [T, ...T[]]
export type ReadonlyNonEmptyArray<T> = readonly [T, ...readonly T[]]

export function is_non_empty<T>(a: Array<T>): a is NonEmptyArray<T>
export function is_non_empty<T>(a: ReadonlyArray<T>): a is ReadonlyNonEmptyArray<T>
export function is_non_empty<T>(a: ReadonlyArray<T>): a is ReadonlyNonEmptyArray<T> {
	return a.length > 0
}

// Unfortunate and strict, but correct
export function total_sum(a: ReadonlyNonEmptyArray<number>): number
export function total_sum(a: ReadonlyNonEmptyArray<bigint>): bigint
export function total_sum(a:
	ReadonlyNonEmptyArray<number> |
	ReadonlyNonEmptyArray<bigint>
) {
	//@ts-expect-error
	return a.reduce((acc, x) => acc + x)
}

// Incorrect param and mathematically incomplete
/**
@throws {TypeError} If `ls.length == 0`
*/
export function partial_sum(a: ReadonlyArray<number>): number
export function partial_sum(a: ReadonlyArray<bigint>): bigint
export function partial_sum(a: ReadonlyArray<never>): never
export function partial_sum(a: ReadonlyArray<number> | ReadonlyArray<bigint>) {
	//@ts-expect-error
	return a.reduce((acc, x) => acc + x)
}

// specialized (non-generic)
/**
This should be implemented using Kahan summation,
but it's just a naive sum.
*/
export const fsum = (a: ReadonlyArray<number>) =>
	a.reduce((acc, x) => acc + x, 0)
/**
This should support modular ("wrapping") and saturating ("clamping")
in a range.
*/
export const isum = (a: ReadonlyArray<bigint>) =>
	a.reduce((acc, n) => acc + n, 0n)

// TODO
export const default_sum = (a: ReadonlyArray<number>) =>
	a.reduce((acc, x) => acc + x, 0)

/*
Most flexible and correct, but non-standard
*/
export function flex_sum(a: ReadonlyArray<number>, init: number): number
export function flex_sum(a: ReadonlyArray<bigint>, init: bigint): bigint
export function flex_sum(
	a: ReadonlyArray<number> | ReadonlyArray<bigint>,
	init: number | bigint
) {
	//@ts-expect-error
	return a.reduce((acc, x) => acc + x, init)
}

/*
Mathematically correct,
at the cost of forcing the caller to tell JS
which value is expected.

TS is "too shy" to "tell secrets" to JS:
https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Goals
*/
export function hacky_sum(a: ReadonlyArray<number>, init: 0): number
export function hacky_sum(a: ReadonlyArray<bigint>, init: 0n): bigint
export function hacky_sum(
	a: ReadonlyArray<number> | ReadonlyArray<bigint>,
	init: number | bigint
) {
	//@ts-expect-error
	return flex_sum(a, init)
}

export function strict_sum(a: ReadonlyArray<number>, big: false): number
export function strict_sum(a: ReadonlyArray<bigint>, big: true): bigint
export function strict_sum(
	a: ReadonlyArray<number> | ReadonlyArray<bigint>,
	big: boolean
) {
	//@ts-expect-error
	return flex_sum(a, big ? 0n : 0)
}
