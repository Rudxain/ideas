'use strict'
{
	const doc = document

	/**@type {HTMLCanvasElement}*/
	const canv = doc.getElementById('c')
	const ctx = canv.getContext('2d', { alpha: false, desynchronized: true })

	const rand_u32 = (min = 0, max = 2 ** 32) => Math.random() * (max - min) + min >>> 0

	const main = () => {}

	if (typeof require == 'undefined' && typeof WorkerGlobalScope == 'undefined')
		main()
}