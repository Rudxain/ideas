//@ts-check
'use strict'

// https://youtu.be/VORE0ixUdf0?lc=Ugxda_KX_XHUSCy1hEZ4AaABAg

/**
@param {number} n
*/
const match31 = n => /^3+1+$/g.test(n.toString());

(() => {
	let i7 = 7 * 2, i17 = 17 * 2
	while (true) {
		if (match31(i7))
			return i7
		i7 += 7
		if (match31(i17))
			return i17
		i17 += 17
	}
})()
