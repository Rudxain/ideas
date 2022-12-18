'use strict'
const doc = document

const
	inp = doc.getElementById('inp'),
	submit = doc.getElementById('submit'),
	progress = doc.getElementById('progress')

inp.addEventListener('change', () => {})
submit.addEventListener('click', () => {
	const {files} = inp, count = files.length
	progress.value = 0 / count
	
})
