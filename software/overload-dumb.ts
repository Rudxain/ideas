function naive(...args: [number, number] | [bigint, bigint]) {
	if (typeof args[0] == 'number') {
		// correct
		const _x: number = args[0]
		// false positive error:
		// `a is number` implies `b is number`
		const _y: number = args[1]
	}
}

// overload is only used to name the args,
// so that the auto-generated paramaters are shadowed
function complex(a: number, b: number): void
function complex(a: bigint, b: bigint): void
function complex(...args: [number, number] | [bigint, bigint]) {
	const [a, b] = args
	if (typeof a == 'number') {
		// correct
		const _x: number = a
		// false positive error:
		// `a is number` implies `b is number`
		const _y: number = b
	}
}

function concise(...[a, b]: [number, number] | [bigint, bigint]) {
	if (typeof a == 'number') {
		// correct
		const _x: number = a
		// false positive error:
		// `a is number` implies `b is number`
		const _y: number = b
	}
}
