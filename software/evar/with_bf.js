//@ts-check

/**
Convert Arabic BrainFuck to "standard" BF.

"Arabic" is just ASCII digits,
they map to BF op-codes with the same numeric order.
@param {string} d
*/
const arab_to_bf = d => d.replace(/./gs, c => '+,-.<>[]'[c] || '')

/**
Convert BrainFuck to its equivalent JS
@param {string} b
*/
const bf_to_js = b => {
	/**
	This **must** be kept minified,
	to speed-up code-gen and `eval`.
	*/
	const map = Object.freeze(new Map(/**@type {const}*/([
		['+', 'm[p]++;'],
		[',', 'm[p]=yield;'],
		['-', 'm[p]--;'],
		['.', 'yield c(m[p]);'],
		['<', 'p--;'],
		['>', 'p++;'],
		['[', 'while(m[p]){'],
		[']', '}']
	])))

	return `const c = String.fromCharCode
	function* bfg(){
		const m = new Uint8Array(3e4)
		let p = 0;
		${b.replace(/./gs, c => map.get(c) || '')}
	};[...bfg()].join('')`
}


const bf = new Proxy({}, {
	get(_, key) {
		if (typeof key == 'symbol') return {}
		if (key === '__global') return globalThis
		return eval(bf_to_js(arab_to_bf(key.substring(1))))
	},
	has(_, __) { return true }
})

with (bf) {
	__global.console.log(
		$J_query_000000_625_000000_000000_4753 +
		E_0000000_625_00000_00000_47523 +
		españoL_$$0000000_625_00000_000000_47523 +
		λ_calculus_$$$_0000000_625_00000_000000_47523
	)
}
