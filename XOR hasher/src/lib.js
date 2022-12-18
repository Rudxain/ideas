'use strict'
const Str = String, ByteArr = Uint8Array, WordArr = Uint16Array

/**
@param {string} str
@param {boolean} byte false: decode UTF-16 code-units. truthy: treat as binary string.
*/
const StringToBuf = (str, byte) => {
	str = Str(str)
	const len = str.length ,
		buf = new (byte ? ByteArr : WordArr)(len)

	for (let i = 0; i < len; i++)
		buf[i] = str.charCodeAt(i)
	return buf
}

// "polyfill" of https://github.com/microsoft/TypeScript/issues/15402
/**
@typedef {(
	Uint8Array|Uint8ClampedArray|Int8Array|
	Uint16Array|Int16Array|
	Uint32Array|Int32Array|
	BigUint64Array|BigInt64Array
)} TypedArray
*/

/**
this depends on endianess, it's wrong
@param {TypedArray} arr
*/
const TypedArrToByteArr = arr => new ByteArr(arr.buffer)

/**
the main
@param {string|TypedArray} dat
@param {number} len digest size in bytes
*/
const xor_hasher = (dat, len = 8) => {
	dat = dat?.valueOf()
	if (typeof dat == 'string') dat = StringToBuf(dat)
	dat = TypedArrToByteArr(dat)

	const sbox = new ByteArr(+len)
	len = sbox.length
	if (len) dat.forEach((byte, i) => {sbox[i % len] ^= byte})
	return sbox
}
