/*
This script intentionally mixes good and bad practices.
Inconsistency is key!
*/

/**
This **must** be kept minified,
to speed-up code-gen and `eval`.
*/
const bf_ops_to_js = Object.freeze(new Map(/**@type {const}*/([
	['+', 'm[p]++;'],
	[',', 'm[p]=yield;'],
	['-', 'm[p]--;'],
	['.', 'yield c(m[p]);'],
	['<', 'p--;'],
	['>', 'p++;'],
	['[', 'while(m[p]){'],
	[']', '}']
])))

const arab_ops_to_bf = /**@type {'+,-.<>[]'}*/(
	[...bf_ops_to_js.keys()].join('')
)

/**
Convert Arabic BrainFuck to "standard" BF.

"Arabic" is just ASCII digits,
they map to BF op-codes with the same numeric order.
@param {string} d
*/
const arab_to_bf = d => d.replace(/./gs, c => arab_ops_to_bf[c] || '')

/**
Transpile BrainFuck to its equivalent JS
@param {string} b
*/
const bf_to_js = b => `function* bfg(){
	const
		c = String.fromCharCode,
		m = new Uint8Array(3e4)
	let p = 0;
	${b.replace(/./gs, c => bf_ops_to_js.get(c) || '')}
};[...bfg()].join('')` // `,` is useless, lol


const bf = new Proxy({}, {
	get(_, k) {
		if (typeof k == 'symbol') return {}
		if (k === '_global') return globalThis
		return eval(bf_to_js(arab_to_bf(k.substring(1))))
	},
	has(_0, _1) { return true }
})

with (bf) {
	_global.console.log(
		$Hquery0000006250000000000004753$$$ +
		Español0000000625000OOO000000047523 +
		_Lodash0000000625000000O0000047523_ +
		λcalc00000006250000000000047523monadz
	)
}
