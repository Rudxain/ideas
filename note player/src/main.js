//@ts-check
'use strict'

const player = () => {
	const
		order = 52,
		Hz = (order - Math.log2(Math.random() * 2 ** order + 1)) * 16000,
		audCtx = new AudioContext(),
		osc = audCtx.createOscillator()

	osc.type = 'sawtooth'
	osc.frequency.setValueAtTime(Hz, audCtx.currentTime)
	osc.connect(audCtx.destination)
	osc.start()
	osc.stop(1)
}

const main = () => {
	document.addEventListener('click', player)
}

main()